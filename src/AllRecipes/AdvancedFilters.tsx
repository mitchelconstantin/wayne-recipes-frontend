/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, ChangeEvent } from "react";
import {
  MenuItem,
  InputLabel,
  Select,
  Collapse,
  FormControl,
  Grid,
  Box,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { Star } from "@mui/icons-material";
import { RecipeAPI } from "../Shared/APIs/RecipeAPI";
import { emptyFilterOptions, emptyFilters, IFilters } from "../Shared/Types";
import { grey } from "@mui/material/colors";

const menuPaperSx = { maxHeight: 300, maxWidth: 200 };

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

  const handleRatingChange = (_: any, value: string | null) => {
    setSelectedFilters((prev: any) => ({
      ...prev,
      rating: value === null ? "" : Number(value),
    }));
  };

  const { mainIngredients, regions, types, sources } = allFilters;

  return (
    <Collapse in={expanded}>
      <Box
        sx={{
          width: { xs: "90%", sm: "80%", md: "70%", lg: "60%" },
          mx: "auto",
          mb: 1.5,
          p: 1.5,
          borderRadius: "12px",
          backgroundColor: (theme) =>
            theme.palette.mode === "dark" ? grey[800] : grey[50],
          border: (theme) =>
            `1.5px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]}`,
        }}
      >
        <Grid container spacing={1.5}>
          <Grid size={{ xs: 6 }}>
            <FormControl fullWidth size="small">
              <InputLabel sx={{ fontSize: "0.8rem" }}>Main Ingredient</InputLabel>
              <Select
                value={selectedFilters.mainIngredient}
                name="mainIngredient"
                label="Main Ingredient"
                //@ts-ignore
                onChange={handleChange}
                MenuProps={{ PaperProps: { sx: menuPaperSx } }}
              >
                <MenuItem value="">All</MenuItem>
                {mainIngredients.map((mi) => (
                  <MenuItem key={mi} value={mi}>{mi}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 6 }}>
            <FormControl fullWidth size="small">
              <InputLabel sx={{ fontSize: "0.8rem" }}>Region</InputLabel>
              <Select
                value={selectedFilters.region}
                name="region"
                label="Region"
                //@ts-ignore
                onChange={handleChange}
                MenuProps={{ PaperProps: { sx: menuPaperSx } }}
              >
                <MenuItem value="">All</MenuItem>
                {regions.map((region) => (
                  <MenuItem key={region} value={region}>{region}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 6 }}>
            <FormControl fullWidth size="small">
              <InputLabel sx={{ fontSize: "0.8rem" }}>Type</InputLabel>
              <Select
                value={selectedFilters.type}
                name="type"
                label="Type"
                //@ts-ignore
                onChange={handleChange}
                MenuProps={{ PaperProps: { sx: menuPaperSx } }}
              >
                <MenuItem value="">All</MenuItem>
                {types.map((type) => (
                  <MenuItem key={type} value={type}>{type}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 6 }}>
            <FormControl fullWidth size="small">
              <InputLabel sx={{ fontSize: "0.8rem" }}>Source</InputLabel>
              <Select
                value={selectedFilters.source}
                name="source"
                label="Source"
                //@ts-ignore
                onChange={handleChange}
                MenuProps={{ PaperProps: { sx: menuPaperSx } }}
              >
                <MenuItem value="">All</MenuItem>
                {sources.map((source) => (
                  <MenuItem key={source} value={source}>{source}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
              <Typography variant="caption" color="text.secondary">
                Min rating
              </Typography>
              <ToggleButtonGroup
                value={selectedFilters.rating ? String(selectedFilters.rating) : null}
                exclusive
                onChange={handleRatingChange}
                size="small"
                fullWidth
                sx={{ "& .MuiToggleButtonGroup-grouped": { border: "1px solid", borderRadius: "8px !important", borderColor: "divider" } }}
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <ToggleButton
                    key={n}
                    value={String(n)}
                    sx={{
                      px: 1,
                      py: 0.25,
                      gap: 0.25,
                      fontSize: "0.75rem",
                      "&.Mui-selected": { backgroundColor: "primary.main", color: "white", "&:hover": { backgroundColor: "primary.dark" } },
                    }}
                  >
                    {n}<Star sx={{ fontSize: "0.8rem" }} />
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Collapse>
  );
};
