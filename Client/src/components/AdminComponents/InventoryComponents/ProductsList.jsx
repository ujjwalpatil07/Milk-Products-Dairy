import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import UpdateProductModel from './Models/UpdateProductModel';
import AddProductModel from "./Models/AddProductModel"
import RemoveModel from './Models/RemoveModel';

export default function ProductsList({ fetchProducts, fetchedProducts }) {
  const [addModel, setAddModel] = useState(false);
  const [updateModel, setUpdateModel] = useState(false);
  const [removeModel, setRemoveModel] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!addModel || !removeModel || !updateModel) fetchProducts();
  }, [addModel, removeModel, updateModel, fetchProducts]);

  const filteredProducts = fetchedProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const highlightMatch = (text, term) => {
    if (!term) return text;

    const regex = new RegExp(`(${term})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, i) =>
      part.toLowerCase() === term.toLowerCase() ? (
        <span
          key={i * 0.9}
          className="bg-yellow-300 dark:bg-yellow-600 font-semibold rounded px-1"
        >
          {part}
        </span>
      ) : (
        <span key={i * 0.9}>{part}</span>
      )
    );
  };


  return (
    <div className="bg-white dark:bg-gray-500/20 rounded-xl p-4 md:p-6 shadow-md w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Products</h2>

        <div className="flex flex-col sm:flex-row sm:justify-between gap-2 w-full md:w-auto">
          <div className="relative max-sm:w-full">
            <input
              type="text"
              placeholder="Search products..."
              className="pl-10 pr-4 py-2 rounded-lg  border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <SearchIcon className="absolute left-3 top-2.5 text-gray-500 dark:text-white" />
          </div>

          <div className='flex gap-2'>
            <button
              onClick={() => setAddModel(true)}
              className="bg-blue-500 dark:bg-orange-600/30 dark:hover:bg-orange-600/40 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Add Product
            </button>

            <div className="flex items-center gap-1 bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 transition dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500">
              <FilterListIcon />
              <button>Filter</button>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        {filteredProducts.length === 0 ? (
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
            <tbody>
              {filteredProducts.map((product, index) => (
                <tr
                  key={product._id || index}
                  className="border-b hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="py-2 px-3 font-medium text-gray-700 dark:text-white">
                    {highlightMatch(product.name, searchTerm)}
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
                        className="text-sm bg-red-200 text-black dark:bg-red-800/40 dark:hover:bg-blue-800/50 dark:text-white px-3 py-1 rounded-md hover:bg-red-300/80"
                      >
                        Remove
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="flex  flex-row justify-between items-center px-3 mt-6 gap-2 text-sm">
        <button className="border px-4 py-2 rounded-xl">Previous</button>
        <p className="text-gray-700 dark:text-white">Page 1 of 12</p>
        <button className="border px-4 py-2 rounded-xl">Next</button>
      </div>

      {addModel && (
        <AddProductModel setAddModel={setAddModel} />
      )}

      {updateModel && (
        <UpdateProductModel setUpdateModel={setUpdateModel} selectedProduct={selectedProduct} />
      )}

      {removeModel && (
        <RemoveModel setRemoveModel={setRemoveModel} selectedProduct={selectedProduct} />
      )}
    </div>
  );
}

ProductsList.propTypes = {
  fetchProducts: PropTypes.func.isRequired,
  fetchedProducts: PropTypes.array.isRequired,
};
