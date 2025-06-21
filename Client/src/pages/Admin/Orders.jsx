import React, { useEffect, useState } from "react";
import OrdersSummary from "../../components/AdminComponents/OrderComponents/OrdersSummary";
import OrderDetails from "../../components/AdminComponents/OrderComponents/OrderDetails";
import { getAllOrders } from "../../services/orderService";

export default function Orders() {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true)
        const res = await getAllOrders();
        setOrders(res.orders);

      } catch (err) {
        console.error("Failed to fetch orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);


  return <>
    <div className="p-3">
      <OrdersSummary orders={orders} />
    </div>
    <div className="p-3">
      <OrderDetails orders={orders} loading={loading} />
    </div>
  </>;
}