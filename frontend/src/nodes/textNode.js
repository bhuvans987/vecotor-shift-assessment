// textNode.js

import { useState, useRef, useEffect, useLayoutEffect, useMemo } from 'react';
import { Position, useUpdateNodeInternals } from 'reactflow';
import { BaseNode } from './BaseNode';
import { Type } from 'lucide-react';
import { useStore } from '../store';

const extractVariables = (text) => {
  if (!text) return [];
  const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
  const variables = [];
  let match;
  while ((match = regex.exec(text)) !== null) {
    if (!variables.includes(match[1])) {
      variables.push(match[1]);
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

  // Fixed top offset starting below the header (~42px) with consistent spacing between handles
  const handles = useMemo(() => {
    const startTop = 52; // Start below the header bar
    const step = 28;     // Consistent 28px spacing between each handle

    const leftHandles = variables.map((varName, index) => ({
      type: 'target',
      position: Position.Left,
      id: `${id}-${varName}`,
      label: varName,
      style: {
        top: `${startTop + index * step}px`,
      },
    }));

    const rightHandle = {
      type: 'source',
      position: Position.Right,
      id: `${id}-output`,
    };

    return [...leftHandles, rightHandle];
  }, [id, variables]);

  const maxVarLength = useMemo(() => {
    if (variables.length === 0) return 0;
    return Math.max(...variables.map((v) => v.length), 0);
  }, [variables]);

  // Left padding gutter to guarantee handles & handle labels never overlap the text input box
  const bodyPaddingLeft = useMemo(() => {
    if (variables.length === 0) return 14;
    return Math.max(52, maxVarLength * 7 + 22);
  }, [variables, maxVarLength]);

  // Dynamic width calculation based on content and variable handles offset
  const nodeWidth = useMemo(() => {
    const lines = currText.split('\n');
    const maxLineLength = Math.max(...lines.map((l) => l.length), 0);
    const textWidth = Math.max(160, maxLineLength * 8 + 30);
    return Math.max(220, textWidth + (variables.length > 0 ? bodyPaddingLeft : 14));
  }, [currText, variables, bodyPaddingLeft]);

  // Minimum height to ensure node card expands to fit all vertical handles
  const nodeMinHeight = useMemo(() => {
    if (variables.length === 0) return 0;
    return 52 + variables.length * 28 + 15;
  }, [variables]);

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
  }, [id, handles, nodeWidth, nodeMinHeight, updateNodeInternals]);

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
      style={{ width: nodeWidth, minHeight: nodeMinHeight ? `${nodeMinHeight}px` : undefined }}
      bodyStyle={hasVariables ? { paddingLeft: `${bodyPaddingLeft}px` } : {}}
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


