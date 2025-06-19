import React from "react";
import OrdersSummary from "../../components/AdminComponents/OrderComponents/OrdersSummary";
import OrderDetails from "../../components/AdminComponents/OrderComponents/OrderDetails";

export default function Orders() {
  return <>
        <div className="p-3">
          <OrdersSummary/>
        </div>
        <div className="p-3">
          <OrderDetails/>
        </div>
      </>;
}
