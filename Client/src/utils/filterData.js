import { getAverageRating } from "./averageRating";

export const searchProducts = (products, productId) => {
  if (!productId) return products;

  const keyword = productId.replace(/-/g, " ").toLowerCase();

  return products.filter((product) => {
    const titleMatch = product?.title?.toLowerCase().includes(keyword);
    const varietyMatch = product?.varieties?.some((variety) =>
      variety?.name?.toLowerCase().includes(keyword)
    );

    return titleMatch || varietyMatch;
  });
};

export const recommendProducts = (products, productId) => {
  if (!productId) return [];

  const keywords = productId.replace(/-/g, " ").toLowerCase().split(/\s+/);

  const recommendedVarieties = [];

  products.forEach((product) => {
    const descriptionTokens =
      product?.description?.toLowerCase().split(/\s+/) || [];

    product?.varieties?.forEach((variety) => {
      const typeTokens = variety?.type?.toLowerCase().split(/\s+/) || [];
      const unitTokens =
        variety?.quantityUnit?.toLowerCase().split(/\s+/) || [];

      const allTokens = [...typeTokens, ...unitTokens, ...descriptionTokens];

      const hasMatch = keywords.some((kw) => allTokens.includes(kw));

      if (hasMatch) {
        recommendedVarieties.push(variety);
      }
    });
  });

  // Shuffle results
  for (let i = recommendedVarieties.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [recommendedVarieties[i], recommendedVarieties[j]] = [
      recommendedVarieties[j],
      recommendedVarieties[i],
    ];
  }

  return recommendedVarieties;
};

export const getTopVarietiesByReviewsAndLikes = (products) => {
  const allVarieties = [];

  products.forEach((product) => {
    product.varieties.forEach((variety) => {
      const varietyLikes = variety.likes?.length || 0;

      const totalReviewLikes =
        variety.reviews?.reduce((sum, review) => {
          return sum + (review.likes?.length || 0);
        }, 0) || 0;

      const totalScore = varietyLikes + totalReviewLikes;

      allVarieties.push({
        ...variety,
        totalScore,
      });
    });
  });

  allVarieties.sort((a, b) => b.totalScore - a.totalScore);

  return allVarieties;
};

export const sortVarieties = (varieties, filterType) => {
  if (!Array.isArray(varieties)) return [];

  switch (filterType) {
    case "Most Reviews":
      return [...varieties].sort(
        (a, b) => (b.reviews?.length || 0) - (a.reviews?.length || 0)
      );

    case "Most Likes":
      return [...varieties].sort(
        (a, b) => (b?.likes?.length || 0) - (a?.likes?.length || 0)
      );

    case "Price: Low to High":
      return [...varieties].sort((a, b) => a?.price - b?.price);

    case "Price: High to Low":
      return [...varieties].sort((a, b) => b?.price - a?.price);

    case "Sort by: Rating":
      return [...varieties].sort(
        (a, b) => getAverageRating(b.reviews) - getAverageRating(a.reviews)
      );

    default:
      return varieties;
  }
};

export const applySortToFilteredProducts = (products, filterType) => {
  return products.map((product) => ({
    ...product,
    varieties: sortVarieties(product?.varieties, filterType),
  }));
};
