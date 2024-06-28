// import React, { useState, useRef } from 'react';
// import DraggableBox from './DraggableBox';
// import DropZone from './DropZone';
// import EditPopup from './EditPopup';
// import hardwareCategories from './hardwareCategories';
// import { generateUniqueId } from './utils';
// import Draggable from 'react-draggable';
// import SubComponentSelect from './SubComponentSelect'; // Import SubComponentSelect component
// import './App.css';

// const App = () => {
//   const [droppedItems, setDroppedItems] = useState([]);
//   const [itemProperties, setItemProperties] = useState({});
//   const [contextMenu, setContextMenu] = useState({ isVisible: false, position: { x: 0, y: 0 }, itemId: null });
//   const [editingItem, setEditingItem] = useState(null);
//   const [properties, setProperties] = useState({ name: '', pin: '', vcc: '', gnd: '' });
//   const dropZoneRef = useRef(null);

//   const handleDrop = (component, offset) => {
//     if (dropZoneRef.current) {
//       const dropZoneRect = dropZoneRef.current.getBoundingClientRect();
//       const adjustedOffset = {
//         x: offset.x - dropZoneRect.left,
//         y: offset.y - dropZoneRect.top,
//       };

//       const uniqueId = generateUniqueId(component.id);
//       const newComponent = { ...component, id: uniqueId, name: component.name, pin: component.pin, defaultPosition: adjustedOffset };

//       setDroppedItems((prevItems) => [...prevItems, uniqueId]);
//       setItemProperties((prevProperties) => ({
//         ...prevProperties,
//         [uniqueId]: newComponent,
//       }));
//     }
//   };

//   const handleDelete = (id) => {
//     setDroppedItems(droppedItems.filter((item) => item !== id));
//     setContextMenu({ isVisible: false, itemId: null });
//   };

//   const handleRightClick = (event, id) => {
//     event.preventDefault();
//     setContextMenu({
//       isVisible: true,
//       position: { x: event.clientX, y: event.clientY },
//       itemId: id,
//     });
//   };

//   const handleCloseContextMenu = () => {
//     setContextMenu({ isVisible: false, itemId: null });
//   };

//   const handleEdit = (id) => {
//     setEditingItem(id);
//     setProperties(itemProperties[id]);
//     setContextMenu({ isVisible: false, itemId: null });
//   };

//   const handleSave = () => {
//     setItemProperties((prevProperties) => ({ ...prevProperties, [editingItem]: properties }));
//     setEditingItem(null);
//   };

//   const handleSelectComponent = (componentId) => {
//     const selectedComponent = hardwareCategories
//       .flatMap(category => category.components)
//       .find(component => component.id === parseInt(componentId));
    
//     if (selectedComponent) {
//       handleDrop(selectedComponent, { x: 100, y: 100 }); // Example position, adjust as needed
//     }
//   };

//   return (
//     <div className="app-container" onClick={handleCloseContextMenu}>
//       <div className="sidebar">
//         {hardwareCategories.map((category, index) => (
//           <div key={index}>
//             <h2>{category.category}</h2>
//             <SubComponentSelect components={category.components} onSelect={handleSelectComponent} />
//           </div>
//         ))}
//       </div>
//       <div className="drop-zone-container" ref={dropZoneRef}>
//         <DropZone onDrop={handleDrop}>
//           {droppedItems.map((item) => (
//             <Draggable key={item} defaultPosition={itemProperties[item]?.defaultPosition || { x: 0, y: 0 }}>
//               <div className="dropped-item" onContextMenu={(e) => handleRightClick(e, item)}>
//                 {itemProperties[item]?.name || 'Unnamed Component'}
//               </div>
//             </Draggable>
//           ))}
//         </DropZone>
//       </div>
//       {contextMenu.isVisible && (
//         <ul className="context-menu" style={{ top: contextMenu.position.y, left: contextMenu.position.x }}>
//           <li onClick={() => handleEdit(contextMenu.itemId)}>Edit</li>
//           <li onClick={() => handleDelete(contextMenu.itemId)}>Delete</li>
//         </ul>
//       )}
//       {editingItem && (
//         <EditPopup
//           item={editingItem}
//           properties={properties}
//           setProperties={setProperties}
//           onClose={() => setEditingItem(null)}
//           onSave={handleSave}
//         />
//       )}
//     </div>
//   );
// };

// export default App;












