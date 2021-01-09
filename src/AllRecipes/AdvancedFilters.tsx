/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, ChangeEvent } from "react";
import {
  MenuItem,
  InputLabel,
  Select,
  Collapse,
  FormControl,
  Grid,
  makeStyles,
} from "@material-ui/core";
import { RecipeAPI } from "../Shared/APIs/RecipeAPI";
import { emptyFilterOptions, emptyFilters, IFilters } from "../Shared/Types";
import { Rating } from "@material-ui/lab";
import { useMobileQuery } from "../Shared/Hooks/isMobile";

const useStyles = makeStyles((theme) => ({
  menuPaper: {
    maxHeight: 300,
    maxWidth: 200,
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
  const [allFilters, setAllFilters] = useState(emptyFilterOptions);
  const classes = useStyles();
  const isMobile = useMobileQuery();

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

  const handleChange = (e: ChangeEvent<any>) => {
    setSelectedFilters((prev: any) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const { mainIngredients, regions, types, sources, ratings } = allFilters;
  return (
    <Collapse in={expanded}>
      <Grid
        style={{ width: isMobile ? undefined : "60vw", paddingBottom: "8px" }}
        direction="row"
        alignItems="center"
        justify="center"
        container
        spacing={isMobile ? 1 : 3}
      >
        <Grid xs={6} md={4} item>
          <FormControl fullWidth>
            <InputLabel>Main Ingredient</InputLabel>
            <Select
              value={selectedFilters.mainIngredient}
              name="mainIngredient"
              onChange={handleChange}
              MenuProps={{ classes: { paper: classes.menuPaper } }}
            >
              {mainIngredients.map((mi) => (
                <MenuItem key={mi} value={mi}>
                  {mi || "All"}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid xs={6} md={4} item>
          <FormControl fullWidth>
            <InputLabel>Region</InputLabel>
            <Select
              value={selectedFilters.region}
              name="region"
              onChange={handleChange}
              MenuProps={{ classes: { paper: classes.menuPaper } }}
            >
              {regions.map((region) => (
                <MenuItem key={region} value={region}>
                  {region || "All"}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid xs={6} md={4} item>
          <FormControl fullWidth>
            <InputLabel>Recipe Type</InputLabel>
            <Select
              value={selectedFilters.type}
              name="type"
              onChange={handleChange}
              MenuProps={{ classes: { paper: classes.menuPaper } }}
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
        <Grid xs={6} md={4} item>
          <FormControl fullWidth>
            <InputLabel>Source</InputLabel>
            <Select
              value={selectedFilters.source}
              name="source"
              onChange={handleChange}
              MenuProps={{ classes: { paper: classes.menuPaper } }}
            >
              {sources.map((source) => (
                <MenuItem key={source} value={source}>
                  {source || "All"}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid xs={6} md={4} item>
          <FormControl fullWidth>
            <InputLabel>Rating (minimum)</InputLabel>
            <Select
              value={selectedFilters.rating}
              name="rating"
              onChange={handleChange}
              MenuProps={{ classes: { paper: classes.menuPaper } }}
            >
              {ratings.map((rating) => (
                <MenuItem key={rating} value={rating}>
                  <Rating size="small" precision={1} value={rating} readOnly />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Collapse>
  );
};
