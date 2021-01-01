/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import {
  makeStyles,
  MenuItem,
  InputLabel,
  Select,
  Collapse,
  FormControl,
  Button,
} from "@material-ui/core";
import { RecipeAPI } from "../Shared/APIs/RecipeAPI";
import { emptyFilterOptions, emptyFilters, IFilters } from "../Shared/Types";
import { Rating } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  container: {},
  select: {
    width: "140px",
    margin: "10px",
  },
  button: {
    height: "100%",
    marginTop: "auto",
  },
}));

interface AdvancedFiltersProps {
  selectedFilters: IFilters;
  setSelectedFilters: any;
  expanded: boolean;
}
export const AdvancedFilters = ({
  selectedFilters,
  setSelectedFilters,
  expanded,
}: AdvancedFiltersProps) => {
  const classes = useStyles();
  const [allFilters, setAllFilters] = useState(emptyFilterOptions);

  useEffect(() => {
    if (expanded && !allFilters.mainIngredients.length) {
      RecipeAPI.getFilters().then(
        ({ mainIngredients, regions, types, sources }) => {
          setAllFilters((prev) => ({
            ...prev,
            mainIngredients,
            regions,
            types,
            sources,
          }));
        }
      );
    }
    if (!expanded && allFilters.mainIngredients.length) {
      setSelectedFilters(emptyFilters);
    }
  }, [expanded]);
  const handleChangeMainIngredient = (
    e: React.ChangeEvent<{ value: unknown }>
  ) => handleChange(e, "mainIngredient");
  const handleChangeRegion = (e: React.ChangeEvent<{ value: unknown }>) =>
    handleChange(e, "region");
  const handleChangeType = (e: React.ChangeEvent<{ value: unknown }>) =>
    handleChange(e, "type");
  const handleChangeSource = (e: React.ChangeEvent<{ value: unknown }>) =>
    handleChange(e, "source");
  const handleChangeRating = (e: React.ChangeEvent<{ value: unknown }>) =>
    handleChange(e, "rating");

  const handleChange = (e: React.ChangeEvent<{ value: unknown }>, x: any) => {
    setSelectedFilters((prev: any) => ({
      ...prev,
      [x]: e.target.value,
    }));
  };

  const handleClear = () => {
    const debouncedSearchTerm = selectedFilters.debouncedSearchTerm;
    setSelectedFilters({ ...emptyFilters, debouncedSearchTerm });
  };

  const { mainIngredients, regions, types, sources, ratings } = allFilters;

  return (
    <Collapse className={classes.container} in={expanded}>
      <FormControl className={classes.select}>
        <InputLabel>Main Ingredient</InputLabel>
        <Select
          value={selectedFilters.mainIngredient}
          onChange={handleChangeMainIngredient}
        >
          <MenuItem value={""}>All</MenuItem>
          {mainIngredients.map((mi) => (
            <MenuItem key={mi} value={mi}>
              {mi}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className={classes.select}>
        <InputLabel>Region</InputLabel>
        <Select value={selectedFilters.region} onChange={handleChangeRegion}>
          <MenuItem value={""}>All</MenuItem>
          {regions.map((region) => (
            <MenuItem key={region} value={region}>
              {region}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className={classes.select}>
        <InputLabel>Recipe Type</InputLabel>
        <Select value={selectedFilters.type} onChange={handleChangeType}>
          <MenuItem value={""}>All</MenuItem>
          {types.map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className={classes.select}>
        <InputLabel>Source</InputLabel>
        <Select value={selectedFilters.source} onChange={handleChangeSource}>
          <MenuItem value={""}>All</MenuItem>
          {sources.map((source) => (
            <MenuItem key={source} value={source}>
              {source}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className={classes.select}>
        <InputLabel>Rating (minimum)</InputLabel>
        <Select value={selectedFilters.rating} onChange={handleChangeRating}>
          {/* <MenuItem value={0}>All</MenuItem> */}
          {ratings.map((rating) => (
            <MenuItem key={rating} value={rating}>
              <Rating size="small" precision={1} value={rating} readOnly />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button className={classes.select} onClick={handleClear}>
        Clear Filters
      </Button>
    </Collapse>
  );
};