// import React, { useState, useRef } from 'react';
// // eslint-disable-next-line no-unused-vars
// import DraggableBox from './DraggableBox';
// import DropZone from './DropZone';
// import EditPopup from './EditPopup';
// import hardwareCategories from './hardwareCategories';
// import { generateUniqueId } from './utils';
// import Draggable from 'react-draggable';
// import SubComponentSelect from './SubComponentSelect'; // Import SubComponentSelect component
// import './App.css';

// const App = () => {
//   const [droppedItems, setDroppedItems] = useState([]);
//   const [itemProperties, setItemProperties] = useState({});
//   const [contextMenu, setContextMenu] = useState({ isVisible: false, position: { x: 0, y: 0 }, itemId: null });
//   const [editingItem, setEditingItem] = useState(null);
//   const [properties, setProperties] = useState({ name: '', pin: '', vcc: '', gnd: '' });
//   const dropZoneRef = useRef(null);

//   const handleDrop = (component, offset) => {
//     if (dropZoneRef.current) {
//       const dropZoneRect = dropZoneRef.current.getBoundingClientRect();
//       const adjustedOffset = {
//         x: offset.x - dropZoneRect.left,
//         y: offset.y - dropZoneRect.top,
//       };

//       const uniqueId = generateUniqueId(component.id);
//       const newComponent = { ...component, id: uniqueId, name: component.name, pin: component.pin, defaultPosition: adjustedOffset };

//       setDroppedItems((prevItems) => [...prevItems, uniqueId]);
//       setItemProperties((prevProperties) => ({
//         ...prevProperties,
//         [uniqueId]: newComponent,
//       }));
//     }
//   };

//   const handleDelete = (id) => {
//     setDroppedItems(droppedItems.filter((item) => item !== id));
//     setContextMenu({ isVisible: false, itemId: null });
//   };

//   const handleRightClick = (event, id) => {
//     event.preventDefault();
//     setContextMenu({
//       isVisible: true,
//       position: { x: event.clientX, y: event.clientY },
//       itemId: id,
//     });
//   };

//   const handleCloseContextMenu = () => {
//     setContextMenu({ isVisible: false, itemId: null });
//   };

//   const handleEdit = (id) => {
//     setEditingItem(id);
//     setProperties(itemProperties[id]);
//     setContextMenu({ isVisible: false, itemId: null });
//   };

//   const handleSave = () => {
//     setItemProperties((prevProperties) => ({ ...prevProperties, [editingItem]: properties }));
//     setEditingItem(null);
//   };

//   const handleSelectComponent = (componentId) => {
//     const selectedComponent = hardwareCategories
//       .flatMap(category => category.components)
//       .find(component => component.id === parseInt(componentId));
    
//     if (selectedComponent) {
//       handleDrop(selectedComponent, { x: 100, y: 100 }); // Example position, adjust as needed
//     }
//   };

//   return (
//     <div className="app-container" onClick={handleCloseContextMenu}>
//       <div className="sidebar">
//         {hardwareCategories.map((category, index) => (
//           <div key={index}>
//             <h2>{category.category}</h2>
//             <SubComponentSelect components={category.components} onSelect={handleSelectComponent} />
//           </div>
//         ))}
//       </div>
//       <div className="drop-zone-container" ref={dropZoneRef}>
//         <DropZone onDrop={handleDrop}>
//           {droppedItems.map((item) => (
//             <Draggable key={item} defaultPosition={itemProperties[item]?.defaultPosition || { x: 0, y: 0 }}>
//               <div className="dropped-item" onContextMenu={(e) => handleRightClick(e, item)}>
//                 {itemProperties[item]?.name || 'Unnamed Component'}
//               </div>
//             </Draggable>
//           ))}
//         </DropZone>
//       </div>
//       {contextMenu.isVisible && (
//         <ul className="context-menu" style={{ top: contextMenu.position.y, left: contextMenu.position.x }}>
//           <li onClick={() => handleEdit(contextMenu.itemId)}>Edit</li>
//           <li onClick={() => handleDelete(contextMenu.itemId)}>Delete</li>
//         </ul>
//       )}
//       {editingItem && (
//         <EditPopup
//           item={editingItem}
//           properties={properties}
//           setProperties={setProperties}
//           onClose={() => setEditingItem(null)}
//           onSave={handleSave}
//         />
//       )}
//       <div className="right-column">
//         <button className="show-sketch-button">Show Sketch</button>
//         <div className="code-display"></div>
//         <hr />
//         <button className="compile-button">Compile</button>
//       </div>
//     </div>
//   );
// };

