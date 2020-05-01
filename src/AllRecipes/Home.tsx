/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback } from 'react';
import { Box, Paper, Input, makeStyles } from '@material-ui/core';
import { IRecipe, emptyFilters } from '../Shared/Types';
import { RecipeAPI } from '../Shared/APIs/RecipeAPI';
import SearchIcon from '@material-ui/icons/Search';
import { AdvancedFilters } from './AdvancedFilters';
import { RecipeList } from './RecipeList';
import { RecipeTransform } from './RecipeTransform';
import { ShowFiltersChip } from './ShowFiltersChip';
import { useHistory } from 'react-router-dom';
import { isEqual, debounce } from 'lodash';

const useStyles = makeStyles(theme => ({
  searchContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  searchBarLine: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  searchBox: {
    borderRadius: '25px',
    backgroundColor: '#DFE1E5',
    height: '40px',
    width: '40%',
    paddingLeft: '10px',
    paddingRight: '10px',
    margin: '10px'
  }
}));

export const Home = () => {
  const [recipes, setRecipes] = useState<IRecipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<IRecipe[]>([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const [selectedFilters, setSelectedFilters] = useState(emptyFilters);
  const [searchTerm, setSearchTerm] = useState('');
  const [filtersExpanded, setFiltersExpanded] = useState(false);
  const classes = useStyles();
  useEffect(() => {
    RecipeAPI.getAllRecipes().then(recipes => {
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
    const newFilteredRecipes = RecipeTransform.filterRecipes(
      recipes,
      selectedFilters
    );
    if (!isEqual(filteredRecipes, newFilteredRecipes)) {
      setFilteredRecipes(newFilteredRecipes);
    }
    if (!loading) {
      history.push('/all', selectedFilters);
    }
  }, [selectedFilters, recipes]);

  const setDebouncedSearchTerm = useCallback(
    debounce((debouncedSearchTerm: string) => {
      setSelectedFilters(prev => ({
        ...prev,
        debouncedSearchTerm
      }));
    }, 500),
    []
  );

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setDebouncedSearchTerm(event.target.value);
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Paper className={classes.searchContainer}>
        <Box className={classes.searchBarLine}>
          <Input
            placeholder="search"
            disableUnderline
            className={classes.searchBox}
            value={searchTerm}
            onChange={handleChangeInput}
            endAdornment={<SearchIcon style={{ color: 'grey' }} />}
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
