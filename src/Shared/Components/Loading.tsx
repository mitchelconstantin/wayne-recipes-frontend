import React from "react";
import { Paper, LinearProgress } from "@material-ui/core";

export const Loading = () => {
  return (
    <Paper style={{ width: "100vw", height: "100vh" }}>
      <LinearProgress />
    </Paper>
  );
};
