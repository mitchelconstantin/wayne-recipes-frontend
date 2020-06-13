/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import noImage from "../Shared/Images/noImage.png";
import { RecipeAPI } from "../Shared/APIs/RecipeAPI";
import { Box } from "@material-ui/core";
import { useParams } from "react-router-dom";
interface Props {
  picture?: string;
  setPicture: Function;
}
export const ImageUploader = ({ picture, setPicture }: Props) => {
  const { recipeId } = useParams();
  const onDrop = useCallback(async (acceptedFiles) => {
    const imageBlob = (await readFileAsync(acceptedFiles)) as string;
    const img = await RecipeAPI.uploadImage(imageBlob, recipeId);
    setPicture(img);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const readFileAsync = (file: any) => {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file[0]);
    });
  };

  const onError = (ev: any) => {
    const eventTarget = ev.target;
    eventTarget.src = noImage;
  };

  return (
    <div {...getRootProps()}>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <img
          onError={onError}
          src={picture || noImage}
          alt={"a tasty dish"}
          style={{ height: "200px", width: "200px", border: "1px" }}
        />
      </Box>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
    </div>
  );
};
