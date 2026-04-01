import { useContext } from "react";
import noImage from "../Shared//Images/noImage.png";
import noImageDark from "../Shared//Images/noImageDark.png";
import { Card, CardActionArea, Box, Typography } from "@mui/material";

import { IRecipe } from "../Shared/Types";
import { Link } from "react-router-dom";
import { DarkThemeContext } from "../App";

interface Props {
  recipe: IRecipe;
}

export const RecipeCard = ({ recipe }: Props) => {
  const { darkThemeEnabled } = useContext(DarkThemeContext);

  const defaultImage = darkThemeEnabled ? noImageDark : noImage;

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
        <Box className="card-image" sx={{ overflow: "hidden", aspectRatio: "1 / 1" }}>
          <img
            src={imageToUse()}
            alt={recipe.title}
            onError={(e: any) => { e.target.src = defaultImage; }}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        </Box>

        {/* Frosted glass overlay */}
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: { xs: "66px", md: "78px" },
            background: "rgba(0,0,0,0.3)",
            backdropFilter: "blur(4px)",
            WebkitBackdropFilter: "blur(4px)",
            borderRadius: "10px 10px 0 0",
            px: { xs: 0.75, md: 1.25 },
            pt: { xs: 0.75, md: 1.25 },
            pb: { xs: 1.25, md: 1.75 },
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
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {recipe.title}
          </Typography>
          <Typography
              variant="caption"
              sx={{
                color: "rgba(255,255,255,0.75)",
                fontSize: { xs: "0.7rem", md: "0.72rem" },
                display: "block",
                mt: 0.25,
                minHeight: "1em",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden",
              }}
            >
              {recipe.source}
            </Typography>
        </Box>
      </CardActionArea>
    </Card>
  );
};
