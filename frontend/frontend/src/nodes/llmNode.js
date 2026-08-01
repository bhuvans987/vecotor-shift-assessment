// llmNode.js

import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { Sparkles } from 'lucide-react';

export const LLMNode = ({ id, data }) => {
  const handles = [
    {
      type: 'target',
      position: Position.Left,
      id: `${id}-system`,
      style: { top: `${100 / 3}%` },
    },
    {
      type: 'target',
      position: Position.Left,
      id: `${id}-prompt`,
      style: { top: `${200 / 3}%` },
    },
    {
      type: 'source',
      position: Position.Right,
      id: `${id}-response`,
    },
  ];

  return (
    <BaseNode 
      id={id} 
      title="LLM" 
      icon={<Sparkles size={15} />}
      accentColor="#a855f7"
      handles={handles}
    >
      <div className="node-text-display">
        Generative Large Language Model instance.
      </div>
    </BaseNode>
  );
};
