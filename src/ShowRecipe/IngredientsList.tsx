import { Box, Typography } from "@mui/material";
import { useMobileQuery } from "../Shared/Hooks/isMobile";

interface props {
  ingredients?: string;
}

export const IngredientsList = ({ ingredients }: props) => {
  const isMobile = useMobileQuery();

  if (!ingredients) return <div>no ingredients found</div>;

  const lines = ingredients.split("\n").filter((line) => line.trim());

  return (
    <Box mt={3} mb={2}>
      <Typography variant={isMobile ? "h5" : "h4"} sx={{ mb: 1.5 }}>
        Ingredients
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
        {lines.map((line, i) => (
          <Box key={i} sx={{ display: "flex", alignItems: "baseline", gap: 1.5 }}>
            <Box
              sx={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                backgroundColor: "primary.main",
                flexShrink: 0,
                mt: "2px",
              }}
            />
            <Typography
              sx={{
                fontSize: "1rem",
                lineHeight: 1.6,
                "@media print": { fontSize: "1.2rem" },
              }}
            >
              {line}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
