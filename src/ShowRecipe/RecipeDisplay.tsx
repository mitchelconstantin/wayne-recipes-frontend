/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import noImage from "../Shared/Images/noImage.png";
import { Box, Chip, Divider, Grid, IconButton, Typography } from "@mui/material";
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
import { QRCodeSVG } from "qrcode.react";

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

  const loadRecipe = async () => {
    const recipe = await RecipeAPI.getRecipe(recipeId);
    if (!recipe) return;
    setRecipe(recipe);
    setLoading(false);
  };

  useEffect(() => {
    loadRecipe();
  }, []);

  const tags = [recipe.type, recipe.mainIngredient, recipe.region];
  if (loading) return <Loading />;

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      sx={{ "@media print": { display: "block" }, px: { xs: 2, md: 4 } }}
    >
      <Grid
        size={{ xs: 10, md: 5 }}
        sx={{
          "@media print": { display: "none" },
          padding: { xs: "16px 0", md: "24px 32px" },
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
        }}
      >
        <img
          src={recipe.picture || noImage}
          alt={recipe.title}
          onError={(e: any) => { e.target.src = noImage; }}
          style={{
            width: "100%",
            maxHeight: "80vh",
            height: "auto",
            display: "block",
            borderRadius: "20px",
            boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
          }}
        />
      </Grid>

      <Grid
        size={{ xs: 10, md: 6 }}
        sx={{
          height: { md: "90vh" },
          marginLeft: { md: "auto" },
          overflow: { md: "scroll" },
          pt: { xs: 1, md: 3 },
          pb: { xs: 2, md: 3 },
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: 4 }}>
          <Box display="flex" flexDirection="column">
            <Typography variant={isMobile ? "h5" : "h3"} sx={{ "@media print": { color: "black" } }}>
              {recipe.title}
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", "@media print": { display: "none" } }}>
              <Rating name="read-only" precision={0.5} value={recipe.rating} readOnly />
              <IconButton
                disabled={!recipe.numberOfReviews}
                size="small"
                color="primary"
                onClick={() => setOpenReviewsDialog(true)}
              >
                {`(${recipe.numberOfReviews || 0})`}
              </IconButton>
            </Box>
            <RecipeSpecifications recipe={recipe} />
          </Box>
          <Box sx={{ display: "none", "@media print": { display: "flex" }, flexDirection: "column", alignItems: "center", gap: 0.5, flexShrink: 0 }}>
            <QRCodeSVG value={window.location.href} size={80} />
            <Typography variant="caption" sx={{ color: "black", textAlign: "center", maxWidth: 80, wordBreak: "break-all", fontSize: "0.55rem" }}>
              {window.location.href}
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: { xs: "left", md: "center" },
            "@media print": { display: "none" },
          }}
        >
          <RecipeDisplayButtons reloadRecipe={loadRecipe} recipe={recipe} />
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75, marginLeft: { md: "auto" } }}>
            {tags.filter(Boolean).map((tag) => (
              <Chip key={tag} label={tag} size="small" variant="outlined" />
            ))}
          </Box>
        </Box>
        <Divider />
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
