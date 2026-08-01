// textNode.js

import { useState, useRef, useEffect, useLayoutEffect, useMemo } from 'react';
import { Position, useUpdateNodeInternals } from 'reactflow';
import { BaseNode } from './BaseNode';
import { Type } from 'lucide-react';
import { useStore } from '../store';

const extractVariables = (text) => {
  if (!text) return [];
  const regex = /\{\{\s*([a-zA-Z0-9_$\-\s]+?)\s*\}\}/g;
  const variables = [];
  let match;
  while ((match = regex.exec(text)) !== null) {
    const varName = match[1].trim();
    if (varName && !variables.includes(varName)) {
      variables.push(varName);
    }
  }
  return variables;
};

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const textareaRef = useRef(null);
  const updateNodeInternals = useUpdateNodeInternals();
  const updateNodeField = useStore((state) => state.updateNodeField);

  const variables = useMemo(() => extractVariables(currText), [currText]);

  // Generate dynamic target handles for variables + static source handle for output
  const handles = useMemo(() => {
    const leftHandles = variables.map((varName, index) => ({
      type: 'target',
      position: Position.Left,
      id: `${id}-${varName.replace(/\s+/g, '_')}`,
      label: varName,
      style: {
        top: `${((index + 1) / (variables.length + 1)) * 100}%`,
      },
    }));

    const rightHandle = {
      type: 'source',
      position: Position.Right,
      id: `${id}-output`,
    };

    return [...leftHandles, rightHandle];
  }, [id, variables]);

  // Dynamic width calculation based on content and variable handles
  const nodeWidth = useMemo(() => {
    const lines = currText.split('\n');
    const maxLineLength = Math.max(...lines.map((l) => l.length), 0);
    const maxVarLength = variables.length > 0 ? Math.max(...variables.map(v => v.length), 0) : 0;
    const leftOffset = variables.length > 0 ? Math.max(40, maxVarLength * 6 + 10) : 0;
    return Math.max(210 + leftOffset, Math.min(550, maxLineLength * 8 + 40 + leftOffset));
  }, [currText, variables]);

  // Adjust textarea height dynamically
  useLayoutEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [currText]);

  // Recalculate React Flow handle positions whenever handles or node size changes
  useEffect(() => {
    updateNodeInternals(id);
  }, [id, handles, nodeWidth, updateNodeInternals]);

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setCurrText(newText);
    if (updateNodeField) {
      updateNodeField(id, 'text', newText);
    }
  };

  const hasVariables = variables.length > 0;

  return (
    <BaseNode
      id={id}
      title="Text"
      icon={<Type size={15} />}
      accentColor="#f59e0b"
      handles={handles}
      hasVariables={hasVariables}
      style={{ width: nodeWidth }}
    >
      <div className="node-field">
        <label className={`node-field-label ${hasVariables ? 'centered' : ''}`}>Text</label>
        <textarea
          ref={textareaRef}
          className="node-textarea nodrag nopan"
          value={currText}
          onChange={handleTextChange}
          placeholder="Type text or {{variable}}..."
          rows={1}
        />
      </div>
    </BaseNode>
  );
};

