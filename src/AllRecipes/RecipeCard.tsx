import React, { useContext } from "react";
import noImage from "../Shared//Images/noImage.png";
import noImageDark from "../Shared//Images/noImageDark.png";
import { Box, Paper, Typography, makeStyles } from "@material-ui/core/";
import { IRecipe } from "../Shared/Types";
import { HoverTitle } from "./HoverTitle";
import { Link } from "react-router-dom";
import { DarkThemeContext } from "../App";

const useStyles = makeStyles((theme) => ({
  link: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    [theme.breakpoints.down("sm")]: {
      margin: "8px",
      width: "155px",
    },
    [theme.breakpoints.up("md")]: {
      margin: "20px",
      width: "300px",
      minHeight: "370px",
    },
  },
  title: {
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
    [theme.breakpoints.down("sm")]: {
      fontWeight: 600,
      fontSize: ".8rem",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "1.3rem",
      fontWeight: 500,
    },
  },
  detail: {
    [theme.breakpoints.down("sm")]: {
      fontWeight: 300,
      fontSize: ".7rem",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "0.85rem",
      textTransform: "uppercase",
      color: "#999",
    },
  },
  image: {
    objectFit: "cover",
    borderTopLeftRadius: "4px",
    borderTopRightRadius: "4px",
    [theme.breakpoints.down("sm")]: {
      height: "155px",
      width: "155px",
    },
    [theme.breakpoints.up("md")]: {
      height: "300px",
      width: "300px",
    },
  },
  textBox: {
    display: "flex",
    flexDirection: "column",
    marginTop: "auto",
    [theme.breakpoints.down("sm")]: {
      padding: "8px",
    },
    [theme.breakpoints.up("md")]: {
      padding: "10px",
    },
  },
}));

interface Props {
  recipe: IRecipe;
}

export const RecipeCard = ({ recipe }: Props) => {
  const classes = useStyles();
  const { darkThemeEnabled } = useContext(DarkThemeContext);

  const defaultImage = darkThemeEnabled ? noImageDark : noImage;

  const onError = (ev: any) => {
    const eventTarget = ev.target;
    eventTarget.src = defaultImage;
  };

  const imageToUse = () => {
    if (!recipe.picture) return defaultImage;
    const [baseUrl, imageId] = recipe.picture.split("upload");
    return `${baseUrl}upload/ar_1:1,c_fill,g_auto,q_auto,f_auto${imageId}`;
  };

  return (
    <Paper className={classes.link}>
      <Link
        to={{
          pathname: `/r/${recipe.id}`,
          state: { picture: recipe.picture, title: recipe.title },
        }}
      >
        <img
          onError={onError}
          src={imageToUse()}
          alt={"a tasty dish!"}
          className={classes.image}
        />
      </Link>
      <Box className={classes.textBox}>
        <HoverTitle classes={classes.title} title={recipe.title} />
        <Typography noWrap className={classes.detail}>
          {recipe.source || "unknown"}
        </Typography>
      </Box>
    </Paper>
  );
};
