// outputNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { Upload } from 'lucide-react';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data?.outputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setOutputType(e.target.value);
  };

  const handles = [
    {
      type: 'target',
      position: Position.Left,
      id: `${id}-value`,
    },
  ];

  return (
    <BaseNode 
      id={id} 
      title="Output" 
      icon={<Upload size={15} />}
      accentColor="#f43f5e"
      handles={handles}
    >
      <div className="node-field">
        <label className="node-field-label">Name</label>
        <input 
          type="text" 
          className="node-input"
          value={currName} 
          onChange={handleNameChange} 
        />
      </div>
      <div className="node-field">
        <label className="node-field-label">Type</label>
        <select className="node-select" value={outputType} onChange={handleTypeChange}>
          <option value="Text">Text</option>
          <option value="File">Image</option>
        </select>
      </div>
    </BaseNode>
  );
};
