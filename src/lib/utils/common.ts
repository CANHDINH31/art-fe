export const convertUrlImage = (url: string) => {
  if (!url?.includes("http")) {
    return `https://drive.google.com/uc?id=${url}`;
  } else {
    return url;
  }
};
