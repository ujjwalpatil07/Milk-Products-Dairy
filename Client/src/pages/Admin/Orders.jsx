import React, { useContext, useEffect, useState } from "react";
import OrdersSummary from "../../components/AdminComponents/OrderComponents/OrdersSummary";
import OrderDetails from "../../components/AdminComponents/OrderComponents/OrderDetails";
import {
  getAllOrders,
  totalActiveOrders,
  totalCanceledOrders,
  totalOrdersCount,
} from "../../services/orderService";
import { useSnackbar } from 'notistack';
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { AdminOrderContext } from "../../context/AdminOrderProvider";

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
  const { enqueueSnackbar } = useSnackbar();
  const { adminOrders, orderLoading } = useContext(AdminOrderContext);

  const [allOrders, setAllOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        setLoading(true);
        const res = await getAllOrders();
        if (res?.success) {
          setAllOrders(res?.orders);
        }
      } catch (error) {
        console.log(error)
        enqueueSnackbar("Failed to fetch orders", { variant: "error" });
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
          orders={adminOrders}
          totalOrders={totalActiveOrders(adminOrders)}
          totalRecievedOrders={totalOrdersCount(allOrders)}
          totalCanceledOrders={totalCanceledOrders(allOrders)}
        />
      </motion.div>

      <motion.div variants={fadeUpVariants} className="mt-6">
        <OrderDetails orders={adminOrders} loading={orderLoading || loading} />
      </motion.div>
    </motion.div>
  );
}
