// apiNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { Globe } from 'lucide-react';

export const APINode = ({ id, data }) => {
  const [url, setUrl] = useState(data?.url || 'https://api.example.com');
  const [method, setMethod] = useState(data?.method || 'GET');

  const handles = [
    {
      type: 'target',
      position: Position.Left,
      id: `${id}-params`,
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
      title="API Request" 
      icon={<Globe size={15} />}
      accentColor="#84cc16"
      handles={handles}
    >
      <div className="node-field">
        <label className="node-field-label">Method</label>
        <select 
          className="node-select"
          value={method} 
          onChange={(e) => setMethod(e.target.value)}
        >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
        </select>
      </div>
      <div className="node-field">
        <label className="node-field-label">URL</label>
        <input
          type="text"
          className="node-input"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>
    </BaseNode>
  );
};
