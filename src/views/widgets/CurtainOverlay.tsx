import React, { useEffect, useRef } from 'react';
import { hexToRGBA } from 'utilities/colorUtils';

interface Props {
  color: string;
  alpha: number,
  onClick: () => void;
}

const CurtainOverlay = ({color, alpha, onClick}: Props) => {
  const curtainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const resizeHandler = () => {
      if (curtainRef.current) {
        // Set the dimensions of the curtain to cover the entire document
        curtainRef.current.style.width = `${document.documentElement.scrollWidth}px`;
        curtainRef.current.style.height = `${document.documentElement.scrollHeight}px`;
      }
    };

    // Initial resize
    resizeHandler();

    // Add event listener to handle window resize
    window.addEventListener('resize', resizeHandler);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, []);

  const curtainStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    backgroundColor: hexToRGBA(color, alpha)
  };

  return (
    <div ref={curtainRef} style={curtainStyle} onClick={onClick}></div>
  );
};

export default CurtainOverlay;
