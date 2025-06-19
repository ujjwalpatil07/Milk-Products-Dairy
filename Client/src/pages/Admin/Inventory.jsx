import React from "react";
import OverallInventory from "../../components/AdminComponents/InventoryComponents/OverallInventory";
import ProductsList from "../../components/AdminComponents/InventoryComponents/ProductsList";

export default function Inventory() {
  return (
    <>
      <div className="p-3">
        <OverallInventory />
      </div>
      <div className="p-3">
        <ProductsList />
      </div>
    </>
  );
}
