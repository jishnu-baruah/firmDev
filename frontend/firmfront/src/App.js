import React, { useState, useRef } from 'react';
import DropZone from './DropZone';
import EditPopup from './EditPopup';

import hardwareCategories from './hardwareCategories';
import { generateUniqueId } from './utils';
import Draggable from 'react-draggable';
import SubComponentSelect from './SubComponentSelect';
import Modal from './Modal';
import './App.css';

const address = "http://192.168.222.82:5000";

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

  const handleGenerate = () => {
    // alert(`Generating sketch for: ${searchTerm}`);
    alert(`Click on the "Show Sketch" button to view the code`);
    // Add your logic to handle the search term and generate the sketch
  };

  return (
    <div className="app-container" onClick={() => setContextMenu({ isVisible: false, itemId: null })}>
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
        <DropZone onDrop={handleDrop}>
          {droppedItems.map((item) => (
            <Draggable key={item} defaultPosition={itemProperties[item]?.defaultPosition || { x: 0, y: 0 }}>
              <div className="dropped-item" onContextMenu={(e) => setContextMenu({ isVisible: true, position: { x: e.clientX, y: e.clientY }, itemId: item })}>
                {itemProperties[item]?.img && (
                  <img
                    src={itemProperties[item].img.src}
                    style={{ height: itemProperties[item].img.height }}
                    alt={itemProperties[item].name}
                  />
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
            <li key={item}>{itemProperties[item]?.name}</li>
          ))}
        </ul>
      </div>
      {contextMenu.isVisible && (
        <ul className="context-menu" style={{ top: contextMenu.position.y, left: contextMenu.position.x }}>
          <li onClick={() => setEditingItem(contextMenu.itemId)}>Edit</li>
          <li onClick={() => setDroppedItems(droppedItems.filter((item) => item !== contextMenu.itemId))}>Delete</li>
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
    </div>
  );
};

export default App;
