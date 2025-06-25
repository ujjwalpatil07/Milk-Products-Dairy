export const getTotalRevenue = (allOrders) => {
  let revenue = 0;

  allOrders.forEach((order) => {
    if (order?.status === "Confirmed") {
      revenue += order?.totalAmount;
    }
  });

  return revenue;
};


export const calculateOrderProfit = (order) => {
  if (order.status !== "Confirmed" || !Array.isArray(order.productsData)) {
    return 0;
  }

  const totalManufacturingCost = order.productsData.reduce((sum, item) => {
    const cost = item.productId?.manufacturingCost || 0;
    const qty  = item.productQuantity   || 0;
    return sum + cost * qty;
  }, 0);

  return order.totalAmount - totalManufacturingCost;
};

export const calculateTotalProfit = (orders) => {
  if (!Array.isArray(orders)) return 0;

  return orders.reduce((acc, order) => {
    // reuse single-order logic
    const profit = calculateOrderProfit(order);
    return acc + profit;
  }, 0);
};


export const topSellingStocks = (products) => {
  if (!Array.isArray(products)) return [];

  const sorted = [...products].sort((a, b) => {
    const qtyA = a.totalQuantitySold || 0;
    const qtyB = b.totalQuantitySold || 0;
    return qtyB - qtyA; // descending
  });

  return sorted;
};

