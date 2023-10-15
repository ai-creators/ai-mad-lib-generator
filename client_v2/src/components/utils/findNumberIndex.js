export function findNumberIndex(str) {
  const regex = /\d+/;
  const match = regex.exec(str);
  if (match) {
    return match.index;
  }
  return null;
}
