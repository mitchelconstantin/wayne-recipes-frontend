/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useContext } from "react";
import noImage from "../Shared/Images/noImage.png";
import { Box, Divider, Grid, IconButton, Typography } from "@mui/material";
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
  const isMobile = useMobileQuery();
  const { darkThemeEnabled } = useContext(DarkThemeContext);
  const [aspectRatio, setAspectRatio] = useState(1);

  const getAspectRatio = (url: string) => {
    const img = new Image();
    img.onload = () => setAspectRatio(img.width / img.height);
    img.src = url;
  };

  const loadRecipe = async () => {
    const recipe = await RecipeAPI.getRecipe(recipeId);
    if (!recipe) return;
    setRecipe(recipe);
    setLoading(false);
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
      sx={{ "@media print": { display: "block" } }}
    >
      <Grid
        size={{ xs: 10, md: 5 }}
        sx={{
          "@media print": { display: "none" },
          width: { xs: "80vw", md: "40vw" },
          padding: { xs: "16px 0", md: "24px 32px" },
          height: { md: "80vh" },
          marginRight: { md: "auto" },
          overflow: { md: "hidden" },
        }}
      >
        <MaterialImage
          style={{ objectFit: "contain", maxHeight: "80vh", maxWidth: "40vw" }}
          color={darkThemeEnabled ? "999" : "white"}
          aspectRatio={aspectRatio}
          onError={onError}
          src={recipe.picture || noImage}
          alt={"a tasty dish"}
        />
      </Grid>
      <Grid
        size={{ xs: 10, md: 6 }}
        sx={{
          height: { md: "90vh" },
          padding: { md: 3 },
          marginLeft: { md: "auto" },
          overflow: { md: "scroll" },
        }}
      >
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

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: { xs: "left", md: "center" },
          }}
        >
          <RecipeDisplayButtons reloadRecipe={loadRecipe} recipe={recipe} />
          <Box sx={{ display: "flex", marginLeft: { md: "auto" } }}>
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
