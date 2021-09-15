import { useContainerStyles } from "../Shared/formStyles";
import { TextField } from "@mui/material";
import Autocomplete from '@mui/material/Autocomplete';
interface props {
  handleChange: any;
  items: string[];
  value: string;
  title: string;
}

export const Dropdown = ({ handleChange, items, value, title }: props) => {
  const classes = useContainerStyles();
  return (
    <Autocomplete
      options={items}
      value={value}
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      onChange={handleChange}
      freeSolo
      autoSelect
      renderInput={(params) => (
        <TextField
          {...params}
          label={title}
          className={classes.formTextField}
        />
      )}
    />
  );
};