// export default App;


import React, { useState, useRef } from 'react';
import DraggableBox from './DraggableBox';
import DropZone from './DropZone';
import EditPopup from './EditPopup';
import hardwareCategories from './hardwareCategories';
import { generateUniqueId } from './utils';
import Draggable from 'react-draggable';
import SubComponentSelect from './SubComponentSelect'; // Import SubComponentSelect component
import './App.css';

const App = () => {
  const [droppedItems, setDroppedItems] = useState([]);
  const [itemProperties, setItemProperties] = useState({});
  const [contextMenu, setContextMenu] = useState({ isVisible: false, position: { x: 0, y: 0 }, itemId: null });
  const [editingItem, setEditingItem] = useState(null);
  const [properties, setProperties] = useState({ name: '', pin: '', vcc: '', gnd: '' });
  const dropZoneRef = useRef(null);

  const handleDrop = (component, offset) => {
    if (dropZoneRef.current) {
      const dropZoneRect = dropZoneRef.current.getBoundingClientRect();
      const adjustedOffset = {
        x: offset.x - dropZoneRect.left,
        y: offset.y - dropZoneRect.top,
      };

      const uniqueId = generateUniqueId(component.id);
      const newComponent = { ...component, id: uniqueId, name: component.name, pin: component.pin, defaultPosition: adjustedOffset };

      setDroppedItems((prevItems) => [...prevItems, uniqueId]);
      setItemProperties((prevProperties) => ({
        ...prevProperties,
        [uniqueId]: newComponent,
      }));
    }
  };

  const handleDelete = (id) => {
    setDroppedItems(droppedItems.filter((item) => item !== id));
    setContextMenu({ isVisible: false, itemId: null });
  };

  const handleRightClick = (event, id) => {
    event.preventDefault();
    setContextMenu({
      isVisible: true,
      position: { x: event.clientX, y: event.clientY },
      itemId: id,
    });
  };

  const handleCloseContextMenu = () => {
    setContextMenu({ isVisible: false, itemId: null });
  };

  const handleEdit = (id) => {
    setEditingItem(id);
    setProperties(itemProperties[id]);
    setContextMenu({ isVisible: false, itemId: null });
  };

  const handleSave = () => {
    setItemProperties((prevProperties) => ({ ...prevProperties, [editingItem]: properties }));
    setEditingItem(null);
  };

  const handleSelectComponent = (componentId) => {
    const selectedComponent = hardwareCategories
      .flatMap(category => category.components)
      .find(component => component.id === parseInt(componentId));
    
    if (selectedComponent) {
      handleDrop(selectedComponent, { x: 100, y: 100 }); // Example position, adjust as needed
    }
  };

  return (
    <div className="app-container" onClick={handleCloseContextMenu}>
      <div className="sidebar">
        {hardwareCategories.map((category, index) => (
          <div key={index}>
            <h2>{category.category}</h2>
            <SubComponentSelect components={category.components} onSelect={handleSelectComponent} />
          </div>
        ))}
      </div>
      <div className="drop-zone-container" ref={dropZoneRef}>
        <DropZone onDrop={handleDrop}>
          {droppedItems.map((item) => (
            <Draggable key={item} defaultPosition={itemProperties[item]?.defaultPosition || { x: 0, y: 0 }}>
              <div className="dropped-item" onContextMenu={(e) => handleRightClick(e, item)}>
                {itemProperties[item]?.name || 'Unnamed Component'}
              </div>
            </Draggable>
          ))}
        </DropZone>
      </div>
      <div className="right-column">
        <button className="show-sketch-button">Show Sketch</button>
        <div className="code-display"></div>
        <hr />
        <button className="compile-button">Compile</button>
      </div>
      {contextMenu.isVisible && (
        <ul className="context-menu" style={{ top: contextMenu.position.y, left: contextMenu.position.x }}>
          <li onClick={() => handleEdit(contextMenu.itemId)}>Edit</li>
          <li onClick={() => handleDelete(contextMenu.itemId)}>Delete</li>
        </ul>
      )}
      {editingItem && (
        <EditPopup
          item={editingItem}
          properties={properties}
          setProperties={setProperties}
          onClose={() => setEditingItem(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default App;
