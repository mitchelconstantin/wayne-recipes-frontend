/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import noImage from "../Shared/Images/noImage.png";
import { RecipeAPI } from "../Shared/APIs/RecipeAPI";
import { Box, Typography } from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import { useParams } from "react-router-dom";

interface Props {
  picture?: string;
  setPicture: Function;
}

export const ImageUploader = ({ picture, setPicture }: Props) => {
  const { recipeId } = useParams();

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const imageBlob = (await readFileAsync(acceptedFiles)) as string;
    const img = await RecipeAPI.uploadImage(imageBlob, recipeId);
    setPicture(img);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const readFileAsync = (file: any) => {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file[0]);
    });
  };

  const onError = (ev: any) => {
    ev.target.src = noImage;
  };

  return (
    <Box {...getRootProps()} sx={{ width: "100%", cursor: "pointer", mb: 2 }}>
      <input {...getInputProps()} />
      {picture ? (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
          <img
            onError={onError}
            src={picture}
            alt="recipe"
            style={{
              width: "220px",
              height: "220px",
              objectFit: "cover",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            }}
          />
          <Typography variant="caption" color="text.secondary">
            Click or drag to replace
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{
            border: "2px dashed",
            borderColor: isDragActive ? "primary.main" : "divider",
            borderRadius: 2,
            p: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1,
            backgroundColor: isDragActive ? "action.hover" : "transparent",
            transition: "border-color 0.2s ease, background-color 0.2s ease",
          }}
        >
          <CloudUpload sx={{ fontSize: 40, color: "text.disabled" }} />
          <Typography variant="body2" color="text.secondary">
            {isDragActive ? "Drop it here…" : "Drag & drop an image, or click to select"}
          </Typography>
        </Box>
      )}
    </Box>
  );
};
