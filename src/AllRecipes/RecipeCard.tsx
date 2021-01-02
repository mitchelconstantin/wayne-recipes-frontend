import React, { useContext, useState } from "react";
import noImage from "../Shared//Images/noImage.png";
import noImageDark from "../Shared//Images/noImageDark.png";
import {
  Card,
  makeStyles,
  CardMedia,
  CardActionArea,
  CardHeader,
  Tooltip,
  ClickAwayListener,
  Box,
} from "@material-ui/core/";
import { IRecipe } from "../Shared/Types";
import { Link } from "react-router-dom";
import { DarkThemeContext } from "../App";
import Image from "material-ui-image";

const useStyles = makeStyles((theme) => ({
  actionArea: {
    "&:hover $focusHighlight": {
      opacity: 0.3,
    },
  },
  focusHighlight: {
    opacity: 0,
  },
  title: {
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
    [theme.breakpoints.down("sm")]: {
      maxWidth: "130px",
      fontWeight: 600,
      fontSize: ".8rem",
    },
    [theme.breakpoints.up("md")]: {
      maxWidth: "200px",
      fontSize: "1.3rem",
      fontWeight: 500,
    },
  },
}));

interface Props {
  recipe: IRecipe;
}

export const RecipeCard = ({ recipe }: Props) => {
  const classes = useStyles();
  const { darkThemeEnabled } = useContext(DarkThemeContext);
  const [open, setOpen] = useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

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
    <Card>
      <CardActionArea
        classes={{
          root: classes.actionArea,
          focusHighlight: classes.focusHighlight,
        }}
        component={Link}
        to={{
          pathname: `/r/${recipe.id}`,
          state: { picture: recipe.picture, title: recipe.title },
        }}
      >
        <CardMedia>
          <Image
            color={darkThemeEnabled ? "#999" : "white"}
            onError={onError}
            src={imageToUse()}
            alt={"a tasty dish!"}
          />
        </CardMedia>
      </CardActionArea>
      <CardActionArea onClick={handleTooltipOpen}>
        <ClickAwayListener onClickAway={handleTooltipClose}>
          <Tooltip
            onClose={handleTooltipClose}
            open={open}
            title={recipe.title}
          >
            <Box>
              <CardHeader
                onClick={handleTooltipOpen}
                title={recipe.title}
                titleTypographyProps={{
                  className: classes.title,
                }}
                subheader={recipe.source || "Unknown"}
              />
            </Box>
          </Tooltip>
        </ClickAwayListener>
      </CardActionArea>
    </Card>
  );
};
