// noteNode.js

import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { StickyNote } from 'lucide-react';

export const NoteNode = ({ id, data }) => {
  const [noteText, setNoteText] = useState(data?.noteText || '');

  return (
    <BaseNode 
      id={id} 
      title="Note" 
      icon={<StickyNote size={15} />}
      accentColor="#eab308"
      handles={[]}
    >
      <div className="node-field">
        <label className="node-field-label">Note</label>
        <textarea
          className="node-textarea"
          value={noteText}
          placeholder="Enter note..."
          onChange={(e) => setNoteText(e.target.value)}
        />
      </div>
    </BaseNode>
  );
};
