// submit.js

import { Play } from 'lucide-react';
import { useStore } from './store';

export const SubmitButton = () => {
    const nodes = useStore((state) => state.nodes);
    const edges = useStore((state) => state.edges);

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://localhost:8000/pipelines/parse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nodes, edges }),
            });

            if (!response.ok) {
                throw new Error(`Server returned status ${response.status}`);
            }

            const data = await response.json();

            const alertMessage = 
                `Pipeline Analysis Results:\n\n` +
                `• Number of Nodes: ${data.num_nodes}\n` +
                `• Number of Edges: ${data.num_edges}\n` +
                `• Is Valid DAG: ${data.is_dag ? 'Yes (No cycles)' : 'No (Contains cycles)'}`;

            alert(alertMessage);
        } catch (error) {
            console.error('Error parsing pipeline:', error);
            alert(`Failed to connect to backend server. Make sure FastAPI server is running on http://localhost:8000.\n\nDetails: ${error.message}`);
        }
    };

    return (
        <div className="submit-action-bar">
            <button type="button" className="submit-button" onClick={handleSubmit}>
                <Play size={16} fill="currentColor" />
                <span>Submit Pipeline</span>
            </button>
        </div>
    );
};
