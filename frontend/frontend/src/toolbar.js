// toolbar.js

import { DraggableNode } from './draggableNode';
import { Layers } from 'lucide-react';

export const PipelineToolbar = () => {
    return (
        <div className="pipeline-toolbar">
            <div className="toolbar-header">
                <div className="toolbar-brand">
                    <Layers size={20} color="#6366f1" />
                    <span>VectorShift Pipeline Builder</span>
                    <span className="toolbar-brand-badge">Canvas v2</span>
                </div>
            </div>
            <div className="toolbar-nodes-list">
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='text' label='Text' />
                <DraggableNode type='filter' label='Filter' />
                <DraggableNode type='transform' label='Transform' />
                <DraggableNode type='note' label='Note' />
                <DraggableNode type='database' label='Database' />
                <DraggableNode type='api' label='API' />
            </div>
        </div>
    );
};
