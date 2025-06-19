export const getCartProductDetails = (cartItems, products) => {
  const productMap = new Map();

  for (const product of products) {
    productMap.set(product._id?.toString(), {
      ...product,
    });
  }

  return cartItems
    .map((item) => {
      const product = productMap.get(item.productId);
      if (!product) return null;

      return {
        id: product._id,
        name: product.name,
        image: product.image?.[0] || "",
        price: product.price,
        selectedQuantity: item.quantity,
        quantityUnit: product.quantityUnit,
        type: product.type,
        stock: product.stock,
      };
    })
    .filter(Boolean);
};
