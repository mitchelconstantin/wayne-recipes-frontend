import { useContext, useState } from "react";
import noImage from "../Shared//Images/noImage.png";
import noImageDark from "../Shared//Images/noImageDark.png";
import {
  Card,
  CardMedia,
  CardActionArea,
  CardHeader,
  Tooltip,
  ClickAwayListener,
  Box,
} from "@mui/material";

import { IRecipe } from "../Shared/Types";
import { Link } from "react-router-dom";
import { DarkThemeContext } from "../App";
import { Image as MaterialImage } from "./MaterialImage";

interface Props {
  recipe: IRecipe;
}

export const RecipeCard = ({ recipe }: Props) => {
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
    return `${baseUrl}upload/ar_1:1,w_300,h_300,c_fill,g_auto,q_auto,f_auto${imageId}`;
  };

  return (
    <Card>
      <CardActionArea
        sx={{
          "&:hover .MuiCardActionArea-focusHighlight": { opacity: 0.3 },
          "& .MuiCardActionArea-focusHighlight": { opacity: 0 },
        }}
        component={Link}
        to={`/r/${recipe.id}`}
        state={{ picture: recipe.picture, title: recipe.title }}
      >
        <CardMedia>
          <MaterialImage
            color={darkThemeEnabled ? "#RRGGBBAA" : "white"}
            onError={onError}
            src={imageToUse()}
            alt={"a tasty dish!"}
            animationDuration={1}
            disableTransition={true}
            disableSpinner={true}
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
                  sx: {
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    maxWidth: { xs: "110px", md: "200px" },
                    fontWeight: { xs: 600, md: 500 },
                    fontSize: { xs: ".8rem", md: "1.3rem" },
                  },
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
