// import React, { useState, useRef, useEffect } from 'react';
// import DropZone from './DropZone';
// import EditPopup from './EditPopup';
// import hardwareCategories from './hardwareCategories';
// import { generateUniqueId } from './utils';
// import Draggable from 'react-draggable';
// import SubComponentSelect from './SubComponentSelect';
// import Modal from './Modal';
// import './App.css';

// const address = "http://192.168.222.82:5000";

// const App = () => {
//   const [droppedItems, setDroppedItems] = useState([]);
//   const [itemProperties, setItemProperties] = useState({});
//   const [contextMenu, setContextMenu] = useState({ isVisible: false, position: { x: 0, y: 0 }, itemId: null });
//   const [editingItem, setEditingItem] = useState(null);
//   const [properties, setProperties] = useState({ name: '', pin: '', vcc: '', gnd: '' });
//   const [showDummyParagraph, setShowDummyParagraph] = useState(false);
//   const dropZoneRef = useRef(null);
//   const [sketchContent, setSketchContent] = useState('');
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (contextMenu.isVisible && !event.target.closest('.context-menu')) {
//         setContextMenu({ isVisible: false, position: { x: 0, y: 0 }, itemId: null });
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [contextMenu]);

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

//   const fetchSketchContent = async () => {
//     try {
//       const response = await fetch(address + '/sketch/sketch-content');
//       const content = await response.text();
//       setSketchContent(content);
//       setIsModalOpen(true);
//     } catch (error) {
//       console.error('Error fetching sketch content:', error);
//     }
//   };

//   const compileSketch = async () => {
//     try {
//       const response = await fetch(address + '/sketch/compile');
//       const message = await response.text();
//       console.log(message);
//       alert("Successfully compiled");
//     } catch (error) {
//       console.error('Error compiling sketch:', error);
//     }
//   };

//   const handleGenerate = async () => {
//     const projectDetails = searchTerm;
//     const componentData = droppedItems.map(item => itemProperties[item]);

//     if (!projectDetails && componentData.length === 0) {
//       alert('Please provide project details and component data.');
//       return;
//     }

//     try {
//       const response = await fetch(address + '/sketch/generate', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ projectDetails, componentData })
//       });

//       if (!response.ok) {
//         throw new Error('Failed to generate sketch');
//       }

//       const resultMessage = await response.text();
//       alert(resultMessage);
//       alert('Click on the "Show Sketch" button to view the code');
//     } catch (error) {
//       console.error('Error generating sketch:', error);
//       alert('Error generating sketch.');
//     }
//   };

//   const handleContextMenu = (e, itemId) => {
//     e.preventDefault(); // Prevent default right-click menu
//     setContextMenu({ isVisible: true, position: { x: e.clientX, y: e.clientY }, itemId });
//   };

//   const handleDeleteItem = (itemId) => {
//     setDroppedItems(droppedItems.filter((item) => item !== itemId));
//     setItemProperties((prevProperties) => {
//       const updatedProperties = { ...prevProperties };
//       delete updatedProperties[itemId];
//       return updatedProperties;
//     });
//     setContextMenu({ isVisible: false, position: { x: 0, y: 0 }, itemId: null }); // Hide context menu
//   };

