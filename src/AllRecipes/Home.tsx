/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useCallback, ChangeEvent } from "react";
import {
  Box,
  Paper,
  Divider,
  IconButton,
  InputBase,
  Tooltip,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { IRecipe, emptyFilters } from "../Shared/Types";
import { RecipeAPI } from "../Shared/APIs/RecipeAPI";
import { AdvancedFilters } from "./AdvancedFilters";
import { RecipeList } from "./RecipeList";
import { RecipeTransform } from "./RecipeTransform";
import { ShowFiltersChip } from "./ShowFiltersChip";
import { useNavigate, useLocation } from "react-router-dom";
import { isEqual, debounce, isEmpty } from "lodash";
import { grey } from "@mui/material/colors";
import { getLocalRecipes, storeLocalRecipes } from "../Shared/AppBehaviors";


export const Home = () => {
  const [recipes, setRecipes] = useState<IRecipe[]>(getLocalRecipes());
  const [filteredRecipes, setFilteredRecipes] = useState<IRecipe[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedFilters, setSelectedFilters] = useState(emptyFilters);
  const [searchTerm, setSearchTerm] = useState("");
  const [filtersExpanded, setFiltersExpanded] = useState(false);
  useEffect(() => {
    RecipeAPI.getAllRecipes().then((recipes) => {
      storeLocalRecipes(recipes);
      setRecipes(recipes);
      setFilteredRecipes(recipes);
      setLoading(false);
      if (location.state) {
        setSelectedFilters(location.state as any);
        setSearchTerm((location.state as any).debouncedSearchTerm);
        if (
          (location.state as any).mainIngredient ||
          (location.state as any).region ||
          (location.state as any).type ||
          (location.state as any).source ||
          (location.state as any).rating
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
      navigate("/all", { state: selectedFilters });
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

  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
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
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: (theme) => theme.palette.mode === "dark" ? grey[900] : "white",
        }}
      >
        <Box
          sx={{
            margin: 1,
            marginTop: { xs: 2 },
            display: "flex",
            alignItems: "center",
            minWidth: "40%",
            maxWidth: "60vw",
            borderRadius: "25px",
            backgroundColor: (theme) => theme.palette.mode === "dark" ? grey[800] : "#DFE1E5",
          }}
        >
          <InputBase
            sx={{ marginLeft: 2, flex: 1 }}
            placeholder="Search Recipes"
            inputProps={{ "aria-label": "search" }}
            value={searchTerm}
            onChange={handleChangeInput}
          />
          {!isPristine && (
            <Tooltip title="Clear Search Term and Filters">
              <IconButton
                type="submit"
                sx={{ padding: "10px" }}
                onClick={clearInput}
                aria-label="search"
                size="large"
              >
                <Close />
              </IconButton>
            </Tooltip>
          )}
          <Divider sx={{ height: 28, margin: "4px" }} orientation="vertical" />
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
      <RecipeList loading={isEmpty(recipes)} recipes={filteredRecipes} />
    </>
  );
};
