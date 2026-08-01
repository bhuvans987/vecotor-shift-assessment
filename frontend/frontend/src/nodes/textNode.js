// textNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { Type } from 'lucide-react';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  const handles = [
    {
      type: 'source',
      position: Position.Right,
      id: `${id}-output`,
    },
  ];

  return (
    <BaseNode 
      id={id} 
      title="Text" 
      icon={<Type size={15} />}
      accentColor="#f59e0b"
      handles={handles}
    >
      <div className="node-field">
        <label className="node-field-label">Text</label>
        <input 
          type="text" 
          className="node-input"
          value={currText} 
          onChange={handleTextChange} 
        />
      </div>
    </BaseNode>
  );
};
