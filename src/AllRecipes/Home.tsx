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
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  titleBar: {
    width: "100%",
    // background: "linear-gradient(0.25turn, #f44723, #f56730, #f44723)",
    zIndex: 1,
    // paddingTop: "-1px",
    border: "none",
    marginTop: "0px",
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
  root: {
    padding: "2px 4px",
    margin: "8px",
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

  // const title = `WAYNE'S FAMILY RECIPES`;
  // const description = "Traditional Cajun food and so much more!";

  return (
    <Box>
      {/* <Box className={classes.titleBar}>
        <Typography className={classes.title} variant="h2" display="inline">
          {title}
        </Typography>
        <Typography className={classes.subTitle} variant="h6" display="inline">
          {description}
        </Typography>
      </Box> */}

      <Paper className={classes.searchContainer}>
        <Paper component="form" className={classes.root}>
          <InputBase
            className={classes.input}
            placeholder="Search Recipes"
            inputProps={{ "aria-label": "search" }}
            value={searchTerm}
            onChange={handleChangeInput}
          />
          <Tooltip title="Clear Search Term">
            <IconButton
              type="submit"
              className={classes.iconButton}
              onClick={() => setSearchTerm("")}
              aria-label="search"
            >
              <Close />
            </IconButton>
          </Tooltip>
          <Divider className={classes.divider} orientation="vertical" />
          <ShowFiltersChip
            expanded={filtersExpanded}
            setExpanded={setFiltersExpanded}
          />
        </Paper>
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
