import React, { useState, useEffect } from "react";
import { RecipeCard } from "./RecipeCard";
import { Box, makeStyles, Typography } from "@material-ui/core";
import { IRecipe } from "../Shared/Types";
import { Loading } from "../Shared/Components/Loading";
import HelpOutline from "@material-ui/icons/HelpOutline";
import Pagination from "@material-ui/lab/Pagination";

const useStyles = makeStyles((theme) => ({
  recipesContainer: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    maxWidth: "100%",
  },
  noRecipesContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "40px",
  },
}));

interface Props {
  recipes: IRecipe[];
  loading: boolean;
}

export const RecipeList = ({ loading, recipes }: Props) => {
  const classes = useStyles();
  const [page, setPage] = useState(1);
  const handleChange = (event: any, value: number) => {
    setPage(value);
  };

  useEffect(() => {
    setPage(1);
  }, [recipes]);

  const isInRange = (index: number) => {
    const max = page * 30 - 1;
    const min = max - 29;
    return index >= min && index <= max;
  };

  if (loading) return <Loading />;
  if (!recipes.length) {
    return (
      <Box className={classes.noRecipesContainer}>
        <HelpOutline />
        <Typography>no recipes match that search!</Typography>
      </Box>
    );
  }
  return (
    <>
      <Box className={classes.recipesContainer}>
        {recipes.map((recipe, i) =>
          isInRange(i) ? (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ) : undefined
        )}
      </Box>
      <Pagination
        count={Math.ceil(recipes.length / 30)}
        page={page}
        color="primary"
        onChange={handleChange}
      />
    </>
  );
};
