import { Handler } from "@netlify/functions";
import { supabase } from "../../utils/db";
import { decode } from "../../utils/hashIds";
import { authMiddleware } from "../../utils/middleware";
import middy from "middy";

const getShortname = async (email: string) => {
  const { data } = await supabase
    .from("users")
    .select("firstName, lastName")
    .match({ email })
    .limit(1)
    .single();

  return `${data.firstName} ${data.lastName[0]}`;
};

const getExistingReviewId = async (
  recipe_id,
  user_email
): Promise<number | undefined> => {
  const { data, error } = await supabase.from("reviews").select().match({
    recipe_id,
    user_email,
  });
  if (!data || !data.length) return undefined;
  return data[0].id;
};

const postOneReview: Handler = async (event, context) => {
  const body = JSON.parse(event.body || "");
  const review = body.data.review;

  const shortName = await getShortname(review.reviewerEmail);

  const priorReviewId = await getExistingReviewId(
    decode(review.recipeId),
    review.reviewerEmail
  );

  const reviewToUpdate = {
    user_email: review.reviewerEmail,
    user_name: shortName,
    recipe_id: decode(review.recipeId),
    score: review.score,
    comment: review.comment,
  };
  //@ts-ignore
  if (priorReviewId) reviewToUpdate.id = priorReviewId;

  console.log("reviewToUpdate", reviewToUpdate);

  const { data, error } = await supabase
    .from("reviews")
    .upsert(reviewToUpdate)
    .match({
      recipe_id: reviewToUpdate.recipe_id,
      user_email: reviewToUpdate.user_email,
    });
  console.log("data", data);
  console.log("error", error);

  return {
    statusCode: 200,
    body: JSON.stringify({
      review: data,
      error: error,
    }),
  };
};

exports.handler = middy(postOneReview).use(authMiddleware({}));
