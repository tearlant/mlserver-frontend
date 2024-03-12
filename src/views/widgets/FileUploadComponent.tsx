import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';
import { Button, Typography, useTheme } from '@mui/material';
import urlJoin from 'url-join';

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

    const apiRoot = process.env.REACT_APP_API_ROOT || 'localhost:44346';

    try {
      await axios.post(urlJoin(apiRoot, 'api', 'Prediction', 'ingestanduse'), formData);
      setMessage('File uploaded successfully');
      // Additional logic if needed after successful upload
    } catch (error) {
      console.error('Error occurred while uploading file:', error);
      if (axios.isAxiosError(error)) {
        // In the demo, the above call will always return a 403 error, so it's expected to fall through to this point.
        try {
          await axios.get(urlJoin(apiRoot, 'api', 'FixedModels', 'flowers'));
          setMessage('In demo mode, the upload is mocked. The flowers model is loaded.');
          callback();
        } catch (err) {
          console.error('Error occurred while performing backup operation:', err);
          setMessage('Server error occurred. Please try again.');
        }
      }
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <input type="file" style={{ display: 'none' }} onChange={handleFileChange} id="file-input" />
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
        <Button variant="contained" sx={{ marginRight: '10px' }} onClick={() => document.getElementById('file-input')?.click()} >
          Select File
        </Button>
        <Button variant="contained" color="secondary" onClick={handleUpload} sx={{ backgroundColor: theme.palette.primary.light }} disabled={buttonDisabled}>
          Upload
        </Button>
      </div>
      <div style={{ width: '100%', textAlign: 'center' }}>
        <Typography>{message}</Typography>
      </div>
    </div>
  );

};

export default FileUploadComponent;
