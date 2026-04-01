import { useContext } from "react";
import noImage from "../Shared//Images/noImage.png";
import noImageDark from "../Shared//Images/noImageDark.png";
import { Card, CardActionArea, Box, Typography } from "@mui/material";

import { IRecipe } from "../Shared/Types";
import { Link } from "react-router-dom";
import { DarkThemeContext } from "../App";
import { Image as MaterialImage } from "./MaterialImage";

interface Props {
  recipe: IRecipe;
}

export const RecipeCard = ({ recipe }: Props) => {
  const { darkThemeEnabled } = useContext(DarkThemeContext);

  const defaultImage = darkThemeEnabled ? noImageDark : noImage;

  const onError = (ev: any) => {
    ev.target.src = defaultImage;
  };

  const imageToUse = () => {
    if (!recipe.picture) return defaultImage;
    const [baseUrl, imageId] = recipe.picture.split("upload");
    return `${baseUrl}upload/ar_1:1,w_300,h_300,c_fill,g_auto,q_auto,f_auto${imageId}`;
  };

  return (
    <Card
      sx={{
        borderRadius: 2,
        overflow: "hidden",
        position: "relative",
        "& .card-image": {
          transition: "transform 0.3s ease",
        },
        "&:hover .card-image": {
          transform: "scale(1.05)",
        },
      }}
    >
      <CardActionArea
        component={Link}
        to={`/r/${recipe.id}`}
        state={{ picture: recipe.picture, title: recipe.title }}
        sx={{ display: "block", position: "relative" }}
      >
        <Box className="card-image" sx={{ overflow: "hidden" }}>
          <MaterialImage
            color={darkThemeEnabled ? "#RRGGBBAA" : "white"}
            onError={onError}
            src={imageToUse()}
            alt={"a tasty dish!"}
            animationDuration={1}
            disableTransition={true}
            disableSpinner={true}
          />
        </Box>

        {/* Gradient overlay */}
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: { xs: "62px", md: "72px" },
            background: "rgba(0,0,0,0.45)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            p: { xs: 0.75, md: 1.25 },
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: "white",
              fontWeight: 600,
              fontSize: { xs: "0.82rem", md: "0.9rem" },
              lineHeight: 1.3,
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {recipe.title}
          </Typography>
          {recipe.source && (
            <Typography
              variant="caption"
              sx={{
                color: "rgba(255,255,255,0.75)",
                fontSize: { xs: "0.7rem", md: "0.72rem" },
                display: "block",
                mt: 0.25,
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden",
              }}
            >
              {recipe.source}
            </Typography>
          )}
        </Box>
      </CardActionArea>
    </Card>
  );
};
