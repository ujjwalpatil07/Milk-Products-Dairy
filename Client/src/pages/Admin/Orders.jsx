import React, { useContext, useEffect, useState } from "react";
import OrdersSummary from "../../components/AdminComponents/OrderComponents/OrdersSummary";
import OrderDetails from "../../components/AdminComponents/OrderComponents/OrderDetails";
import { toast } from "react-toastify";
import { AdminAuthContext } from "../../context/AuthProvider"
import axios from "axios";

export default function Orders() {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const {authAdmin} = useContext(AdminAuthContext);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true)
        const res = await axios.get("http://localhost:9000/order/pending-orders");
        if(res?.data?.success) {
          setOrders(res?.data?.orders);
        }
      } catch {
        toast.error("Failed to fetch orders, please try again!");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [authAdmin?._id]);


  return <>
    <div className="p-3">
      <OrdersSummary orders={orders} />
    </div>
    <div className="p-3">
      <OrderDetails orders={orders} loading={loading} />
    </div>
  </>;
}