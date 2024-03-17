export const convertUrlImage = (url: string) => {
  if (!url?.includes("http")) {
    return `https://drive.google.com/thumbnail?id=${url}`;
  } else {
    return url;
  }
};
