
import React from "react";
import PropTypes from "prop-types";

export default function ProductCard({ product }) {
  return (
    <>
      <div className="py-3 px-3 mb-0 md:px-6 w-full flex flex-col text-gray-800 dark:text-gray-200">
        <h1 className="text-blue-900 dark:text-white font-bold text-3xl">
          {product?.title}
        </h1>
        <p>{product?.description}</p>

        <div className="flex items-center gap-2 mt-2">
          <a href={`#${product?.title}`}>
            Total Varieties: <strong>{product?.varieties?.length}</strong>
          </a>
        </div>
      </div>

      <div className="px-3 md:px-6">
        here is products
      </div>
    </>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    image: PropTypes.string,
    features: PropTypes.arrayOf(PropTypes.string),
    varieties: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};