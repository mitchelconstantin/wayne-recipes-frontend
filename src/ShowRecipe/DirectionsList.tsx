import { Box, Typography } from "@mui/material";
import { useMobileQuery } from "../Shared/Hooks/isMobile";

interface props {
  directions?: string;
}

export const DirectionsList = ({ directions }: props) => {
  const isMobile = useMobileQuery();

  if (!directions) return <div>no directions found</div>;

  const steps = directions.split("\n").filter((line) => line.trim());

  return (
    <Box mt={3} mb={2}>
      <Typography variant={isMobile ? "h5" : "h4"} sx={{ mb: 1.5 }}>
        Directions
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {steps.map((step, i) => (
          <Box key={i} sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
            <Box
              sx={{
                minWidth: 28,
                height: 28,
                borderRadius: "50%",
                backgroundColor: "primary.main",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.8rem",
                fontWeight: 700,
                flexShrink: 0,
                mt: "1px",
              }}
            >
              {i + 1}
            </Box>
            <Typography
              sx={{
                fontSize: "1rem",
                lineHeight: 1.7,
                "@media print": { fontSize: "1.2rem" },
              }}
            >
              {step}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
