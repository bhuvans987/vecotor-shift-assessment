// BaseNode.js

import { Handle } from 'reactflow';

export const BaseNode = ({
  id,
  title,
  icon = null,
  accentColor = '#6366f1',
  handles = [],
  children,
  style = {},
}) => {
  const containerStyle = {
    minWidth: 210,
    ...style,
  };

  return (
    <div className="base-node" style={containerStyle}>
      {handles.map((handle, index) => (
        <Handle
          key={handle.id || `${id}-handle-${index}`}
          type={handle.type}
          position={handle.position}
          id={handle.id}
          style={{
            backgroundColor: accentColor,
            ...handle.style,
          }}
        />
      ))}
      {title && (
        <div className="base-node-header">
          <div className="base-node-title-group">
            {icon && <span className="base-node-icon" style={{ color: accentColor }}>{icon}</span>}
            <span className="base-node-title">{title}</span>
          </div>
          <span 
            className="base-node-badge" 
            style={{ 
              backgroundColor: `${accentColor}20`, 
              color: accentColor, 
              borderColor: `${accentColor}40` 
            }}
          >
            Node
          </span>
        </div>
      )}
      <div className="base-node-body">
        {children}
      </div>
    </div>
  );
};
