import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ModelLoadStepper from "./widgets/ModelLoadStepper";

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
  width: "75%", // Default width
  height: "75%", // Default height
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

const steps = [
  {
    label: 'Custom model',
    description: [
      `MLServer provides an endpoint that enables users to upload any TensorFlow model, which may be packaged (and possibly trained) using ML.NET. As long as its inputs and outputs match the schema, predictions flow automatically through the browser via a single API call. For security reasons, this hosted demo does not expose the endpoint for uploads. However, you can access the source code on my GitHub repository, where the app is configured with the endpoint exposed.`,
      `If you are hosting your own copy of MLServer, follow these instructions to train a model, upload it, and use it to make predictions.`,
    ]
  },
  {
    label: 'Creating a model',
    description: [
      'Any TensorFlow model can be packaged with ML.NET to be used with MLServer, provided the backend is configured to accommodate its schema. An executable is available that automatically trains an Image Classification model using Tensorflow Inception.',
      'To create your model, simply run the executable within any directory containing the training images. Ensure that the images are organized using a directory structure where each folder corresponds to a class name. Click the button below to download the executable.'
    ]
  },
  {
    label: 'Uploading the model',
    description: [
      "Upload the model to the server, and start making predictions. (Note, if you are using the demonstration on my website, the API endpoint is disabled for cybersecurity reasons).",
      "To show how it works, clicking upload will mock uploading a model pre-trained on this dataset of animal images. You can still use it to make predictions."
    ]
  },
];


function ModelLoadComponent({ onClose, isMobile, frameBackground, contentBackground }: { onClose: () => void, isMobile: boolean, frameBackground: string, contentBackground: string }) {
  const [activeStep, setActiveStep] = useState(0);
  //const { isMobile } = useMobileMode();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const safeExternalFrameStyle: React.CSSProperties = { ...externalFrameStyle };
  if (isMobile) {
    safeExternalFrameStyle.width = "100vw";
    safeExternalFrameStyle.height = "100vw";
  }

  const safeContainerStyle: React.CSSProperties = isMobile ? {...contentContainerStyleMobile} : {...contentContainerStyleDesktop};
  safeContainerStyle.backgroundColor = contentBackground;

  return (
    <div style={{...safeExternalFrameStyle, backgroundColor: frameBackground}}>
      <div style={{...internalFrameStyle, backgroundColor: contentBackground}}>

        <Box style = {{...safeContainerStyle, backgroundColor: contentBackground}}>
          <ModelLoadStepper onClose={onClose} />
        </Box>
      </div>
    </div>
  );
}

export default ModelLoadComponent;