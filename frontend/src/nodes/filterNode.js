// filterNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { Filter } from 'lucide-react';

export const FilterNode = ({ id, data }) => {
  const [condition, setCondition] = useState(data?.condition || 'contains');
  const [filterValue, setFilterValue] = useState(data?.filterValue || '');

  const handles = [
    {
      type: 'target',
      position: Position.Left,
      id: `${id}-input`,
    },
    {
      type: 'source',
      position: Position.Right,
      id: `${id}-pass`,
      style: { top: `${100 / 3}%` },
    },
    {
      type: 'source',
      position: Position.Right,
      id: `${id}-fail`,
      style: { top: `${200 / 3}%` },
    },
  ];

  return (
    <BaseNode 
      id={id} 
      title="Filter" 
      icon={<Filter size={15} />}
      accentColor="#06b6d4"
      handles={handles}
    >
      <div className="node-field">
        <label className="node-field-label">Condition</label>
        <select 
          className="node-select nodrag nopan"
          value={condition} 
          onChange={(e) => setCondition(e.target.value)}
        >
          <option value="contains">Contains</option>
          <option value="equals">Equals</option>
          <option value="startsWith">Starts With</option>
          <option value="endsWith">Ends With</option>
        </select>
      </div>
      <div className="node-field">
        <label className="node-field-label">Value</label>
        <input
          type="text"
          className="node-input nodrag nopan"
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
        />
      </div>
    </BaseNode>
  );
};
