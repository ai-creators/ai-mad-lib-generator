export const formatSnakeCase = (text: string): string => {
  return text.split("_").join(" ");
};

export const snakeToTitleCase = (text: string): string => {
  return text
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};
