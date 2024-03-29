/* eslint-disable react-hooks/exhaustive-deps */
import { ChangeEvent, useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  IconButton,
  TextField,
  DialogActions,
  DialogContent,
  Rating,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Close } from "@mui/icons-material";
import { isEmpty } from "lodash";
import { RecipeAPI } from "../Shared/APIs/RecipeAPI";
import { SnackbarService } from "../Shared/SnackbarService";
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
  const [hover, setHover] = useState(-1);
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
  reloadRecipe: Function;
}

export const RateRecipeDialog = ({
  handleClose,
  recipe,
  open,
  reloadRecipe,
}: RateRecipeDialogProps) => {
  const [score, setScore] = useState(null);
  const [comment, setComment] = useState("");
  const [title, setTitle] = useState(`Leave a review for ${recipe.title}`);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  const getInitialValues = async () => {
    if (!recipe.id) return;
    const prevReview = await RecipeAPI.getUserRecipeReview(
      userEmail(),
      recipe.id
    );
    if (isEmpty(prevReview)) return;
    setTitle(`Update your review for ${recipe.title}`);
    //@ts-ignore
    setScore(prevReview.score);
    //@ts-ignore
    setComment(prevReview.comment);
  };

  useEffect(() => {
    if (open) {
      getInitialValues();
    }
  }, [open]);

  const handleSendRating = async () => {
    if (!score || !recipe.id) return;
    const review: IReview = {
      score: score,
      recipeId: recipe.id,
      reviewerEmail: userEmail(),
      comment: comment,
    };
    await RecipeAPI.reviewRecipe(review);
    SnackbarService.success("Recipe Reviewed successfully");
    reloadRecipe();
    setTimeout(() => handleClose(), 500);
  };
  const disabled = score === null;

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle id="id">
        <Box display="flex" alignItems="center">
          <Box flexGrow={1}>{title}</Box>
          <Box>
            <IconButton onClick={handleClose} size="large">
              <Close />
            </IconButton>
          </Box>
        </Box>
      </DialogTitle>
      <DialogContent>
        <HoverRating value={score} setValue={setScore} />
        <TextField
          margin="dense"
          id="comments"
          label="Comments"
          fullWidth
          value={comment}
          onChange={handleChange}
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
