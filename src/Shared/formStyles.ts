import { SxProps, Theme } from "@mui/material";

export const formContainerSx: SxProps<Theme> = {
  px: { xs: 2, md: 6 },
  py: 4,
  maxWidth: "860px",
  mx: "auto",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

export const formTextFieldSx: SxProps<Theme> = {
  width: "100%",
  mb: 1,
};
