import React, { useContext, useEffect, useState } from "react";
import OrdersSummary from "../../components/AdminComponents/OrderComponents/OrdersSummary";
import OrderDetails from "../../components/AdminComponents/OrderComponents/OrderDetails";
import { toast } from "react-toastify";
import { AdminAuthContext } from "../../context/AuthProvider"
import { getAdminOrders, getAllOrders, totalActiveOrders, totalCanceledOrders, totalOrdersCount } from "../../services/orderService";

export default function Orders() {

  const [orders, setOrders] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const { authAdmin } = useContext(AdminAuthContext);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true)
        const res = await getAdminOrders();
        if (res?.success) {
          setOrders(res?.orders);
        }else {
          console.log(res);
        }
      } catch {
        toast.error("Failed to fetch orders, please try again!");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [authAdmin?._id]);

  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        setLoading(true)
        const res = await getAllOrders();
        if (res?.success) {
          setAllOrders(res?.orders);
        }
      } catch {
        toast.error("Failed to fetch orders, please try again!");
      } finally {
        setLoading(false);
      }
    };

    fetchAllOrders();
  }, []);


  return <>
    <div className="p-3">
      <OrdersSummary
        orders={orders}
        totalOrders={totalActiveOrders(orders)}
        totalRecievedOrders={totalOrdersCount(allOrders)}
        totalCanceledOrders={totalCanceledOrders(allOrders)}
      />
    </div>

    <div className="p-3">
      <OrderDetails orders={orders} loading={loading} allOrders={allOrders}/>
    </div>
  </>;
}