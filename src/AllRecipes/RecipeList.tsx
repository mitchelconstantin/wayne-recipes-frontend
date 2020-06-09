import React, { useState, useEffect } from "react";
import { RecipeCard } from "./RecipeCard";
import { Box, makeStyles, Typography } from "@material-ui/core";
import { IRecipe } from "../Shared/Types";
import { Loading } from "../Shared/Components/Loading";
import HelpOutline from "@material-ui/icons/HelpOutline";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";

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
  const [current, setCurrent] = useState(1);

  useEffect(() => {
    setCurrent(1);
  }, [recipes]);

  const isInRange = (index: number) => {
    const max = current * 30 - 1;
    const min = max - 29;
    return index >= min && index <= max;
  };

  const onChange = (page: number) => {
    setCurrent(page);
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
        onChange={onChange}
        current={current}
        total={recipes.length}
        pageSize={30}
      />
    </>
  );
};
