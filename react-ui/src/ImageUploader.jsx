import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone'


export default (props) => {
  const [image, setImage] = useState(props.image);
  const onDrop = useCallback(async acceptedFiles => {
    const imageBlob = await readFileAsync(acceptedFiles);
    uploadImageToServer(imageBlob);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  const readFileAsync = (file) => {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result.split(',')[1]);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file[0])
    })
  }

  const uploadImageToServer = async (image) => {
    const newImage = await fetch(`/api/recipes/${props.recipeID}/`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ image: image })
    })
    const json = await newImage.json();
    setImage(json.image);
  }

  return (
      <div {...getRootProps()}>
      <p >
        <img src={image} alt={'a tasty dish'} style={{ height: '200px', width: '200px', border: '1px' }} />
      </p>
        <input {...getInputProps()} />
        {
          isDragActive ?
            <p>Drop the files here ...</p> :
            <p>Drag 'n' drop some files here, or click to select files</p>
        }
      </div>
  );
}