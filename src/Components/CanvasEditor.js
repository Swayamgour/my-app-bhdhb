import React, { useState, useRef } from "react";
import { Stage, Layer, Image, Text, Rect, Circle } from "react-konva";

const CanvasEditor = ({ selectedImage }) => {
  const [elements, setElements] = useState([]);
  const [selectedTextId, setSelectedTextId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const stageRef = useRef(null);

  const addText = () => {
    setElements([
      ...elements,
      {
        id: `text-${elements.length + 1}`,
        type: "text",
        x: 50,
        y: 50,
        text: "Your Text Here",
        fontSize: 20,
        draggable: true,
        fill: "white",
      },
    ]);
  };

  const addShape = (shapeType) => {
    let newShape;
    if (shapeType === "circle") {
      newShape = {
        id: `circle-${elements.length + 1}`,
        type: "circle",
        x: 100,
        y: 100,
        radius: 50,
        fill: "red",
        draggable: true,
      };
    } else if (shapeType === "rectangle") {
      newShape = {
        id: `rect-${elements.length + 1}`,
        type: "rect",
        x: 100,
        y: 100,
        width: 100,
        height: 50,
        fill: "blue",
        draggable: true,
      };
    }
    setElements([...elements, newShape]);
  };

  const handleTextClick = (id, text) => {
    setSelectedTextId(id);
    setEditingText(text);
  };

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setEditingText(newText);

    // Update the specific text element in the elements array
    setElements((prevElements) =>
      prevElements.map((el) =>
        el.id === selectedTextId ? { ...el, text: newText } : el
      )
    );
  };

  const downloadImage = () => {
    const stage = stageRef.current;
    if (!stage) return;

    // Use Konva's toDataURL method to capture the canvas content
    const dataURL = stage.toDataURL({
      mimeType: "image/png", // Specify the MIME type
      quality: 1, // Set quality for formats like JPEG (ignored for PNG)
    });

    // Create a temporary anchor element to trigger the download
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "modified-image.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  return (
    <div className="canvas-editor">
      <div className="toolbar">
        <button onClick={addText}>Add Text</button>
        <button onClick={() => addShape("circle")}>Add Circle</button>
        <button onClick={() => addShape("rectangle")}>Add Rectangle</button>
        <button onClick={downloadImage}>Download</button>
      </div>
      {selectedTextId && (
        <div className="search-bar">
          {/* <div className="search-bar"> */}
          <input
            type="text"
            value={editingText}
            onChange={handleTextChange}
            placeholder="Edit text"
          />
        </div>
      )}
      <Stage
        width={800}
        height={600}
        style={{ border: "1px solid #ccc", margin: "auto" }}
        ref={stageRef}
      >
        <Layer>
          {selectedImage && (
            <Image
              image={(() => {
                const img = new window.Image();
                img.src = selectedImage;
                return img;
              })()}
              width={800}
              height={600}
            />
          )}
          {elements?.map((element) => {
            if (element.type === "text") {
              return (
                <Text
                  key={element.id}
                  x={element.x}
                  y={element.y}
                  text={element.text}
                  fontSize={element.fontSize}
                  fill={element.fill}
                  draggable={element.draggable}
                  onClick={() => handleTextClick(element.id, element.text)}
                />
              );
            } else if (element.type === "circle") {
              return (
                <Circle
                  key={element.id}
                  x={element.x}
                  y={element.y}
                  radius={element.radius}
                  fill={element.fill}
                  draggable={element.draggable}
                />
              );
            } else if (element.type === "rect") {
              return (
                <Rect
                  key={element.id}
                  x={element.x}
                  y={element.y}
                  width={element.width}
                  height={element.height}
                  fill={element.fill}
                  draggable={element.draggable}
                />
              );
            }
            return null;
          })}
        </Layer>
      </Stage>

    </div>
  );
};

export default CanvasEditor;
