
import React from 'react';
import { useDrag } from 'react-dnd';

const DraggableBox = ({ component, children }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'box',
    item: component,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }), [component]);

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }} className="draggable-box">
      {children}
    </div>
  );
};

export default DraggableBox;

