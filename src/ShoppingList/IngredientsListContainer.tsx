import { Box, Checkbox, Typography, FormControlLabel } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  ListItemContainer: {
    marginTop: "20px",
    marginBottom: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "left",
  },
  label: {
    marginTop: "10px",
  },
  checkBox: {
    color: "#e4673d",
  },
}));

const isChecked = (line: string) => line.startsWith("<checked>");

const formatLine = (line: string) =>
  isChecked(line) ? <del>{line.slice(9)}</del> : line;

interface ShoppingListLineProps {
  line: string;
  setLine: any;
}

const ShoppingListLine = ({ line, setLine }: ShoppingListLineProps) => {
  const classes = useStyles();

  const handleCheck = () => {
    if (isChecked(line)) {
      setLine(line.slice(9));
    } else {
      setLine(`<checked>${line}`);
    }
  };
  return (
    <FormControlLabel
      className={classes.label}
      control={
        <Checkbox
          style={{
            color: "#e4673d",
          }}
          checked={isChecked(line)}
          onChange={handleCheck}
        />
      }
      label={formatLine(line)}
    />
  );
};

interface IngredientsListProps {
  ingredientsList: string[];
  setIngredientsList: Function;
  title: string;
}

export const IngredientsListContainer = ({
  ingredientsList,
  setIngredientsList,
  title,
}: IngredientsListProps) => {
  const classes = useStyles();

  const createSetLine = (i: number) => (newLine: string) => {
    const newIngredientsList = [...ingredientsList];
    newIngredientsList.splice(i, 1, newLine);
    setIngredientsList(newIngredientsList);
  };

  return (
    <Box className={classes.ListItemContainer}>
      <Typography variant="h6">{title}</Typography>
      {ingredientsList.map((ingredientLine: string, i: number) => {
        return (
          <ShoppingListLine
            key={i}
            line={ingredientLine}
            setLine={createSetLine(i)}
          />
        );
      })}
    </Box>
  );
};
