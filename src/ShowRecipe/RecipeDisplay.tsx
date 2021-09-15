/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useContext } from "react";
import noImage from "../Shared/Images/noImage.png";
import { Box, Divider, Grid, IconButton, Typography } from "@mui/material/";
import { makeStyles } from "@mui/styles";
import { RecipeAPI } from "../Shared/APIs/RecipeAPI";
import { useParams, useLocation } from "react-router-dom";
import { Loading } from "../Shared/Components/Loading";
import { IRecipe, emptyRecipe } from "../Shared/Types";
import { RecipeDisplayButtons } from "./RecipeDisplayButtons";
import { RecipeSpecifications } from "./RecipeSpecifications";
import { DirectionsList } from "./DirectionsList";
import { IngredientsList } from "./IngredientsList";
import { Rating } from "@mui/material";
import { useMobileQuery } from "../Shared/Hooks/isMobile";
import { ReviewsChartDialog } from "./ReviewsChartDialog";
import { DarkThemeContext } from "../App";
import { Image as MaterialImage } from "../AllRecipes/MaterialImage";

const useStyles = makeStyles((theme) => ({
  recipeDetails: {
    [theme.breakpoints.up("md")]: {
      height: "90vh",
      padding: theme.spacing(3),
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
    [theme.breakpoints.down("md")]: {
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
  imageContainer: {
    "@media print": {
      display: "none",
    },
    [theme.breakpoints.down("md")]: {
      width: "80vw",
      padding: theme.spacing(2, 0),
    },
    [theme.breakpoints.up("md")]: {
      width: "40vw",
      height: "80vh",
      padding: theme.spacing(3, 4),
      marginRight: "auto",
      overflow: "hidden",
    },
  },
  image: {
    [theme.breakpoints.up("md")]: {
      maxHeight: "80vh",
      maxWidth: "40vw",
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
  const [aspectRatio, setAspectRatio] = useState(1);

  const getAspectRatio = (url: string) => {
    const img = new Image();
    img.onload = () => setAspectRatio(img.width / img.height);
    img.src = url;
  };

  const loadRecipe = () => {
    RecipeAPI.getRecipe(recipeId).then((recipe) => {
      setRecipe(recipe);
      setLoading(false);
    });
  };

  useEffect(() => {
    loadRecipe();
    getAspectRatio(recipe.picture || noImage);
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
      direction="row"
      justifyContent="center"
      className={classes.container}
    >
      <Grid className={classes.imageContainer} item xs={10} md={5}>
        <MaterialImage
          className={classes.image}
          style={{ objectFit: "contain" }}
          color={darkThemeEnabled ? "999" : "white"}
          aspectRatio={aspectRatio}
          onError={onError}
          src={recipe.picture || noImage}
          alt={"a tasty dish"}
        />
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
              value={recipe.rating}
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
