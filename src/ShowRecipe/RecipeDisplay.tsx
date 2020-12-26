/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import noImage from "../Shared/Images/noImage.png";
import {
  Box,
  Divider,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core/";
import { RecipeAPI } from "../Shared/APIs/RecipeAPI";
import { useParams } from "react-router-dom";
import { Loading } from "../Shared/Components/Loading";
import { IRecipe, emptyRecipe } from "../Shared/Types";
import { RecipeDisplayButtons } from "./RecipeDisplayButtons";
import { RecipeSpecifications } from "./RecipeSpecifications";
import { DirectionsList } from "./DirectionsList";
import { IngredientsList } from "./IngredientsList";
import { Rating } from "@material-ui/lab";
import { useMobileQuery } from "../Shared/Hooks/isMobile";
import { ReviewsChartDialog } from "./ReviewsChartDialog";

const useStyles = makeStyles((theme) => ({
  recipeDetails: {
    marginLeft: "30px",
    marginRight: "30px",
  },
  container: {
    paddingTop: "50px",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "center",
    },
    [theme.breakpoints.up("md")]: { flexDirection: "row", alignItems: "top" },
    "@media print": {
      display: "block",
    },
  },
  recipeInteraction: {
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "left",
    },
    [theme.breakpoints.up("md")]: {
      flexDirection: "row",
      alignItems: "center",
    },
  },
  recipeTags: {
    display: "flex",
    [theme.breakpoints.down("sm")]: {},
    [theme.breakpoints.up("md")]: {
      marginLeft: "auto",
    },
  },
  image: {
    objectFit: "cover",
    [theme.breakpoints.down("sm")]: {
      maxWidth: "80vw",
    },
    [theme.breakpoints.up("md")]: {
      padding: "16px",
      maxWidth: "30vw",
    },
  },
}));

export const RecipeDisplay = () => {
  const [recipe, setRecipe] = useState<IRecipe>(emptyRecipe);
  const [loading, setLoading] = useState(true);
  const [openReviewsDialog, setOpenReviewsDialog] = useState(false);
  const { recipeId } = useParams();
  const classes = useStyles();
  const isMobile = useMobileQuery();

  const loadRecipe = () => {
    RecipeAPI.getRecipe(recipeId).then((recipe) => {
      setRecipe(recipe);
      setLoading(false);
    });
  };

  useEffect(() => {
    loadRecipe();
  }, []);

  const onError = (ev: { target: any }) => {
    const eventTarget = ev.target;
    eventTarget.src = noImage;
  };

  const tags = [recipe.type, recipe.mainIngredient, recipe.region];
  if (loading) return <Loading />;
  return (
    <Box className={classes.container}>
      <Box displayPrint="none">
        <img
          onError={onError}
          className={classes.image}
          src={recipe.picture || noImage}
          alt={"a tasty dish"}
        />
      </Box>
      <Box className={classes.recipeDetails}>
        <Box display="flex" flexDirection="column">
          <Typography variant={isMobile ? "h5" : "h3"}>
            {recipe.title}
          </Typography>
          <Box display="flex" flexDirection="row" alignItems="center">
            <Rating
              name="read-only"
              precision={0.5}
              value={recipe.reviewScore}
              readOnly
            />
            <IconButton
              disabled={!recipe.numberOfReviews}
              size="small"
              color="primary"
              onClick={() => setOpenReviewsDialog(true)}
            >
              {`(${recipe.numberOfReviews || 0})`}
            </IconButton>
          </Box>
        </Box>

        <Box className={classes.recipeInteraction}>
          <RecipeDisplayButtons reloadRecipe={loadRecipe} recipe={recipe} />
          <Box className={classes.recipeTags}>
            {tags.map((tag) => !!tag && `#${tag} `)}
          </Box>
        </Box>
        <Divider />
        <RecipeSpecifications recipe={recipe} />
        <IngredientsList ingredients={recipe.ingredients} />
        <DirectionsList directions={recipe.directions} />
      </Box>
      <ReviewsChartDialog
        open={openReviewsDialog}
        handleClose={() => setOpenReviewsDialog(false)}
        recipe={recipe}
      />
    </Box>
  );
};
