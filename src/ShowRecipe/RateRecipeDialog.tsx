/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  IconButton,
  makeStyles,
  TextField,
  DialogActions,
  DialogContent,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { Rating } from "@material-ui/lab";

import { RecipeAPI } from "../Shared/APIs/RecipeAPI";
import SnackbarService from "../Shared/SnackbarService";
import { IRecipe, IReview } from "../Shared/Types";
import { userEmail } from "../Shared/AppBehaviors";

const labels = {
  null: "",
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};

const useStyles = makeStyles({
  root: {
    width: 200,
    display: "flex",
    alignItems: "center",
  },
});

interface HoverRatingProps {
  value: null | number;
  setValue: Function;
}

const HoverRating = ({ value, setValue }: HoverRatingProps) => {
  const [hover, setHover] = React.useState(-1);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Rating
        name="hover-feedback"
        value={value}
        precision={0.5}
        onChange={(event, newValue) => {
          newValue && setValue(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
      />
      {
        //@ts-ignore
        <Box ml={2}>{labels[hover !== -1 ? hover : value]}</Box>
      }
    </div>
  );
};

interface RateRecipeDialogProps {
  handleClose: any;
  open: boolean;
  recipe: IRecipe;
}

export const RateRecipeDialog = ({
  handleClose,
  recipe,
  open,
}: RateRecipeDialogProps) => {
  const [value, setValue] = useState(null);
  const textFieldRef = useRef();
  //@ts-ignore
  const getCommentValue = () => textFieldRef?.current?.value;

  const handleSendRating = async () => {
    if (!value || !recipe.id) return;
    const review: IReview = {
      score: value,
      recipeId: recipe.id,
      reviewer: userEmail(),
      comment: getCommentValue(),
    };
    await RecipeAPI.reviewRecipe(review);
    SnackbarService.success("Recipe Reviewed successfully");
    setTimeout(() => handleClose(), 1500);
  };
  const disabled = value === null;

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle id="id">
        <Box display="flex" alignItems="center">
          <Box flexGrow={1}>{`Leave a review for ${recipe.title}`}</Box>
          <Box>
            <IconButton onClick={handleClose}>
              <Close />
            </IconButton>
          </Box>
        </Box>
      </DialogTitle>
      <DialogContent>
        <HoverRating value={value} setValue={setValue} />
        <TextField
          margin="dense"
          id="comments"
          label="Comments"
          fullWidth
          inputRef={textFieldRef}
          multiline
          rows={4}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button disabled={disabled} onClick={handleSendRating} color="primary">
          Save Review
        </Button>
      </DialogActions>
    </Dialog>
  );
};
