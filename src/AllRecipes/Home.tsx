/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback } from "react";
import { Box, Paper, Input, makeStyles, Typography } from "@material-ui/core";
import { IRecipe, emptyFilters } from "../Shared/Types";
import { RecipeAPI } from "../Shared/APIs/RecipeAPI";
import SearchIcon from "@material-ui/icons/Search";
import { AdvancedFilters } from "./AdvancedFilters";
import { RecipeList } from "./RecipeList";
import { RecipeTransform } from "./RecipeTransform";
import { ShowFiltersChip } from "./ShowFiltersChip";
import { useHistory } from "react-router-dom";
import { isEqual, debounce } from "lodash";

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  searchContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  searchBarLine: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  searchBox: {
    borderRadius: "25px",
    backgroundColor: theme.palette.type === "dark" ? "grey" : "#DFE1E5",
    height: "40px",
    width: "40%",
    paddingLeft: "10px",
    paddingRight: "10px",
    margin: "10px",
  },
  titleBar: {
    width: "100%",
    background: "linear-gradient(0.25turn, #f44723, #f56730, #f44723)",
    zIndex: 1,
    marginTop: "-1px",
    paddingLeft: "20px",
  },
  title: {
    marginRight: "auto",
    fontWeight: 700,
    color: theme.palette.type === "dark" ? "silver" : "white",
    fontSize: 70,
    [theme.breakpoints.down("sm")]: {
      fontSize: 22,
    },
  },
  subTitle: {
    marginBottom: "10px",
    marginRight: "auto",
    fontWeight: 400,
    color: theme.palette.type === "dark" ? "silver" : "white",
    [theme.breakpoints.down("sm")]: {
      fontSize: 16,
    },
  },
}));

export const Home = () => {
  const [recipes, setRecipes] = useState<IRecipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<IRecipe[]>([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const [selectedFilters, setSelectedFilters] = useState(emptyFilters);
  const [searchTerm, setSearchTerm] = useState("");
  const [filtersExpanded, setFiltersExpanded] = useState(false);
  const classes = useStyles();
  useEffect(() => {
    RecipeAPI.getAllRecipes().then((recipes) => {
      setRecipes(recipes);
      setFilteredRecipes(recipes);
      setLoading(false);
      if (history.location.state) {
        setSelectedFilters(history.location.state);
        setSearchTerm(history.location.state.debouncedSearchTerm);
        if (
          history.location.state.mainIngredient ||
          history.location.state.region ||
          history.location.state.type ||
          history.location.state.source
        ) {
          setFiltersExpanded(true);
        }
      }
    });
  }, []);

  useEffect(() => {
    console.log("fetching new recipes");
    const newFilteredRecipes = RecipeTransform.filterRecipes(
      recipes,
      selectedFilters
    );
    console.log("filtered", newFilteredRecipes);
    if (!isEqual(filteredRecipes, newFilteredRecipes)) {
      setFilteredRecipes(newFilteredRecipes);
    }
    if (!loading) {
      history.push("/all", selectedFilters);
    }
  }, [selectedFilters, recipes]);

  const setDebouncedSearchTerm = useCallback(
    debounce((debouncedSearchTerm: string) => {
      setSelectedFilters((prev) => ({
        ...prev,
        debouncedSearchTerm,
      }));
    }, 500),
    []
  );

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setDebouncedSearchTerm(event.target.value);
  };

  const title = `WAYNE'S FAMILY RECIPES`;
  const description = "Traditional Cajun food and so much more!";

  return (
    <Box>
      <Paper className={classes.searchContainer}>
        <Box className={classes.titleBar}>
          <Typography className={classes.title} variant="h2">
            {title}
          </Typography>
          <Typography className={classes.subTitle} variant="h6">
            {description}
          </Typography>
        </Box>
        <Box className={classes.searchBarLine}>
          <Input
            placeholder="search"
            disableUnderline
            className={classes.searchBox}
            value={searchTerm}
            onChange={handleChangeInput}
            endAdornment={<SearchIcon style={{ color: "grey" }} />}
          />
          <ShowFiltersChip
            expanded={filtersExpanded}
            setExpanded={setFiltersExpanded}
          />
        </Box>
        <AdvancedFilters
          expanded={filtersExpanded}
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
        />
      </Paper>
      <RecipeList loading={loading} recipes={filteredRecipes} />
    </Box>
  );
};
