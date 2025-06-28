
import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import UpdateProductModel from './Models/UpdateProductModel';
import AddProductModel from "./Models/AddProductModel"
import RemoveModel from './Models/RemoveModel';
import { SidebarContext } from '../../../context/SidebarProvider';
import { FilterIcon } from 'lucide-react';
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// Animation variants
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const rowVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
};

export default function ProductsList({ products, loading }) {

  const { navbarInput, highlightMatch } = useContext(SidebarContext)
  const [addModel, setAddModel] = useState(false);
  const [updateModel, setUpdateModel] = useState(false);
  const [removeModel, setRemoveModel] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [productList, setProductList] = useState(products || []);
  const [filterType, setFilterType] = useState('Filter');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);


  useEffect(() => {
    setProductList(products || []);
  }, [products]);

  const filterOptions = [
    { label: "Price: Low to High", value: "priceLowToHigh" },
    { label: "Price: High to Low", value: "priceHighToLow" },
    { label: "Quantity: Low to High", value: "quantityLowToHigh" },
    { label: "Quantity: High to Low", value: "quantityHighToLow" },
    { label: "Name: A to Z", value: "alphabeticalAZ" },
    { label: "Name: Z to A", value: "alphabeticalZA" },
    { label: "Sold: Low to High", value: "soldLowToHigh" },
    { label: "Sold: High to Low", value: "soldHighToLow" },
    { label: "Clear", value: "Filter" },
  ];

  const handleFilter = (type) => {
    setFilterType(type);

    let sortedProducts = [...products];

    switch (type) {
      case 'priceLowToHigh':
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case 'priceHighToLow':
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case 'quantityLowToHigh':
        sortedProducts.sort((a, b) => a.stock - b.stock);
        break;
      case 'quantityHighToLow':
        sortedProducts.sort((a, b) => b.stock - a.stock);
        break;
      case 'alphabeticalAZ':
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'alphabeticalZA':
        sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'soldLowToHigh':
        sortedProducts.sort((a, b) => (a.totalQuantitySold || 0) - (b.totalQuantitySold || 0));
        break;
      case 'soldHighToLow':
        sortedProducts.sort((a, b) => (b.totalQuantitySold || 0) - (a.totalQuantitySold || 0));
        break;
      default:
        sortedProducts = products;
    }

    setProductList(sortedProducts);
  };

  let content;
  if ((!addModel && !updateModel && !removeModel) && loading) {
    content = (
      <div className="flex items-center justify-center h-[50vh] text-gray-600 dark:text-white gap-3">
        <div className="w-8 h-8 border-4 border-dashed rounded-full animate-spin border-[#843E71]"></div>
        <span className="text-xl">Loading products...</span>
      </div>
    );
  } else if (!products || products.length === 0) {
    content = (
      <div className="text-center text-gray-500 dark:text-gray-300 py-4">
        No products found.
      </div>
    );
  } else {
    content = (
      <>
        <div className="overflow-x-auto">
          {products.length === 0 ? (
            <div className="text-center py-10 text-gray-600 dark:text-gray-300">
              <p className="text-lg font-medium">No products found.</p>
              <p className="text-sm mt-2">Add a new product to get started.</p>
            </div>
          ) : (
            <table className="min-w-full text-left border-collapse">
              <thead>
                <tr className="border-b text-gray-600 dark:text-gray-300">
                  <th className="pb-3 px-3 whitespace-nowrap">Products</th>
                  <th className="pb-3 px-3 whitespace-nowrap">Selling Price</th>
                  <th className="pb-3 px-3 whitespace-nowrap">Quantity</th>
                  <th className="pb-3 px-3 whitespace-nowrap">Threshold Value</th>
                  <th className="pb-3 px-3 whitespace-nowrap">Category</th>
                  <th className="pb-3 px-3 whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <motion.tbody
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {productList.map((product, index) => {
                  const isLowStock = product.stock < product.thresholdVal;

                  return (
                    <motion.tr
                      key={product._id || index}
                      variants={rowVariants}
                      className={`border-b hover:bg-gray-50 dark:hover:bg-gray-700 ${isLowStock ? "bg-red-100 dark:bg-red-800/30 animate-pulse" : ""
                        }`}
                    >
                      <td className="py-2 px-3 font-medium text-gray-700 dark:text-white">
                        {highlightMatch(product.name, navbarInput)}
                      </td>
                      <td className="py-2 px-3 whitespace-nowrap">₹ {product.price}</td>
                      <td className="py-2 px-3 whitespace-nowrap">
                        {product.stock} {product.quantityUnit}
                      </td>
                      <td className="py-2 px-3 whitespace-nowrap">
                        {product.thresholdVal} {product.quantityUnit}
                      </td>
                      <td className="py-2 px-3 whitespace-nowrap">{product.category}</td>
                      <td className="py-2 px-3 whitespace-nowrap">
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setSelectedProduct(product);
                              setUpdateModel(true);
                            }}
                            className="text-sm bg-green-200 text-black dark:bg-blue-800/40 dark:hover:bg-blue-800/50 dark:text-white px-3 py-1 rounded-md hover:bg-green-300/80"
                          >
                            Update
                          </button>
                          <button
                            onClick={() => {
                              setSelectedProduct(product);
                              setRemoveModel(true);
                            }}
                            className="text-sm bg-red-200 text-black dark:bg-red-800/40 dark:hover:bg-red-800/50 dark:text-white px-3 py-1 rounded-md hover:bg-red-300/80"
                          >
                            Remove
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </motion.tbody>

            </table>
          )}
        </div>

        <div className="flex  flex-row justify-between items-center px-3 mt-6 gap-2 text-sm">
          <button className="border px-4 py-2 rounded-xl">Previous</button>
          <p className="text-gray-700 dark:text-white">Page 1 of 12</p>
          <button className="border px-4 py-2 rounded-xl">Next</button>
        </div>


        {updateModel && (
          <UpdateProductModel setUpdateModel={setUpdateModel} selectedProduct={selectedProduct} />
        )}

        {removeModel && (
          <RemoveModel setRemoveModel={setRemoveModel} selectedProduct={selectedProduct} />
        )}
      </>
    )
  }

  return (
    <>
      <div className="bg-white dark:bg-gray-500/20 rounded-xl p-4 md:p-6 shadow-md w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Products</h2>

          <div className="flex flex-col sm:flex-row sm:justify-between gap-2 w-full md:w-auto">
            <div className='flex gap-2'>
              <button
                onClick={() => setAddModel(true)}
                className="bg-blue-500 dark:bg-orange-600/30 dark:hover:bg-orange-600/40 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              >
                Add Product
              </button>

              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowFilterDropdown(prev => !prev)}
                  className="flex items-center gap-1 bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 transition dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500 cursor-pointer"
                  aria-haspopup="listbox"
                  aria-expanded={showFilterDropdown}
                >
                  <FilterIcon size={"18px"} />
                  <span>{filterType}</span>
                </button>

                {showFilterDropdown && (
                  <div className="absolute z-10 right-0 mt-2 bg-white dark:bg-gray-700 border dark:border-gray-600 rounded-lg shadow-md w-48">
                    <ul className="text-sm text-gray-700 dark:text-white">
                      {filterOptions.map((filter) => (
                        <li key={filter.value}>
                          <button
                            onClick={() => {
                              handleFilter(filter.value);
                              setShowFilterDropdown(false); // close dropdown after selection
                            }}
                            className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
                          >
                            {filter.label}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {content}
      </div>


      {
        addModel && <Dialog
          open={addModel}
          slots={{
            transition: Transition,
          }}
          keepMounted
          onClose={() => setAddModel(false)}
          aria-describedby="alert-dialog-slide-description"
          fullWidth
        >
          <AddProductModel setAddModel={setAddModel} />
        </Dialog>
      }
    </>
  )
}

ProductsList.propTypes = {
  products: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,

};
