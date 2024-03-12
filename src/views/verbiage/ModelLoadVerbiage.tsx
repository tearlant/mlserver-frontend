import React from "react";
import { Button } from "@mui/material";
import FileUploadComponent from "views/widgets/FileUploadComponent";

export const loadingStepsGenerator = (callback: () => void) => [
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
        "To show how it works, clicking upload (and uploading any arbitrary file) will mock uploading a model pre-trained on this dataset of flower images. You can still use it to make predictions."
      ],
      extraComponents: [
        <FileUploadComponent callback={callback} />
      ]
    },
  ];
  