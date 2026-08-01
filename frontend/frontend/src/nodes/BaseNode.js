import { Handle, Position } from 'reactflow';

export const BaseNode = ({
  id,
  title,
  icon = null,
  accentColor = '#6366f1',
  handles = [],
  children,
  style = {},
  hasVariables = false,
}) => {
  const containerStyle = {
    minWidth: 210,
    ...style,
  };

  return (
    <div className={`base-node ${hasVariables ? 'has-variables' : ''}`} style={containerStyle}>
      {handles.map((handle, index) => (
        <div key={handle.id || `${id}-handle-${index}`}>
          <Handle
            type={handle.type}
            position={handle.position}
            id={handle.id}
            style={{
              backgroundColor: accentColor,
              ...handle.style,
            }}
          />
          {handle.label && (
            <span
              className="handle-label"
              style={{
                position: 'absolute',
                [handle.position === Position.Left ? 'left' : 'right']: 14,
                top: handle.style?.top || '50%',
                transform: 'translateY(-50%)',
                fontSize: '10px',
                color: 'var(--text-muted)',
                pointerEvents: 'none',
                whiteSpace: 'nowrap',
                fontWeight: 500,
                zIndex: 10,
              }}
            >
              {handle.label}
            </span>
          )}
        </div>
      ))}
      {title && (
        <div className={`base-node-header ${hasVariables ? 'centered' : ''}`}>
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
      <div className={`base-node-body ${hasVariables ? 'has-variables' : ''}`}>
        {children}
      </div>
    </div>
  );
};

