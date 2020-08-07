export const shuffleArray = <T>(array: T[]): T[] =>
  [...array].sort(() => Math.random() - 0.5);

export const getPercentage = (score: number, total: number): number => {
  const divided = score / total;
  return divided * 100;
};
