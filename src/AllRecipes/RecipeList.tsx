import React from 'react';
import { RecipeCard } from './RecipeCard';
import { Box, makeStyles, Typography } from '@material-ui/core';
import { IRecipe } from '../Shared/Types';
import { Loading } from '../Shared/Components/Loading';
import HelpOutline from '@material-ui/icons/HelpOutline';

const useStyles = makeStyles(theme => ({
  recipesContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    maxWidth: '100%'
  },
  noRecipesContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '40px'
  }
}));

interface Props {
  recipes: IRecipe[];
  loading: boolean;
}

export const RecipeList = ({ loading, recipes }: Props) => {
  const classes = useStyles();

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
    <Box className={classes.recipesContainer}>
      {recipes.map(recipe => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </Box>
  );
};
