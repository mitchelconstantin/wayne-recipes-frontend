import React, { useState, useEffect } from "react";
import { RecipeCard } from "./RecipeCard";
import { Grid, Typography } from "@material-ui/core";
import { IRecipe } from "../Shared/Types";
import { Loading } from "../Shared/Components/Loading";
import { Warning } from "@material-ui/icons";
import Pagination from "@material-ui/lab/Pagination";
import { isEmpty } from "lodash";
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

  const isInRange = (index: number) => {
    const max = page * 30 - 1;
    const min = max - 29;
    return index >= min && index <= max;
  };

  if (loading) return <Loading />;

  return (
    <Grid container direction="column" alignItems="center">
      <Grid
        item
        container
        justify={isMobile ? "space-evenly" : undefined}
        spacing={isMobile ? 2 : 4}
        style={{
          maxWidth: "100%",
          marginTop: "0px",
          minHeight: "calc(100vh - 175px)",
        }}
      >
        {isEmpty(recipes) && (
          <Grid
            container
            style={{ padding: "18px" }}
            justify="center"
            alignItems="center"
            direction="column"
          >
            <Typography gutterBottom>no matching recipes</Typography>
            <Warning />
          </Grid>
        )}
        {!isEmpty(recipes) &&
          recipes.map((recipe, i) =>
            isInRange(i) ? (
              <Grid xs={5} sm={4} md={3} lg={2} xl={1} item key={recipe.id}>
                <RecipeCard recipe={recipe} />
              </Grid>
            ) : undefined
          )}
      </Grid>
      <Grid item>
        <Pagination
          count={Math.ceil(recipes.length / 30)}
          page={page}
          color="primary"
          onChange={handleChange}
          style={{ padding: "16px" }}
        />
      </Grid>
    </Grid>
  );
};
