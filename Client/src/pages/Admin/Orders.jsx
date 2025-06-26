import React, { useContext, useEffect, useState } from "react";
import OrdersSummary from "../../components/AdminComponents/OrderComponents/OrdersSummary";
import OrderDetails from "../../components/AdminComponents/OrderComponents/OrderDetails";
import { toast } from "react-toastify";
import { AdminAuthContext } from "../../context/AuthProvider";
import {
  getAdminOrders,
  getAllOrders,
  totalActiveOrders,
  totalCanceledOrders,
  totalOrdersCount,
} from "../../services/orderService";

// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

// Animation Variants
const fadeUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const { authAdmin } = useContext(AdminAuthContext);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const res = await getAdminOrders();
        if (res?.success) {
          setOrders(res?.orders);
        } else {
          console.log(res);
        }
      } catch (error) {
        console.log(error);
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
        setLoading(true);
        const res = await getAllOrders();
        if (res?.success) {
          setAllOrders(res?.orders);
        }
      } catch (error) {
        toast.error(
          error?.response?.data?.message ||
          "Failed to fetch orders, please try again!"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAllOrders();
  }, []);

  return (
    <motion.div
      className="p-3"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div variants={fadeUpVariants}>
        <OrdersSummary
          orders={orders}
          totalOrders={totalActiveOrders(orders)}
          totalRecievedOrders={totalOrdersCount(allOrders)}
          totalCanceledOrders={totalCanceledOrders(allOrders)}
        />
      </motion.div>

      <motion.div variants={fadeUpVariants} className="mt-6">
        <OrderDetails orders={orders} loading={loading} />
      </motion.div>
    </motion.div>
  );
}
