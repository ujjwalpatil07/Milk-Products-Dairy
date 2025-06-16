export const getAverageRating = (reviews) => {
  if (!reviews || reviews?.length === 0) return 0;

  const total = reviews?.reduce((sum, review) => sum + review?.rating, 0);
  return parseFloat((total / reviews?.length)?.toFixed(1));
};
