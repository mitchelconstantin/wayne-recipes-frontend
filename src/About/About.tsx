import React from "react";
import { Typography, Box, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
  },
}));

export const About = () => {
  const classes = useStyles();
  return (
    <Box className={classes.container}>
      <Typography>
        Wayne's Recipes is a recipe app for hosting Constantin Family recipes on
        the web. All of the recipes you see have been collected by my father,
        Wayne over the last 30 years.
      </Typography>
      <Typography>
        <a href={"https://github.com/mitchelconstantin/wayne-recipes-frontend"}>
          frontend code
        </a>
      </Typography>
      <Typography>
        <a href={"https://github.com/mitchelconstantin/wayne-recipes-backend"}>
          backend code
        </a>
      </Typography>
    </Box>
  );
};
