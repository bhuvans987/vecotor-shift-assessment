// inputNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { Download } from 'lucide-react';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data?.inputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setInputType(e.target.value);
  };

  const handles = [
    {
      type: 'source',
      position: Position.Right,
      id: `${id}-value`,
    },
  ];

  return (
    <BaseNode 
      id={id} 
      title="Input" 
      icon={<Download size={15} />}
      accentColor="#10b981"
      handles={handles}
    >
      <div className="node-field">
        <label className="node-field-label">Name</label>
        <input 
          type="text" 
          className="node-input nodrag nopan"
          value={currName} 
          onChange={handleNameChange} 
        />
      </div>
      <div className="node-field">
        <label className="node-field-label">Type</label>
        <select className="node-select nodrag nopan" value={inputType} onChange={handleTypeChange}>
          <option value="Text">Text</option>
          <option value="File">File</option>
        </select>
      </div>
    </BaseNode>
  );
};
