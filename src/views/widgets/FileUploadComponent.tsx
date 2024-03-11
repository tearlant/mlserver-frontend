import React, { useState, ChangeEvent } from 'react';
import axios, { AxiosError } from 'axios';
import { Button, ButtonBase, Typography, useTheme } from '@mui/material';

const FileUploadComponent = ({callback}: {callback: () => void }) => {

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string>('');
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);

  const theme = useTheme();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setMessage(`Selected file: ${file.name}`);
      setButtonDisabled(false);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('Title', '');
    formData.append('TrainedModel', selectedFile);
    formData.append('SaveToLocalCacheAndUse', 'true');

    try {
      await axios.post('https://localhost:44346/api/Prediction/ingestanduse', formData);
      setMessage('File uploaded successfully');
      // Additional logic if needed after successful upload
    } catch (error) {
      console.error('Error occurred while uploading file:', error);
      if (axios.isAxiosError(error)) {
        // In the demo, the above call will always return a 403 error, so it's expected to fall through to this point.
        try {
          await axios.get('https://localhost:44346/api/FixedModels/animals');
          setMessage('In demo mode, the upload is mocked. The animals model is loaded.');
          callback();
        } catch (err) {
          console.error('Error occurred while performing backup operation:', err);
          setMessage('Server error occurred. Please try again.');
        }
      }
    }
  };

  return (
    <div>
      <input type="file" style={{ display: 'none' }} onChange={handleFileChange} id="file-input" />
      <Button variant="contained" sx={{ mt: 1, mr: 1 }} onClick={() => document.getElementById('file-input')?.click()} >
        Select File
      </Button>
      <Button variant="contained" color="secondary" onClick={handleUpload}
        sx={{ mt: 1, mr: 1, backgroundColor: theme.palette.primary.light }} disabled={buttonDisabled}>
        Upload
      </Button>
      <Typography>{message}</Typography>
    </div>
  );

};

export default FileUploadComponent;
