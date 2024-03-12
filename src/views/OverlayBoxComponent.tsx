import React, {  } from "react";
import Box from '@mui/material/Box';

const externalFrameStyle: React.CSSProperties = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: "100vw", // Ensure overlayWindowComponent fills the screen on narrow screens
  maxHeight: "100vh", // Ensure overlayWindowComponent fills the screen on narrow screens
  padding: "20px",
  borderRadius: "4px",
  display: "flex", // Use Flexbox
  justifyContent: "center", // Center horizontally
  alignItems: "center", // Center vertically
  width: "80%", // Default width
  height: "80%", // Default height
}

const internalFrameStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "90%",
  width: "90%",
  padding: "20px",
  borderRadius: "4px",
}

//style={{overflowY: 'auto', maxHeight: '300px', marginTop: '5px' }}

const contentContainerStyleDesktop: React.CSSProperties = {
  position: "absolute",
  width: "75%",
  height: "75%",
}

const contentContainerStyleMobile: React.CSSProperties = {
  position: "absolute",
  width: "100vw",
  height: "100vh",
  padding: "20px"
}

interface OverlayBoxComponentProps {
  children: React.ReactNode;
  isMobile: boolean;
  frameBackground: string;
  contentBackground: string;
}

function OverlayBoxComponent({ isMobile, frameBackground, contentBackground, children }: OverlayBoxComponentProps) {
  const safeExternalFrameStyle: React.CSSProperties = { ...externalFrameStyle };
  if (isMobile) {
    safeExternalFrameStyle.width = "100vw";
    safeExternalFrameStyle.height = "100vw";
  }

  const safeInternalFrameStyle: React.CSSProperties = { ...internalFrameStyle };
  if (isMobile) {
    safeInternalFrameStyle.width = "100vw";
    safeInternalFrameStyle.height = "100vw";
  }

  const safeContainerStyle: React.CSSProperties = isMobile ? {...contentContainerStyleMobile} : {...contentContainerStyleDesktop};
  safeContainerStyle.backgroundColor = contentBackground;

  return (
    <div style={{...safeExternalFrameStyle, backgroundColor: frameBackground}}>
      <div style={{...safeInternalFrameStyle, backgroundColor: contentBackground}}>

        <Box style = {{...safeContainerStyle, backgroundColor: contentBackground, overflowY: 'auto'}}>
          {/*<ModelLoadStepper onClose={onClose} />*/}
          {children}
        </Box>
      </div>
    </div>
  );
}

export default OverlayBoxComponent;