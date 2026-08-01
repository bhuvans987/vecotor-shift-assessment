# Project Context: VectorShift Frontend Technical Assessment

## What this project is

This is a take-home technical assessment for a Frontend Engineer role at VectorShift (a YC S23 company building no-code AI workflow tooling). The project is a visual, drag-and-drop node-based pipeline builder, similar in concept to Make.com: nodes are draggable cards on a canvas, edges are wires connecting them, and data conceptually flows from one node's output into the next node's input.

**Stack constraint (must follow):** Frontend in JavaScript/React, backend in Python/FastAPI. Do not substitute other languages or frameworks.

## Current file structure

```
Vecotor Shift Assessment/
├── backend/backend/
│   ├── __pycache__/
│   ├── venv/
│   └── main.py
└── frontend/frontend/
    ├── node_modules/
    ├── public/
    └── src/
        ├── nodes/
        │   ├── inputNode.js
        │   ├── llmNode.js
        │   ├── outputNode.js
        │   └── textNode.js
        ├── App.js
        ├── draggableNode.js
        ├── index.css
        ├── index.js
        ├── store.js
        ├── submit.js
        ├── toolbar.js
        └── ui.js
```

Run frontend: `cd frontend/frontend` → `npm i` → `npm start` (runs on localhost:3000)
Run backend: `cd backend/backend` → `uvicorn main:app --reload` (runs on localhost:8000)

## Full original assessment requirements (verbatim scope, four parts)

### Part 1: Node Abstraction
The four existing node types (`inputNode.js`, `llmNode.js`, `outputNode.js`, `textNode.js`) share a large amount of duplicated code (card structure, handle positioning, styling). Task: create a shared abstraction (a `BaseNode` component) that removes this duplication and makes it fast to create new node types. Once built, create **five new nodes of your own choosing** to demonstrate the abstraction's flexibility. The new nodes don't need real functionality, they exist to prove the abstraction works for arbitrary new node types.

### Part 2: Styling
The provided files currently have minimal/no styling. Task: style all components into a cohesive, polished, unified design. Free to use VectorShift's existing product as inspiration or design from scratch. Any React styling approach/library is allowed.

### Part 3: Text Node Logic
Two specific upgrades to the existing Text node:
1. The node's width/height should dynamically grow as the user types more text (instead of a fixed size).
2. When the user types a valid JavaScript variable name inside double curly braces (e.g. `{{ input }}`), a new Handle should automatically appear on the left side of the node corresponding to that variable.

### Part 4: Backend Integration
1. Update `frontend/src/submit.js` so that when the user clicks Submit, it sends the current pipeline's nodes and edges to a `/pipelines/parse` endpoint on the backend.
2. Update `/pipelines/parse` in `backend/main.py` to calculate `num_nodes`, `num_edges`, and whether the graph is a valid DAG (Directed Acyclic Graph, no cycles).
3. Response format must be exactly: `{num_nodes: int, num_edges: int, is_dag: bool}`.
4. On response, trigger a user-friendly alert on the frontend displaying all three values.

## Submission requirements (do not skip these, they are graded)

- Submit via the Google Form provided (not by replying to email).
- Code submitted as a zip file, named exactly: `FirstName_LastName_technical_assessment.zip`
- A screen recording (2–3 minutes), named exactly: `FirstName_LastName_screenrecording`
- The recording must show: (1) the working functionality, dragging/connecting nodes, typing a `{{ variable }}` and showing a Handle spawn, clicking Submit and showing the alert with real data, and (2) a brief walkthrough of the code, specifically the `BaseNode` abstraction, the variable-extraction logic, and the DAG-check function.
- Grading criteria: successful completion of the task, code architecture, and design.

## Key technical gotchas to keep in mind while building (don't skip these)

1. **`useUpdateNodeInternals` is required, not optional.** React Flow caches each node's handle positions on first render. When the Text node's variable-extraction logic adds a new Handle dynamically (Part 3), React Flow will not know about it unless `updateNodeInternals(nodeId)` is called right after the handles array changes. Skipping this causes new handles to appear visually but be uninteractable, or wires to snap to the wrong position.

2. **The DAG check must handle disconnected subgraphs.** The pipeline may contain multiple separate clusters of nodes that don't connect to each other. The cycle-detection DFS must loop over every node and start a fresh search from any node not yet visited, not just run once from a single starting point, otherwise a cycle hiding in a second, disconnected cluster will be missed.

3. **CORS must be configured on the backend.** The frontend (`localhost:3000`) and backend (`localhost:8000`) are separate origins. Without explicit `CORSMiddleware` configuration on the FastAPI app allowing `http://localhost:3000`, the browser will block the frontend's request to the backend by default.

4. **The frontend must call the full backend URL**, not a relative path (e.g. `http://localhost:8000/pipelines/parse`, not `/pipelines/parse`), since frontend and backend are not served from the same origin here.

## Build order (do in this sequence, test each in the browser before moving on)

1. `BaseNode` abstraction + 5 new nodes (Part 1)
2. Styling pass (Part 2)
3. Text node auto-resize + dynamic variable Handles + `useUpdateNodeInternals` (Part 3)
4. FastAPI scaffold: Pydantic schema for the payload + CORS middleware
5. DAG check function, looped over every node for disconnected subgraphs (Part 4)
6. Frontend `submit.js` → fetch call → alert display (Part 4)
7. Manual end-to-end test in browser, then screen recording, then zip + exact file naming, then submit via form

## How I want to work with you on this

Build part by part, not all at once. After each part, I'll test it in the browser myself before we move to the next. When generating code, keep it consistent with the existing style/structure already in the provided files rather than rewriting everything from scratch.