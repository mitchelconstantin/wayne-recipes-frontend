import { Box, Typography } from "@mui/material";
import { useMobileQuery } from "../Shared/Hooks/isMobile";

interface props {
  ingredients?: string;
}

export const IngredientsList = ({ ingredients }: props) => {
  const isMobile = useMobileQuery();

  if (!ingredients) return <div>no ingredients found</div>;

  const processedIngredients = ingredients
    .split("\n")
    .map((line, i: number) => {
      return (
        <Typography
          key={i}
          sx={{
            marginTop: "10px",
            fontWeight: 500,
            fontSize: "1rem",
            "@media print": { fontSize: "1.2rem" },
          }}
        >
          {line}
        </Typography>
      );
    });
  return (
    <Box mt="20px" mb="20px">
      <Typography variant={isMobile ? "h5" : "h4"}>Ingredients</Typography>
      {processedIngredients}
    </Box>
  );
};
