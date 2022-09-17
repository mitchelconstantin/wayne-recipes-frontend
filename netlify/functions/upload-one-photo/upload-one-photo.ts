import { UploadApiResponse, v2 } from "cloudinary";
import { Handler } from "@netlify/functions";
import { middy, authMiddleware } from "../../utils/middleware";

v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
  secure: true,
});

const uploadToCloudinary = async (
  image,
  hashId
): Promise<UploadApiResponse> => {
  const env = process.env.IS_LOCAL ? "loc" : "prod";
  const ms = new Date().getTime();
  return new Promise((resolve, reject) => {
    v2.uploader.upload(
      image,
      { public_id: `${hashId}_${env}_${ms}`, secure: true },
      (err, url) => {
        if (err || !url) return reject(err);
        return resolve(url);
      }
    );
  });
};

const uploadOnePhoto: Handler = async (event, context) => {
  const body = JSON.parse(event.body || "");
  const imageToUpload = body.data.image;
  const recipeId = body.data.recipeId;

  const { secure_url } = await uploadToCloudinary(imageToUpload, recipeId);

  return {
    statusCode: 200,
    body: JSON.stringify({
      link: secure_url,
    }),
  };
};

exports.handler = middy(uploadOnePhoto).use(
  authMiddleware({ isAdminRoute: true })
);
