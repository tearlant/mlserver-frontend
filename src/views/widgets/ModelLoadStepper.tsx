import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";
import { loadingStepsGenerator } from "views/verbiage/ModelLoadVerbiage";

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

  const steps = loadingStepsGenerator(onAllConditionsComplete);

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
                <Button onClick={(index === 0) ? () => navigate('/admin/animals') : handleBack} sx={{ mt: 1, mr: 1 }}>
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