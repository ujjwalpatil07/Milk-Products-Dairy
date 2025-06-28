import React, { useState, useEffect } from "react";
import PropTypes from "prop-types"
import { socket } from "../../../../socket/socket";
import { useSnackbar } from 'notistack';

export default function RemoveModel({ setRemoveModel, selectedProduct }) {
  const { enqueueSnackbar } = useSnackbar();
  const [isRemoving, setIsRemoving] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setRemoveModel(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [setRemoveModel]);

  useEffect(() => {
    socket.on("remove-product:failed", (data) => {
      enqueueSnackbar(data?.message, { variant: "error" });
      setIsRemoving(false);
    })

    socket.on("remove-product:from-inventory", (data) => {
      enqueueSnackbar(data?.message, { variant: "success" });
      setRemoveModel(false);
      setIsRemoving(false)
    })

    return () => {
      socket.off("remove-product:failed")
      socket.off("remove-product:from-inventory")
    }
  }, [setRemoveModel, enqueueSnackbar])

  const handleRemoveProduct = async () => {
    setIsRemoving(true);

    if (!selectedProduct) {
      return ("No any product selected")
    }

    socket.emit("remove-product", { productId: selectedProduct?._id })
  }

  return (
    <div
      className="bg-white dark:bg-black/80 p-3">

      <h2 className="text-xl sm:text-2xl font-semibold text-center mb-4 text-gray-800 dark:text-gray-100">
        Do you want to remove this product?
      </h2>

      <div className="bg-gray-100 dark:bg-gray-500/20 p-4 rounded mb-4 text-gray-800 dark:text-gray-200 shadow-sm space-y-2">
        {[
          { label: "Name", value: selectedProduct?.name },
          { label: "Category", value: selectedProduct?.category },
          { label: "Stock", value: selectedProduct?.stock },
          { label: "Price", value: `₹${selectedProduct?.price}` },
        ].map(({ label, value }, idx) => (
          <div key={idx * 0.99} className="flex justify-between border-b border-gray-300/50 dark:border-gray-600/30 pb-1 last:border-none">
            <span className="font-medium">{label}:</span>
            <span className="text-right">{value || "--"}</span>
          </div>
        ))}
      </div>


      <div className="flex justify-between gap-4">
        <button
          className="flex-1 py-2 border border-blue-600 text-blue-600 font-semibold rounded hover:bg-blue-600/10 dark:hover:text-white transition-all duration-300"
          onClick={() => {
            setRemoveModel(false)
          }}
        >
          Cancel
        </button>
        <button
          onClick={() => {
            handleRemoveProduct()
          }}
          className="flex-1 py-2 border border-red-600 text-red-600 font-semibold rounded hover:bg-red-600/10 dark:hover:text-white transition-all duration-300"
        >
          {isRemoving ? "Removing..." : "Remove"}
        </button>
      </div>
    </div>
  );
}

RemoveModel.propTypes = {
  setRemoveModel: PropTypes.func.isRequired,
  selectedProduct: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    category: PropTypes.string,
    stock: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
};