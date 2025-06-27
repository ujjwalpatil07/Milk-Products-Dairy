import React, { useState, useEffect, useRef } from "react";
import { removeProduct } from "../../../../services/productServices"
import { toast } from "react-toastify";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import PropTypes from "prop-types"


export default function RemoveModel({ setRemoveModel, selectedProduct }) {

  const [isRemoving, setIsRemoving] = useState(false)

  const modelRef = useRef()
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modelRef.current && !modelRef.current.contains(event.target)) {
        setRemoveModel(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setRemoveModel]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setRemoveModel(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [setRemoveModel]);

  const handleRemoveProduct = async () => {
    setIsRemoving(true);
    try {

      const res = await removeProduct(selectedProduct?._id)

      if (res?.success) {
        toast.success("Product removed successfully")
      } else {
        toast.error("Error while removing product")
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsRemoving(false);
      setRemoveModel(false);
    }

  }
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm px-4  flex flex-col items-center justify-center overflow-auto">
      <motion.div
        ref={modelRef}
        initial={{ scale: 0.9, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 50 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="bg-white dark:bg-gray-500/20 rounded-2xl shadow-2xl w-full max-w-md p-6 sm:p-8 animate-fadeIn scale-95 animate-scaleIn">

        <h2 className="text-xl sm:text-2xl font-semibold text-center mb-4 text-gray-800 dark:text-gray-100">
          Do you want to remove this product?
        </h2>

        <div className="text-sm sm:text-base bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-6 text-gray-700 dark:text-gray-200">
          <p><span className="font-medium">Name:</span> {selectedProduct?.name}</p>
          <p><span className="font-medium">Category:</span> {selectedProduct?.category}</p>
          <p><span className="font-medium">Stock:</span> {selectedProduct?.stock}</p>
          <p><span className="font-medium">Price:</span> {selectedProduct?.price}</p>
        </div>

        <div className="flex justify-between gap-4">
          <button
            className="flex-1 py-2 border border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            className="flex-1 py-2 border border-red-600 text-red-600 font-semibold rounded-lg hover:bg-red-600 hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            {isRemoving ? "Removing..." : "Remove"}
          </button>
        </div>
      </motion.div>
    </motion.div>
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