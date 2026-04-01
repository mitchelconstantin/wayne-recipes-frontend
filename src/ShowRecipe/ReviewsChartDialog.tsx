/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import {
  Box,
  Dialog,
  DialogTitle,
  IconButton,
  DialogContent,
  Divider,
  Rating,
  Typography,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { RecipeAPI } from "../Shared/APIs/RecipeAPI";
import { IRecipe, IReview } from "../Shared/Types";
import { Loading } from "../Shared/Components/Loading";
import { useMobileQuery } from "../Shared/Hooks/isMobile";

const ReviewsTable = ({ reviews }: { reviews: IReview[] }) => {
  if (!reviews.length) return (
    <Typography variant="body2" color="text.secondary">No reviews yet.</Typography>
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {reviews.map((review, i) => (
        <Box key={i} sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Rating size="small" value={review.score} readOnly precision={0.5} />
              <Typography variant="body2" fontWeight={500}>
                {review.reviewerName}
              </Typography>
            </Box>
            <Typography variant="caption" color="text.disabled">
              {new Date(review.date as any).toLocaleDateString("en-US")}
            </Typography>
          </Box>
          {review.comment && (
            <Typography variant="body2" color="text.secondary" sx={{ pl: 0.5 }}>
              {review.comment}
            </Typography>
          )}
          {i < reviews.length - 1 && <Divider sx={{ mt: 1 }} />}
        </Box>
      ))}
    </Box>
  );
};

interface ReviewsChartDialogProps {
  handleClose: any;
  open: boolean;
  recipe: IRecipe;
}

export const ReviewsChartDialog = ({
  handleClose,
  recipe,
  open,
}: ReviewsChartDialogProps) => {
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
    <Dialog fullScreen={isMobile} onClose={handleClose} open={open} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ pr: 6 }}>
        Reviews
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
        {loading ? <Loading /> : <ReviewsTable reviews={reviews} />}
      </DialogContent>
    </Dialog>
  );
};
