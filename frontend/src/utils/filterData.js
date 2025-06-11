export const filterProducts = (products, productId) => {
    if (!productId) return products;

    const keyword = productId.replace(/-/g, " ").toLowerCase();

    return products.filter((product) => {
        const titleMatch = product?.title?.toLowerCase().includes(keyword);
        const descriptionMatch = product?.description?.toLowerCase().includes(keyword);

        const varietyMatch = product?.varieties?.some((variety) =>
            variety?.name?.toLowerCase().includes(keyword)
        );

        return titleMatch || descriptionMatch || varietyMatch;
    });
}
