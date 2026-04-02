import { useState, useEffect } from "react";
import { RecipeCard } from "./RecipeCard";
import { Grid, Typography, Pagination, Divider } from "@mui/material";
import { IRecipe } from "../Shared/Types";
import { Loading } from "../Shared/Components/Loading";
import { Warning } from "@mui/icons-material";
import { useMobileQuery } from "../Shared/Hooks/isMobile";

interface Props {
  recipes: IRecipe[];
  loading: boolean;
}

export const RecipeList = ({ loading, recipes }: Props) => {
  const [page, setPage] = useState(1);
  const isMobile = useMobileQuery();

  const handleChange = (event: any, value: number) => {
    setTimeout(() => window.scrollTo(0, 0), 400);
    setPage(value);
  };

  useEffect(() => {
    setPage(1);
  }, [recipes]);

  const pageRecipes = recipes.slice((page - 1) * 30, page * 30);

  if (loading) return <Loading />;

  return (
    <Grid container direction="column" alignItems="center">
      <Grid
        container
        justifyContent={isMobile ? "space-evenly" : undefined}
        alignContent="flex-start"
        spacing={isMobile ? 2 : 4}
        style={{
          width: "100%",
          maxWidth: "100%",
          marginTop: "12px",
          minHeight: "calc(100vh - 175px)",
          paddingLeft: "12px",
          paddingRight: "12px",
        }}
      >
        {!recipes.length && (
          <Grid
            container
            style={{ padding: "18px" }}
            justifyContent="center"
            alignItems="center"
            direction="column"
          >
            <Typography gutterBottom>no matching recipes</Typography>
            <Warning />
          </Grid>
        )}
        {pageRecipes.map((recipe) => (
          <Grid size={{ xs: 6, sm: 4, md: 3, lg: 2, xl: 2 }} key={recipe.id}>
            <RecipeCard recipe={recipe} />
          </Grid>
        ))}
      </Grid>
      {Math.ceil(recipes.length / 30) > 1 && (
        <Grid sx={{ width: "100%" }}>
          <Divider sx={{ mt: 2, mb: 1 }} />
          <Pagination
            count={Math.ceil(recipes.length / 30)}
            page={page}
            color="primary"
            shape="rounded"
            size={isMobile ? "small" : "large"}
            onChange={handleChange}
            sx={{ display: "flex", justifyContent: "center", py: 2 }}
          />
        </Grid>
      )}
    </Grid>
  );
};
