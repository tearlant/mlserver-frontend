import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";
import FileUploadComponent from "./FileUploadComponent";

const stepsGenerator = (callback: () => void) => [
  {
    label: 'Custom model',
    description: [
      `MLServer provides an endpoint that enables users to upload any TensorFlow model, which may be packaged (and possibly trained) using ML.NET. As long as its inputs and outputs match the schema, predictions flow automatically through the browser via a single API call. For security reasons, this hosted demo does not expose the endpoint for uploads. However, you can access the source code on my GitHub repository, where the app is configured with the endpoint exposed.`,
      `If you are hosting your own copy of MLServer, follow these instructions to train a model, upload it, and use it to make predictions.`,
    ],
    extraComponents: []
  },
  {
    label: 'Creating a model',
    description: [
      'Any TensorFlow model can be packaged with ML.NET to be used with MLServer, provided the backend is configured to accommodate its schema. An executable is available that automatically trains an Image Classification model using Tensorflow Inception.',
      'To create your model, simply run the executable within any directory containing the training images. Ensure that the images are organized using a directory structure where each folder corresponds to a class name. Click the button below to download the executable.'
    ],
    extraComponents: [
      <Button variant="contained">Download Model Generator</Button>
    ]
  },
  {
    label: 'Uploading the model',
    description: [
      "Upload the model to the server, and start making predictions. (Note, if you are using the demonstration on my website, the API endpoint is disabled for cybersecurity reasons).",
      "To show how it works, clicking upload will mock uploading a model pre-trained on this dataset of animal images. You can still use it to make predictions."
    ],
    extraComponents: [
      <FileUploadComponent callback={callback} />
    ]
  },
];


function ModelLoadStepper({ onClose }: { onClose: () => void }) {
  const [activeStep, setActiveStep] = useState(0);
  const [canComplete, setCanComplete] = useState(false);
  const navigate = useNavigate();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const onAllConditionsComplete = () => {
    setCanComplete(true);
  };

  const steps = stepsGenerator(onAllConditionsComplete);

  return (
    <Stepper activeStep={activeStep} orientation="vertical">
      {steps.map((step, index, arr) => (
        <Step key={step.label}>
          <StepLabel>
            {step.label}
          </StepLabel>
          <StepContent>
            {step.description.map((line, index, arr) => (
              <React.Fragment key={`description${index}`}>
                <Typography>{line}</Typography>
                {index !== arr.length - 1 && <br />}
              </React.Fragment>
            ))}
            {step.extraComponents.map((component, index, arr) => (
              <React.Fragment key={`component${index}`}>
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px'}}>
                  {component}
                </div>
              </React.Fragment>
            ))}
            <Box sx={{ mb: 2 }}>
              <div>
                <Button variant="contained" onClick={(index === arr.length - 1) ? onClose : handleNext} disabled={index === arr.length - 1 && !canComplete} sx={{ mt: 1, mr: 1 }}>
                  {index === arr.length - 1 ? 'Finish' : 'Continue'}
                </Button>
                <Button onClick={(index === 0) ? () => navigate('/admin/diamonds') : handleBack} sx={{ mt: 1, mr: 1 }}>
                  Back
                </Button>
              </div>
            </Box>
          </StepContent>
        </Step>
      ))}
    </Stepper>
  );
}

export default ModelLoadStepper;