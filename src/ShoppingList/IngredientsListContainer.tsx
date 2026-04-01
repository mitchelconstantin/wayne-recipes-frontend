import { Box, Checkbox, Typography, FormControlLabel } from "@mui/material";

const isChecked = (line: string) => line.startsWith("<checked>");

const formatLine = (line: string) =>
  isChecked(line) ? <del>{line.slice(9)}</del> : line;

interface ShoppingListLineProps {
  line: string;
  setLine: any;
}

const ShoppingListLine = ({ line, setLine }: ShoppingListLineProps) => {
  const handleCheck = () => {
    if (isChecked(line)) {
      setLine(line.slice(9));
    } else {
      setLine(`<checked>${line}`);
    }
  };
  return (
    <FormControlLabel
      sx={{ marginTop: "10px" }}
      control={
        <Checkbox
          sx={{ color: "#e4673d" }}
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
  const createSetLine = (i: number) => (newLine: string) => {
    const newIngredientsList = [...ingredientsList];
    newIngredientsList.splice(i, 1, newLine);
    setIngredientsList(newIngredientsList);
  };

  return (
    <Box
      sx={{
        marginTop: "20px",
        marginBottom: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "left",
      }}
    >
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