//   return (
//     <div className="app-container">
//       <div className="sidebar">
//         <h1 className="hhhh">Draw your Sketch!!</h1>
//         {hardwareCategories.map((category, index) => (
//           <div key={index}>
//             <SubComponentSelect
//               categoryName={category.category}
//               components={category.components}
//               onSelect={(componentId) => {
//                 const selectedComponent = category.components.find((component) => component.id === parseInt(componentId, 10));
//                 if (selectedComponent) {
//                   handleDrop(selectedComponent, { x: 100, y: 100 }); // Example position, adjust as needed
//                 }
//               }}
//             />
//           </div>
//         ))}
//       </div>
//       <div className="drop-zone-container" ref={dropZoneRef}>
//         <DropZone onDrop={handleDrop}>
//           {droppedItems.map((item) => (
//             <Draggable key={item} defaultPosition={itemProperties[item]?.defaultPosition || { x: 0, y: 0 }} bounds="parent">
//               <div
//                 className="dropped-item"
//                 onContextMenu={(e) => handleContextMenu(e, item)}
//               >
//                 {itemProperties[item]?.img ? (
//                   <img
//                     src={itemProperties[item].img.src}
//                     style={{ height: itemProperties[item].img.height }}
//                     alt={itemProperties[item].name}
//                   />
//                 ) : (
//                   <span className="name-without-image">{itemProperties[item]?.name}</span>
//                 )}
//               </div>
//             </Draggable>
//           ))}
//         </DropZone>
//         <div className="bottom-bar">
//           <div className="search-bar">
//             <input
//               type="text"
//               className="search-input"
//               placeholder="Enter search term..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//             <button className="generate-button" onClick={handleGenerate}>Generate</button>
//           </div>
//         </div>
//       </div>
//       <div className="right-column">
//         <div className="button-row">
//           <button className="show-sketch-button" onClick={fetchSketchContent}>Show Sketch</button>
//           <button className="compile-button" onClick={compileSketch}>Compile</button>
//         </div>
//         <div className="separator"></div>
//         <h2>All components used</h2>
//         <ul>
//           {droppedItems.map((item) => (
//             <li key={item}>{itemProperties[item]?.name}</li>
//           ))}
//         </ul>
//       </div>
//       {contextMenu.isVisible && (
//         <ul className="context-menu" style={{ top: contextMenu.position.y, left: contextMenu.position.x }}>
//           <li onClick={() => setEditingItem(contextMenu.itemId)}>Edit</li>
//           <li onClick={() => handleDeleteItem(contextMenu.itemId)}>Delete</li>
//         </ul>
//       )}
//       {editingItem && (
//         <EditPopup
//           item={editingItem}
//           properties={properties}
//           setProperties={setProperties}
//           onClose={() => setEditingItem(null)}
//           onSave={() => {
//             setItemProperties((prevProperties) => ({ ...prevProperties, [editingItem]: properties }));
//             setEditingItem(null);
//           }}
//         />
//       )}
//       <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
//         <div className="code-display">
//           <pre>{sketchContent}</pre>
//         </div>
//       </Modal>
//     </div>
//   );
// };

// export default App;


















// import React, { useState, useRef, useEffect } from 'react';
// import DropZone from './DropZone';
// import EditPopup from './EditPopup';
// import hardwareCategories from './hardwareCategories';
// import { generateUniqueId } from './utils';
// import Draggable from 'react-draggable';
// import SubComponentSelect from './SubComponentSelect';
// import Modal from './Modal';
// import HoverModal from './HoverModal'; // Import HoverModal component
// import './App.css';

// const address = "http://192.168.222.82:5000";

// const App = () => {
//   const [droppedItems, setDroppedItems] = useState([]);
//   const [itemProperties, setItemProperties] = useState({});
//   const [contextMenu, setContextMenu] = useState({ isVisible: false, position: { x: 0, y: 0 }, itemId: null });
//   const [editingItem, setEditingItem] = useState(null);
//   const [properties, setProperties] = useState({ name: '', pin: '', vcc: '', gnd: '' });
//   const [showDummyParagraph, setShowDummyParagraph] = useState(false);
//   const dropZoneRef = useRef(null);
//   const [sketchContent, setSketchContent] = useState('');
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [hoveredItem, setHoveredItem] = useState(null); // State to track hovered item
//   const [hoverModalOpen, setHoverModalOpen] = useState(false); // State to control HoverModal

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (contextMenu.isVisible && !event.target.closest('.context-menu')) {
//         setContextMenu({ isVisible: false, position: { x: 0, y: 0 }, itemId: null });
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [contextMenu]);

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

//   const fetchSketchContent = async () => {
//     try {
//       const response = await fetch(address + '/sketch/sketch-content');
//       const content = await response.text();
//       setSketchContent(content);
//       setIsModalOpen(true);
//     } catch (error) {
//       console.error('Error fetching sketch content:', error);
//     }
//   };

//   const compileSketch = async () => {
//     try {
//       const response = await fetch(address + '/sketch/compile');
//       const message = await response.text();
//       console.log(message);
//       alert("Successfully compiled");
//     } catch (error) {
//       console.error('Error compiling sketch:', error);
//     }
//   };

//   const handleGenerate = async () => {
//     const projectDetails = searchTerm;
//     const componentData = droppedItems.map(item => itemProperties[item]);

//     if (!projectDetails && componentData.length === 0) {
//       alert('Please provide project details and component data.');
//       return;
//     }

