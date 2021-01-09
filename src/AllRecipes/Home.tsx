/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Paper,
  makeStyles,
  Divider,
  IconButton,
  InputBase,
  Tooltip,
} from "@material-ui/core";
import { IRecipe, emptyFilters } from "../Shared/Types";
import { RecipeAPI } from "../Shared/APIs/RecipeAPI";
import { AdvancedFilters } from "./AdvancedFilters";
import { RecipeList } from "./RecipeList";
import { RecipeTransform } from "./RecipeTransform";
import { ShowFiltersChip } from "./ShowFiltersChip";
import { useHistory } from "react-router-dom";
import { isEqual, debounce } from "lodash";
import { Close } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  searchContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  searchBox: {
    margin: theme.spacing(1, 1, 1, 1),
    [theme.breakpoints.down("xs")]: {
      margin: theme.spacing(2, 1, 1, 1),
    },
    display: "flex",
    alignItems: "center",
    minWidth: "40%",
    maxWidth: "60vw",
    borderRadius: "25px",
    backgroundColor: theme.palette.type === "dark" ? "grey" : "#DFE1E5",
  },
  input: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
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
          history.location.state.source ||
          history.location.state.rating
        ) {
          setFiltersExpanded(true);
        }
      }
    });
  }, []);

  useEffect(() => {
    const newFilteredRecipes = RecipeTransform.filterRecipes(
      recipes,
      selectedFilters
    );
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

  const clearInput = () => {
    setSearchTerm("");
    setDebouncedSearchTerm("");
    setSelectedFilters(emptyFilters);
  };

  const isPristine = !searchTerm && isEqual(selectedFilters, emptyFilters);

  return (
    <>
      <Paper className={classes.searchContainer}>
        <Box className={classes.searchBox}>
          <InputBase
            className={classes.input}
            placeholder="Search Recipes"
            inputProps={{ "aria-label": "search" }}
            value={searchTerm}
            onChange={handleChangeInput}
          />
          {!isPristine && (
            <Tooltip title="Clear Search Term and Filters">
              <IconButton
                type="submit"
                className={classes.iconButton}
                onClick={clearInput}
                aria-label="search"
              >
                <Close />
              </IconButton>
            </Tooltip>
          )}
          <Divider className={classes.divider} orientation="vertical" />
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
    </>
  );
};
