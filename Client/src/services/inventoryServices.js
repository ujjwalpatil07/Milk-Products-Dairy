

export const totalCategories = (fetchedProducts) =>
  new Set(fetchedProducts.map((product) => product.category)).size;

export const totalStock = (fetchedProducts) => {
  return fetchedProducts.reduce((total, product) => {
    return total + Number(product.stock || 0);
  }, 0);
};

export const lowStockCount = (fetchedProducts) => {
  return fetchedProducts.filter((product) => {
    return Number(product.stock) < Number(product.thresholdVal);
  }).length;
};

export const outOfStockProducts = (fetchedProducts) => {
  return fetchedProducts.filter((product) => {
    return Number(product.stock) === 0;
  }).length;
};

export const getExpiryStatusCounts = (fetchedProducts) => {
  const now = new Date();
  let expiringSoonCount = 0;
  let expiredCount = 0;

  fetchedProducts.forEach((product) => {
    const createdDate = new Date(product.createdAt);
    const hoursDiff = (now - createdDate) / (1000 * 60 * 60); 

    if (hoursDiff >= 72) {
      expiredCount++;
    } else if (hoursDiff >= 48) {
      expiringSoonCount++;
    }
  });

  return { expiredCount, expiringSoonCount };
};