//     try {
//       const response = await fetch(address + '/sketch/generate', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ projectDetails, componentData })
//       });

//       if (!response.ok) {
//         throw new Error('Failed to generate sketch');
//       }

//       const resultMessage = await response.text();
//       alert(resultMessage);
//       alert('Click on the "Show Sketch" button to view the code');
//     } catch (error) {
//       console.error('Error generating sketch:', error);
//       alert('Error generating sketch.');
//     }
//   };

//   const handleContextMenu = (e, itemId) => {
//     e.preventDefault(); // Prevent default right-click menu
//     setContextMenu({ isVisible: true, position: { x: e.clientX, y: e.clientY }, itemId });
//   };

//   const handleDeleteItem = (itemId) => {
//     setDroppedItems(droppedItems.filter((item) => item !== itemId));
//     setItemProperties((prevProperties) => {
//       const updatedProperties = { ...prevProperties };
//       delete updatedProperties[itemId];
//       return updatedProperties;
//     });
//     setContextMenu({ isVisible: false, position: { x: 0, y: 0 }, itemId: null }); // Hide context menu
//   };

//   const handleMouseEnter = (itemId, event) => {
//     const hoveredItemRect = event.target.getBoundingClientRect();
//     setHoveredItem(itemId);
//     setHoverModalOpen(true);
//     // Calculate position relative to viewport
//     const modalPosition = {
//       top: hoveredItemRect.top + window.scrollY,
//       left: hoveredItemRect.right + window.scrollX + 10, // Adjust 10 pixels for spacing
//     };
//     setHoverModalPosition(modalPosition);
//   };

//   const handleMouseLeave = () => {
//     setHoveredItem(null);
//     setHoverModalOpen(false);
//   };

//   const [hoverModalPosition, setHoverModalPosition] = useState({ top: 0, left: 0 });

//   return (
//     <div className="app-container">
//       <div className="sidebar">
//         <h1 className="hhhh">Draw your Sketch!!</h1>
//         {hardwareCategories.map((category, index) => (
//           <div key={index}>
//             <SubComponentSelect
//               categoryName={category.category}
//               components={category.components}
//               onSelect={(componentId) => {
//                 const selectedComponent = category.components.find((component) => component.id === parseInt(componentId, 10));
//                 if (selectedComponent) {
//                   handleDrop(selectedComponent, { x: 100, y: 100 }); // Example position, adjust as needed
//                 }
//               }}
//             />
//           </div>
//         ))}
//       </div>
//       <div className="drop-zone-container" ref={dropZoneRef}>
//         <DropZone onDrop={handleDrop}>
//           {droppedItems.map((item) => (
//             <Draggable key={item} defaultPosition={itemProperties[item]?.defaultPosition || { x: 0, y: 0 }} bounds="parent">
//               <div
//                 className="dropped-item"
//                 onContextMenu={(e) => handleContextMenu(e, item)}
//               >
//                 {itemProperties[item]?.img ? (
//                   <img
//                     src={itemProperties[item].img.src}
//                     style={{ height: itemProperties[item].img.height }}
//                     alt={itemProperties[item].name}
//                   />
//                 ) : (
//                   <span className="name-without-image">{itemProperties[item]?.name}</span>
//                 )}
//               </div>
//             </Draggable>
//           ))}
//         </DropZone>
//         <div className="bottom-bar">
//           <div className="search-bar">
//             <input
//               type="text"
//               className="search-input"
//               placeholder="Enter search term..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//             <button className="generate-button" onClick={handleGenerate}>Generate</button>
//           </div>
//         </div>
//       </div>
//       <div className="right-column">
//         <div className="button-row">
//           <button className="show-sketch-button" onClick={fetchSketchContent}>Show Sketch</button>
//           <button className="compile-button" onClick={compileSketch}>Compile</button>
//         </div>
//         <div className="separator"></div>
//         <h2>All components used</h2>
//         <ul>
//           {droppedItems.map((item) => (
//             <li
//               key={item}
//               onMouseEnter={(e) => handleMouseEnter(item, e)}
//               onMouseLeave={handleMouseLeave}
//             >
//               {itemProperties[item]?.name}
//             </li>
//           ))}
//         </ul>
//       </div>
//       {contextMenu.isVisible && (
//         <ul className="context-menu" style={{ top: contextMenu.position.y, left: contextMenu.position.x }}>
//           <li onClick={() => setEditingItem(contextMenu.itemId)}>Edit</li>
//           <li onClick={() => handleDeleteItem(contextMenu.itemId)}>Delete</li>
//         </ul>
//       )}
//       {editingItem && (
//         <EditPopup
//           item={editingItem}
//           properties={properties}
//           setProperties={setProperties}
//           onClose={() => setEditingItem(null)}
//           onSave={() => {
//             setItemProperties((prevProperties) => ({ ...prevProperties, [editingItem]: properties }));
//             setEditingItem(null);
//           }}
//         />
//       )}
//       <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
//         <div className="code-display">
//           <pre>{sketchContent}</pre>
//         </div>
//       </Modal>
//       {hoveredItem && (
//         <HoverModal
//           isOpen={hoverModalOpen}
//           onClose={() => setHoverModalOpen(false)}
//           itemName={itemProperties[hoveredItem]?.name}
//           itemDetails={itemProperties[hoveredItem]?.details} // Adjust as per your item details structure
//           position={hoverModalPosition} // Dynamic position based on hovered item
//         />
//       )}
//     </div>
//   );
// };

