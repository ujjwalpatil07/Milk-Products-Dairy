export const getCartProductDetails = (cartItems, products) => {
  const varietyMap = new Map();

  for (const product of products) {
    for (const variety of product.varieties || []) {
      varietyMap.set(variety.name, {
        ...variety,
      });
    }
  }

  return cartItems
    .map((item) => {
      const variety = varietyMap.get(item.productId);
      if (!variety) return null;

      return {
        name: variety.name,
        image: variety.image?.[0] || "",
        price: variety.price,
        selectedQuantity: item.quantity,
        quantityUnit: variety.quantityUnit,
        type: variety.type,
        stock: variety.stock,
      };
    })
    .filter(Boolean);
};
