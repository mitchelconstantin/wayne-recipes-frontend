export const buildCloudinaryUrl = (
  picture: string,
  transforms: string
): string => {
  const [baseUrl, imageId] = picture.split("upload");
  return `${baseUrl}upload/${transforms}${imageId}`;
};

export const cardImageUrl = (picture: string) =>
  buildCloudinaryUrl(picture, "ar_1:1,w_300,h_300,c_fill,g_auto,q_auto,f_auto");

export const displayImageUrl = (picture: string) =>
  buildCloudinaryUrl(picture, "w_800,q_auto,f_auto");
