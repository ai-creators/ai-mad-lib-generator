export function isValidAdlib(madlib) {
  const matches = madlib.match(/\[[^\[\]]+\]/g);

  if (matches && matches.length >= 1) {
    for (const match of matches) {
      if (/\[|\]/.test(match)) {
        return false;
      }
    }
    return true;
  }
  return false;
}
