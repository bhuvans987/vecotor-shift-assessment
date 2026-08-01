// draggableNode.js

import { 
  Download, 
  Sparkles, 
  Upload, 
  Type, 
  Filter, 
  Zap, 
  StickyNote, 
  Database, 
  Globe 
} from 'lucide-react';

const iconMap = {
  customInput: { icon: Download, color: '#10b981' },
  llm: { icon: Sparkles, color: '#a855f7' },
  customOutput: { icon: Upload, color: '#f43f5e' },
  text: { icon: Type, color: '#f59e0b' },
  filter: { icon: Filter, color: '#06b6d4' },
  transform: { icon: Zap, color: '#6366f1' },
  note: { icon: StickyNote, color: '#eab308' },
  database: { icon: Database, color: '#3b82f6' },
  api: { icon: Globe, color: '#84cc16' },
};

export const DraggableNode = ({ type, label }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.target.style.cursor = 'grabbing';
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  const nodeMeta = iconMap[type] || { icon: Type, color: '#6366f1' };
  const IconComponent = nodeMeta.icon;

  return (
    <div
      className={`draggable-node ${type}`}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = 'grab')}
      draggable
    >
      <span className="draggable-node-icon" style={{ color: nodeMeta.color }}>
        <IconComponent size={16} />
      </span>
      <span>{label}</span>
    </div>
  );
};