from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any, Set

app = FastAPI()

# Enable CORS for cross-origin requests from frontend (e.g. localhost:3000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PipelinePayload(BaseModel):
    nodes: List[Dict[str, Any]] = []
    edges: List[Dict[str, Any]] = []

def check_is_dag(nodes: List[Dict[str, Any]], edges: List[Dict[str, Any]]) -> bool:
    """
    Determines if the given graph (nodes and edges) forms a Directed Acyclic Graph (DAG).
    Uses Kahn's Algorithm (in-degree BFS) which correctly handles disconnected clusters.
    """
    # Collect all unique node IDs from nodes array as well as edge endpoints
    all_node_ids: Set[str] = {node["id"] for node in nodes if isinstance(node, dict) and "id" in node}
    for edge in edges:
        if isinstance(edge, dict):
            if "source" in edge:
                all_node_ids.add(edge["source"])
            if "target" in edge:
                all_node_ids.add(edge["target"])

    if not all_node_ids:
        return True

    adj: Dict[str, List[str]] = {node_id: [] for node_id in all_node_ids}
    in_degree: Dict[str, int] = {node_id: 0 for node_id in all_node_ids}

    for edge in edges:
        if isinstance(edge, dict):
            src = edge.get("source")
            tgt = edge.get("target")
            if src and tgt and src in adj and tgt in in_degree:
                adj[src].append(tgt)
                in_degree[tgt] += 1

    # Enqueue all nodes with in_degree 0 (works across all disconnected components)
    queue = [node_id for node_id in all_node_ids if in_degree[node_id] == 0]
    visited_count = 0

    while queue:
        curr = queue.pop(0)
        visited_count += 1
        for neighbor in adj[curr]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)

    return visited_count == len(all_node_ids)

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
def parse_pipeline(payload: PipelinePayload):
    num_nodes = len(payload.nodes)
    num_edges = len(payload.edges)
    is_dag = check_is_dag(payload.nodes, payload.edges)

    return {
        'num_nodes': num_nodes,
        'num_edges': num_edges,
        'is_dag': is_dag,
    }
