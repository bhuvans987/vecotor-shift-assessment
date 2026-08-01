// databaseNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { Database } from 'lucide-react';

export const DatabaseNode = ({ id, data }) => {
  const [tableName, setTableName] = useState(data?.tableName || 'users');
  const [operation, setOperation] = useState(data?.operation || 'Select');

  const handles = [
    {
      type: 'target',
      position: Position.Left,
      id: `${id}-query`,
    },
    {
      type: 'source',
      position: Position.Right,
      id: `${id}-result`,
    },
  ];

  return (
    <BaseNode 
      id={id} 
      title="Database" 
      icon={<Database size={15} />}
      accentColor="#3b82f6"
      handles={handles}
    >
      <div className="node-field">
        <label className="node-field-label">Table</label>
        <input
          type="text"
          className="node-input nodrag nopan"
          value={tableName}
          onChange={(e) => setTableName(e.target.value)}
        />
      </div>
      <div className="node-field">
        <label className="node-field-label">Operation</label>
        <select 
          className="node-select nodrag nopan"
          value={operation} 
          onChange={(e) => setOperation(e.target.value)}
        >
          <option value="Select">Select</option>
          <option value="Insert">Insert</option>
          <option value="Update">Update</option>
          <option value="Delete">Delete</option>
        </select>
      </div>
    </BaseNode>
  );
};
