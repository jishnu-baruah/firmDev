import React, { useState, useEffect } from 'react';
import { useDrop } from 'react-dnd';

const DropZone = ({ onDrop, children }) => {
  const [isEmpty, setIsEmpty] = useState(true);

  useEffect(() => {
    setIsEmpty(children.length === 0);
  }, [children]);

  const [, drop] = useDrop(() => ({
    accept: 'box',
    drop: (item, monitor) => {
      const offset = monitor.getClientOffset();
      onDrop(item, offset);
    },
  }));

  return (
    <div ref={drop} className="drop-zone" style={{ backgroundColor: '#333', position: 'relative', width: '100%', height: '100%' }}>
      {isEmpty && (
        <div className="drop-text">
          <p>Drop here!</p>
        </div>
      )}
      {children}
    </div>
  );
};

export default DropZone;
