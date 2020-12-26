import React from "react";
import {
  Box,
  Typography,
  makeStyles,
  useMediaQuery,
  useTheme,
} from "@material-ui/core/";

const useStyles = makeStyles((theme) => ({
  directionsLine: {
    marginTop: "10px",
    fontWeight: 500,
    fontSize: "1rem",
    "@media print": {
      fontSize: "1.2rem",
    },
  },
}));

const getLine = (index: number, line: string) => {
  if (!line) return line;
  const val = Math.floor(index / 2 + 1);
  return `${val}. ${line}`;
};

interface props {
  directions?: string;
}

export const DirectionsList = ({ directions }: props) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (!directions) return <div>no directions found</div>;
  const processedDirections = directions.split("\n").map((line, i: number) => {
    return (
      <Typography key={i} className={classes.directionsLine}>
        {getLine(i, line)}
      </Typography>
    );
  });
  return (
    <Box mt="20px" mb="20px">
      <Typography variant={isMobile ? "h5" : "h4"}>Directions</Typography>
      {processedDirections}
    </Box>
  );
};
