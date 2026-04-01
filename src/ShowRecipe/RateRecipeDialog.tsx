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
  Divider,
  Rating,
  Typography,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { isEmpty } from "lodash";
import { RecipeAPI } from "../Shared/APIs/RecipeAPI";
import { SnackbarService } from "../Shared/SnackbarService";
import { IRecipe, IReview } from "../Shared/Types";
import { userEmail } from "../Shared/AppBehaviors";

const labels: Record<string, string> = {
  "0.5": "Useless",
  "1": "Useless+",
  "1.5": "Poor",
  "2": "Poor+",
  "2.5": "Ok",
  "3": "Ok+",
  "3.5": "Good",
  "4": "Good+",
  "4.5": "Excellent",
  "5": "Excellent+",
};

interface HoverRatingProps {
  value: null | number;
  setValue: Function;
}

const HoverRating = ({ value, setValue }: HoverRatingProps) => {
  const [hover, setHover] = useState(-1);
  const activeValue = hover !== -1 ? hover : value;
  const label = activeValue ? labels[String(activeValue)] : "";

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
      <Rating
        name="hover-feedback"
        value={value}
        precision={0.5}
        onChange={(_, newValue) => { newValue && setValue(newValue); }}
        onChangeActive={(_, newHover) => { setHover(newHover); }}
      />
      {label && (
        <Typography variant="body2" color="text.secondary">
          {label}
        </Typography>
      )}
    </Box>
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
  const [isUpdate, setIsUpdate] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  const getInitialValues = async () => {
    if (!recipe.id) return;
    const prevReview = await RecipeAPI.getUserRecipeReview(userEmail(), recipe.id);
    if (isEmpty(prevReview)) return;
    setIsUpdate(true);
    //@ts-ignore
    setScore(prevReview.score);
    //@ts-ignore
    setComment(prevReview.comment);
  };

  useEffect(() => {
    if (open) getInitialValues();
  }, [open]);

  const handleSendRating = async () => {
    if (!score || !recipe.id) return;
    const review: IReview = {
      score,
      recipeId: recipe.id,
      reviewerEmail: userEmail(),
      comment,
    };
    await RecipeAPI.reviewRecipe(review);
    SnackbarService.success("Recipe reviewed successfully");
    reloadRecipe();
    setTimeout(() => handleClose(), 500);
  };

  return (
    <Dialog onClose={handleClose} open={open} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ pr: 6 }}>
        {isUpdate ? `Update your review` : `Leave a review`}
        <IconButton
          onClick={handleClose}
          size="small"
          sx={{ position: "absolute", right: 12, top: 12, color: "text.secondary" }}
        >
          <Close fontSize="small" />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent sx={{ pt: 2 }}>
        <HoverRating value={score} setValue={setScore} />
        <TextField
          margin="dense"
          label="Comments"
          fullWidth
          value={comment}
          onChange={handleChange}
          multiline
          rows={4}
          size="small"
        />
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={handleClose} color="inherit">
          Cancel
        </Button>
        <Button disabled={score === null} onClick={handleSendRating} variant="contained">
          Save Review
        </Button>
      </DialogActions>
    </Dialog>
  );
};
