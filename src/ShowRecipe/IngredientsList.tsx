import React from 'react';
import { Box, Typography, makeStyles } from '@material-ui/core/';

const useStyles = makeStyles(theme => ({
  ingredientsLine: {
    marginTop: '10px',
    fontWeight: 500,
    fontSize: '1rem',
    '@media print': {
      fontSize: '1.2rem',
    }
  }
}));

interface props {
  ingredients?: string;
}

export const IngredientsList = ({ ingredients }: props) => {
  const classes = useStyles();
  if (!ingredients) return <div>no ingredients found</div>;

  const processedIngredients = ingredients
    .split('\n')
    .map((line, i: number) => {
      return (
        <Typography key={i} className={classes.ingredientsLine}>
          {line}
        </Typography>
      );
    });
  return (
    <Box mt="20px" mb="20px">
      <Typography variant="h2">Ingredients</Typography>
      {processedIngredients}
    </Box>
  );
};
