import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import { banckend_URL } from './config';

function UploadImage(props) {
  const { id } = props
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

 

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await fetch(`${banckend_URL}/upload/${id}`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
    
        console.log('Image uploaded successfully');
      } else {
        
        console.log('Error uploading image');
      }
    } catch (error) {
     
      console.log('Network or other error occurred');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} />
      <button type="submit">Upload</button>
    </form>
  );
}

export default UploadImage;
