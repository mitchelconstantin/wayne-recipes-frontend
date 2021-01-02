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
  Grid,
} from "@material-ui/core";
import { RecipeAPI } from "../Shared/APIs/RecipeAPI";
import { emptyFilterOptions, emptyFilters, IFilters } from "../Shared/Types";
import { Rating } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: "100%",
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

  const handleChange = (e: React.ChangeEvent<any>) => {
    setSelectedFilters((prev: any) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleClear = () => {
    const debouncedSearchTerm = selectedFilters.debouncedSearchTerm;
    setSelectedFilters({ ...emptyFilters, debouncedSearchTerm });
  };

  const { mainIngredients, regions, types, sources, ratings } = allFilters;

  return (
    <Collapse in={expanded}>
      <Grid
        container
        justify="space-around"
        alignItems="center"
        style={{ paddingBottom: "16px" }}
        spacing={5}
      >
        <Grid xs={5} md={4} item>
          <FormControl className={classes.formControl}>
            <InputLabel>Main Ingredient</InputLabel>
            <Select
              value={selectedFilters.mainIngredient}
              name="mainIngredient"
              onChange={handleChange}
            >
              {/* <MenuItem value={""}>All</MenuItem> */}
              {mainIngredients.map((mi) => (
                <MenuItem key={mi} value={mi}>
                  {mi || "All"}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid xs={5} md={4} item>
          <FormControl className={classes.formControl}>
            <InputLabel>Region</InputLabel>
            <Select
              value={selectedFilters.region}
              name="region"
              onChange={handleChange}
            >
              {regions.map((region) => (
                <MenuItem key={region} value={region}>
                  {region || "All"}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid xs={5} md={4} item>
          <FormControl className={classes.formControl}>
            <InputLabel>Recipe Type</InputLabel>
            <Select
              value={selectedFilters.type}
              name="type"
              onChange={handleChange}
            >
              <MenuItem value={""}>All</MenuItem>
              {types.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid xs={5} md={4} item>
          <FormControl className={classes.formControl}>
            <InputLabel>Source</InputLabel>
            <Select
              value={selectedFilters.source}
              name="source"
              onChange={handleChange}
            >
              {sources.map((source) => (
                <MenuItem key={source} value={source}>
                  {source || "All"}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid xs={5} md={4} item>
          <FormControl className={classes.formControl}>
            <InputLabel>Rating (minimum)</InputLabel>
            <Select
              value={selectedFilters.rating}
              name="rating"
              onChange={handleChange}
            >
              {ratings.map((rating) => (
                <MenuItem key={rating} value={rating}>
                  <Rating size="small" precision={1} value={rating} readOnly />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid xs={5} md={4} item>
          <Button className={classes.formControl} onClick={handleClear}>
            Clear Filters
          </Button>
        </Grid>
      </Grid>
    </Collapse>
  );
};
