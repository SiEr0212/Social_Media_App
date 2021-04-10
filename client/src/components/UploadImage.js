import React, { useState } from "react";
import { Button, Input } from "semantic-ui-react";

export default function UploadImage() {
  const [fileInputState, setFileinputState] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [previewSource, setPreviewSource] = useState();

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
      
    };
  };

  const handleSubmitFile = (e) => {
    console.log("submitting");
    e.preventDefault();
    if (!previewSource) return;
    uploadImage(previewSource);
  };

  const uploadImage = async (base64encodedImage) => {
    console.log(base64encodedImage);
    try {
      await fetch('/api/upload', {
          method: 'POST',
          body: JSON.stringify({data: base64encodedImage}),
          headers: {'Content-type': 'application/json'}
      })
    } catch (error) {
        console.log(error)
        
    }
  };
  return (
    <div>
      <h1>Upload</h1>
      <form onSubmit={handleSubmitFile} className="form">
        <Input
          type="file"
          name="image"
          onChange={handleFileInputChange}
          value={fileInputState}
          className="form-input"
        />
        <br />
        <Button class="ui button" type="submit" color="teal">
          Submit
        </Button>
      </form>
      {previewSource && (
        <img src={previewSource} alt="chosen" style={{ height: "300px" }} />
      )}
    </div>
  );
}