// export default App;





// App.js

import React, { useState, useRef, useEffect } from 'react';
import DropZone from './DropZone';
import EditPopup from './EditPopup';
import hardwareCategories from './hardwareCategories';
import { generateUniqueId } from './utils';
import Draggable from 'react-draggable';
import SubComponentSelect from './SubComponentSelect';
import Modal from './Modal';
import HoverModal from './HoverModal'; // Import HoverModal component
import './App.css';

const address = "http://localhost:5000";

const App = () => {
  const [droppedItems, setDroppedItems] = useState([]);
  const [itemProperties, setItemProperties] = useState({});
  const [contextMenu, setContextMenu] = useState({ isVisible: false, position: { x: 0, y: 0 }, itemId: null });
  const [editingItem, setEditingItem] = useState(null);
  const [properties, setProperties] = useState({ name: '', pin: '', vcc: '', gnd: '' });
// eslint-disable-next-line
  const [showDummyParagraph, setShowDummyParagraph] = useState(false);
  const dropZoneRef = useRef(null);
  const [sketchContent, setSketchContent] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [hoveredItem, setHoveredItem] = useState(null); // State to track hovered item
  const [hoverModalOpen, setHoverModalOpen] = useState(false); // State to control HoverModal

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (contextMenu.isVisible && !event.target.closest('.context-menu')) {
        setContextMenu({ isVisible: false, position: { x: 0, y: 0 }, itemId: null });
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [contextMenu]);

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

  const fetchSketchContent = async () => {
    try {
      const response = await fetch(address + '/sketch/sketch-content');
      const content = await response.text();
      setSketchContent(content);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error fetching sketch content:', error);
    }
  };

  const compileSketch = async () => {
    try {
      const response = await fetch(address + '/sketch/compile');
      const message = await response.text();
      console.log(message);
      alert("Successfully compiled");
    } catch (error) {
      console.error('Error compiling sketch:', error);
    }
  };

  const handleGenerate = async () => {
    const projectDetails = searchTerm;
    const componentData = droppedItems.map(item => itemProperties[item]);

    if (!projectDetails && componentData.length === 0) {
      alert('Please provide project details and component data.');
      return;
    }

    try {
      const response = await fetch(address + '/sketch/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ projectDetails, componentData })
      });

      if (!response.ok) {
        throw new Error('Failed to generate sketch');
      }

      const resultMessage = await response.text();
      alert(resultMessage);
      alert('Click on the "Show Sketch" button to view the code');
    } catch (error) {
      console.error('Error generating sketch:', error);
      alert('Error generating sketch.');
    }
  };

  const handleContextMenu = (e, itemId) => {
    e.preventDefault(); // Prevent default right-click menu
    setContextMenu({ isVisible: true, position: { x: e.clientX, y: e.clientY }, itemId });
  };

  const handleDeleteItem = (itemId) => {
    setDroppedItems(droppedItems.filter((item) => item !== itemId));
    setItemProperties((prevProperties) => {
      const updatedProperties = { ...prevProperties };
      delete updatedProperties[itemId];
      return updatedProperties;
    });
    setContextMenu({ isVisible: false, position: { x: 0, y: 0 }, itemId: null }); // Hide context menu
  };

  const handleNewBoard = () => {
    setDroppedItems([]);
    setItemProperties({});
  };

  const handleMouseEnter = (itemId, event) => {
    const hoveredItemRect = event.target.getBoundingClientRect();
    setHoveredItem(itemId);
    setHoverModalOpen(true);
    // Calculate position relative to viewport
    const modalPosition = {
      top: hoveredItemRect.top + window.scrollY,
      left: hoveredItemRect.right + window.scrollX + 10, // Adjust 10 pixels for spacing
    };
    setHoverModalPosition(modalPosition);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
    setHoverModalOpen(false);
  };

  const [hoverModalPosition, setHoverModalPosition] = useState({ top: 0, left: 0 });

  return (
    <div className="app-container">
      <div className="sidebar">
        <h1 className="hhhh">Draw your Sketch!!</h1>
        {hardwareCategories.map((category, index) => (
          <div key={index}>
            <SubComponentSelect
              categoryName={category.category}
              components={category.components}
              onSelect={(componentId) => {
                const selectedComponent = category.components.find((component) => component.id === parseInt(componentId, 10));
                if (selectedComponent) {
                  handleDrop(selectedComponent, { x: 100, y: 100 }); // Example position, adjust as needed
                }
              }}
            />
          </div>
        ))}
      </div>
      <div className="drop-zone-container" ref={dropZoneRef}>
      <button className="new-board-button" onClick={handleNewBoard}>Refresh Board</button>
        <DropZone onDrop={handleDrop}>
        
          {droppedItems.map((item) => (
            <Draggable key={item} defaultPosition={itemProperties[item]?.defaultPosition || { x: 0, y: 0 }} bounds="parent">
              <div
                className="dropped-item"
                onContextMenu={(e) => handleContextMenu(e, item)}
              >
                {itemProperties[item]?.img ? (
                  <img
                    src={itemProperties[item].img.src}
                    style={{ height: itemProperties[item].img.height }}
                    alt={itemProperties[item].name}
                  />
                ) : (
                  <span className="name-without-image">{itemProperties[item]?.name}</span>
                )}
              </div>
            </Draggable>
          ))}
        </DropZone>
        <div className="bottom-bar">
          <div className="search-bar">
            <input
              type="text"
              className="search-input"
              placeholder="Enter search term..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="generate-button" onClick={handleGenerate}>Generate</button>
          </div>
        </div>
      </div>
      <div className="right-column">
        <div className="button-row">
          <button className="show-sketch-button" onClick={fetchSketchContent}>Show Sketch</button>
          <button className="compile-button" onClick={compileSketch}>Compile</button>
        </div>
        <div className="separator"></div>
        <h2>All components used</h2>
        <ul>
          {droppedItems.map((item) => (
            <li
              key={item}
              onMouseEnter={(e) => handleMouseEnter(item, e)}
              onMouseLeave={handleMouseLeave}
            >
              {itemProperties[item]?.name}
            </li>
          ))}
        </ul>
      </div>
      {contextMenu.isVisible && (
        <ul className="context-menu" style={{ top: contextMenu.position.y, left: contextMenu.position.x }}>
          <li onClick={() => setEditingItem(contextMenu.itemId)}>Edit</li>
          <li onClick={() => handleDeleteItem(contextMenu.itemId)}>Delete</li>
        </ul>
      )}
      {editingItem && (
        <EditPopup
          item={editingItem}
          properties={properties}
          setProperties={setProperties}
          onClose={() => setEditingItem(null)}
          onSave={() => {
            setItemProperties((prevProperties) => ({ ...prevProperties, [editingItem]: properties }));
            setEditingItem(null);
          }}
        />
      )}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="code-display">
          <pre>{sketchContent}</pre>
        </div>
      </Modal>
      {hoveredItem && (
        <HoverModal
          isOpen={hoverModalOpen}
          onClose={() => setHoverModalOpen(false)}
          itemName={itemProperties[hoveredItem]?.name}
          itemDetails={itemProperties[hoveredItem]?.details} // Adjust as per your item details structure
          position={hoverModalPosition} // Dynamic position based on hovered item
        />
      )}
    </div>
  );
};

export default App;
