import axios from "axios";
import React, { useContext, useRef } from "react";
import { Card } from "react-bootstrap";
import { DashboardContext } from "views/Dashboard";

interface Props {
  imgSrc: string;
  id: number;
  predictedLabel: string | null;
  primaryColor: string;
  secondaryColor: string;
}

const placeholderUrl = process.env.PUBLIC_URL + "/img/placeholder.png";

function ImageCard({imgSrc, id, predictedLabel, primaryColor, secondaryColor}: Props) {

  const { updateImage } = useContext(DashboardContext);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0]; // Access files property safely
    if (file) {
      const formData = new FormData();
      formData.append('FormData.Image', file);
      // Handle the file upload here, e.g., upload it to a server or process it
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        //fetch('/api/predict')
        axios.post('https://localhost:44346/api/Prediction/predict', formData, {
          headers: {
            'Content-Type': 'multipart/form-data' // Set the Content-Type header to 'multipart/form-data'
          }
        })
        .then(response => {
          console.log('Response from server: ', response.data);
          updateImage((typeof reader.result === 'string') ? reader.result as string : placeholderUrl, response.data, id);
          // If there needs to be an onUpload callback to pass as a prop, call here.
          console.log('Uploaded file:', file);
        });
      }
    }
  };

  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center', // Center horizontally
      alignItems: 'center', // Center vertically
      height: '100%', // Adjust this according to your layout
      backgroundColor: primaryColor,
    },
    imageContainer: {
      textAlign: 'center' as 'center',
      height: '256px',
      width: '256px', // Set width instead of minWidth
      maxWidth: '100%', // Ensure the container doesn't exceed its parent
      overflow: 'hidden', // Hide overflow if image exceeds container size
      display: 'flex', // Use flexbox to center content
      justifyContent: 'center', // Center horizontally
      alignItems: 'center', // Center vertically
      backgroundColor: secondaryColor,
    },
    imageStyle: {
      width: '95%', // Ensure the image fills the container width
      height: 'auto', // Let the browser calculate the height to maintain aspect ratio
      cursor: 'pointer',
    }
  }

  return (
    <Card className="card-stats">

      <Card.Header>
        <Card.Title as="h4">Image {id}</Card.Title>
        <p className="card-category">Click to upload and classify new JPEG or PNG file.</p>
      </Card.Header>

      <Card.Body style={{ height: '100%', width: '100%' }}>
        <div>
          <input type="file" accept="image/jpeg, image/png" style={{ display: 'none' }} ref={fileInputRef} onChange={handleFileChange}/>
        </div>
        <div style={styles.container}>
          <div style={styles.imageContainer}>
            <img alt={`Image ${id}`} src={imgSrc} style={styles.imageStyle} onClick={() => fileInputRef.current?.click()}></img>
          </div>
        </div>
      </Card.Body>

      <Card.Footer>
        <hr />
        <div className="stats">
          {predictedLabel ? `Predicted Label: ${predictedLabel}` : ''}
        </div>
      </Card.Footer>

    </Card>
  )
}

export default ImageCard;