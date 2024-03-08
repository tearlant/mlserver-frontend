import React, { useState } from "react";
import { Carousel } from "react-bootstrap";

const overlayWindowComponent: React.CSSProperties = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "75%",
  height: "75%",
  maxWidth: "100vw", // Ensure overlayWindowComponent fills the screen on narrow screens
  maxHeight: "100vh", // Ensure overlayWindowComponent fills the screen on narrow screens
  backgroundColor: "#777777",
  padding: "20px",
  borderRadius: "4px",
}

const carouselContainer: React.CSSProperties = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "90%",
  width: "90%",
  backgroundColor: "#333333",
}

const customCarouselItem: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "90%",
  width: "90%"
}

const customContent: React.CSSProperties = {
  textAlign: "center",
  color: "white"
}

function ModelLoadComponent({ onClose }: { onClose: () => void }) {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex: number) => {
    setIndex(selectedIndex); // Update the state when a new slide is selected
  };
  
  return (
    <div style={overlayWindowComponent}>
      <div style={carouselContainer}>
        <Carousel activeIndex={index} onSelect={handleSelect}>
          <Carousel.Item style={{ ...customCarouselItem, backgroundColor: "blue" }}>
            <div style={customContent}>
              <h3>First Slide</h3>
              <p>This is the content of the first slide.</p>
            </div>
          </Carousel.Item>
          <Carousel.Item style={{ ...customCarouselItem, backgroundColor: "green" }}>
            <div style={customContent}>
              <h3>Second Slide</h3>
              <p>This is the content of the second slide.</p>
            </div>
          </Carousel.Item>
          {/* Add more Carousel.Item components as needed */}
        </Carousel>
      </div>
    </div>
  );
}

export default ModelLoadComponent;