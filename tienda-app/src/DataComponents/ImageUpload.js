import React, { useState } from 'react';
import { useParams } from "react-router-dom";

function UploadImage() {
  const { id } = useParams();
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

 

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await fetch(`http://127.0.0.1:5000/upload/${id}`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        // Image uploaded successfully, handle success if needed
        console.log('Image uploaded successfully');
      } else {
        // Error occurred during upload, handle error if needed
        console.log('Error uploading image');
      }
    } catch (error) {
      // Network or other error occurred, handle error if needed
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
