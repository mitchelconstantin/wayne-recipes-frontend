import {
  Box,
  Checkbox,
  Divider,
  FormControlLabel,
  Typography,
} from "@mui/material";

const isChecked = (line: string) => line.startsWith("<checked>");

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
      sx={{
        mt: 0.5,
        color: isChecked(line) ? "text.disabled" : "text.primary",
      }}
      control={
        <Checkbox
          color="primary"
          checked={isChecked(line)}
          onChange={handleCheck}
          size="small"
        />
      }
      label={
        <Typography
          variant="body2"
          sx={{ textDecoration: isChecked(line) ? "line-through" : "none" }}
        >
          {isChecked(line) ? line.slice(9) : line}
        </Typography>
      }
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

  const total = ingredientsList.filter((l) => l.trim()).length;
  const checked = ingredientsList.filter((l) => isChecked(l)).length;

  return (
    <Box sx={{ mb: 3 }}>
      <Box sx={{ display: "flex", alignItems: "baseline", gap: 1, mb: 1 }}>
        <Typography variant="subtitle1" fontWeight={600}>
          {title}
        </Typography>
        {total > 0 && (
          <Typography variant="caption" color="text.disabled">
            {checked}/{total}
          </Typography>
        )}
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        {ingredientsList.map((ingredientLine: string, i: number) => {
          if (!ingredientLine.trim()) return null;
          return (
            <ShoppingListLine
              key={i}
              line={ingredientLine}
              setLine={createSetLine(i)}
            />
          );
        })}
      </Box>
      <Divider sx={{ mt: 2, "@media print": { display: "none" } }} />
    </Box>
  );
};
