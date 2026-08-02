// transformNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { Zap } from 'lucide-react';

export const TransformNode = ({ id, data }) => {
  const [transformType, setTransformType] = useState(data?.transformType || 'Uppercase');

  const handles = [
    {
      type: 'target',
      position: Position.Left,
      id: `${id}-input`,
    },
    {
      type: 'source',
      position: Position.Right,
      id: `${id}-output`,
    },
  ];

  return (
    <BaseNode 
      id={id} 
      title="Transform" 
      icon={<Zap size={15} />}
      accentColor="#6366f1"
      handles={handles}
    >
      <div className="node-field">
        <label className="node-field-label">Type</label>
        <select 
          className="node-select nodrag nopan"
          value={transformType} 
          onChange={(e) => setTransformType(e.target.value)}
        >
          <option value="Uppercase">Uppercase</option>
          <option value="Lowercase">Lowercase</option>
          <option value="Trim">Trim</option>
          <option value="JSON">JSON Parse</option>
        </select>
      </div>
    </BaseNode>
  );
};
