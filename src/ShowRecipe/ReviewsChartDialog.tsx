/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import {
  Box,
  Dialog,
  DialogTitle,
  IconButton,
  DialogContent,
  Paper,
  Rating,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { RecipeAPI } from "../Shared/APIs/RecipeAPI";
import { IRecipe, IReview } from "../Shared/Types";
import { Loading } from "../Shared/Components/Loading";
import { useMobileQuery } from "../Shared/Hooks/isMobile";

const ReviewsTable = ({ reviews }: { reviews: IReview[] }) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{ width: "10%" }} align="right">
              Score
            </TableCell>
            <TableCell style={{ width: "10%" }} align="right">
              Name
            </TableCell>
            <TableCell style={{ width: "10%" }} align="right">
              Date
            </TableCell>
            <TableCell style={{ width: "70%" }} align="right">
              Comment
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reviews.map((review) => (
            <TableRow key={review.reviewerName}>
              <TableCell style={{ width: "10%" }} component="th" scope="row">
                <Rating
                  size="small"
                  name="read-only"
                  value={review.score}
                  readOnly
                />
              </TableCell>
              <TableCell style={{ width: "10%" }} align="right">
                {review.reviewerName}
              </TableCell>
              <TableCell style={{ width: "10%" }} align="right">
                {/* 
                //@ts-ignore */}
                {new Date(review.date).toLocaleDateString("en-US")}
              </TableCell>
              <TableCell style={{ width: "70%" }} align="right">
                {review.comment}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

interface RateRecipeDialogProps {
  handleClose: any;
  open: boolean;
  recipe: IRecipe;
}

export const ReviewsChartDialog = ({
  handleClose,
  recipe,
  open,
}: RateRecipeDialogProps) => {
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [loading, setLoading] = useState(true);
  const isMobile = useMobileQuery();

  const handleGetRatings = async () => {
    if (!recipe.id) return;
    const res = await RecipeAPI.getReviews(recipe.id);
    setReviews(res);
    setLoading(false);
  };

  useEffect(() => {
    if (open) handleGetRatings();
  }, [open]);

  return (
    <Dialog
      fullScreen={isMobile}
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle id="recipes-dialog">
        <Box display="flex" alignItems="center">
          <Box flexGrow={1}>{`Reviews for ${recipe.title}`}</Box>
          <Box>
            <IconButton onClick={handleClose} size="large">
              <Close />
            </IconButton>
          </Box>
        </Box>
      </DialogTitle>
      <DialogContent>
        {loading && <Loading />}
        <ReviewsTable reviews={reviews} />
      </DialogContent>
    </Dialog>
  );
};
