/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from "react";
import noImage from "../Shared/Images/noImage.png";
import {
  Box,
  Divider,
  Grid,
  IconButton,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core/";
import { RecipeAPI } from "../Shared/APIs/RecipeAPI";
import { useParams, useLocation } from "react-router-dom";
import { Loading } from "../Shared/Components/Loading";
import { IRecipe, emptyRecipe } from "../Shared/Types";
import { RecipeDisplayButtons } from "./RecipeDisplayButtons";
import { RecipeSpecifications } from "./RecipeSpecifications";
import { DirectionsList } from "./DirectionsList";
import { IngredientsList } from "./IngredientsList";
import { Rating } from "@material-ui/lab";
import { useMobileQuery } from "../Shared/Hooks/isMobile";
import { ReviewsChartDialog } from "./ReviewsChartDialog";
import Image from "material-ui-image";
import { DarkThemeContext } from "../App";

const useStyles = makeStyles((theme) => ({
  recipeDetails: {
    [theme.breakpoints.up("md")]: {
      height: "90vh",
      paddingTop: "20px",
      paddingBottom: "20px",
      paddingRight: "5vw",
      marginLeft: "auto",
      overflow: "scroll",
    },
  },
  container: {
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
    [theme.breakpoints.up("md")]: {
      marginLeft: "auto",
    },
  },
  image: {
    [theme.breakpoints.down("sm")]: {
      width: "80vw",
      paddingBottom: "8px",
      paddingTop: "8px",
    },
    [theme.breakpoints.up("md")]: {
      paddingLeft: "5vw",
      width: "36vw",
    },
  },
}));

export const RecipeDisplay = () => {
  const { state } = useLocation();
  const [recipe, setRecipe] = useState<IRecipe>({
    ...emptyRecipe,
    picture: state?.picture || null,
    title: state?.title || "",
  });
  const [loading, setLoading] = useState(true);
  const [openReviewsDialog, setOpenReviewsDialog] = useState(false);
  const { recipeId } = useParams();
  const classes = useStyles();
  const isMobile = useMobileQuery();
  const { darkThemeEnabled } = useContext(DarkThemeContext);

  const loadRecipe = () => {
    RecipeAPI.getRecipe(recipeId).then((recipe) => {
      setRecipe(recipe);
      setLoading(false);
    });
  };

  useEffect(() => {
    loadRecipe();
  }, []);

  const onError = (ev: any) => {
    const eventTarget = ev.target;
    eventTarget.src = noImage;
  };

  const tags = [recipe.type, recipe.mainIngredient, recipe.region];
  if (loading) return <Loading />;
  return (
    <Grid
      container
      direction={isMobile ? "column" : "row"}
      justify="center"
      alignItems="center"
      className={classes.container}
    >
      <Grid item xs={10} md={5}>
        <Box displayPrint="none" className={classes.image}>
          <Image
            color={darkThemeEnabled ? "999" : "white"}
            onError={onError}
            src={recipe.picture || noImage}
            alt={"a tasty dish"}
          />
        </Box>
      </Grid>
      <Grid item xs={10} md={6} className={classes.recipeDetails}>
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
      </Grid>
      <ReviewsChartDialog
        open={openReviewsDialog}
        handleClose={() => setOpenReviewsDialog(false)}
        recipe={recipe}
      />
    </Grid>
  );
};
