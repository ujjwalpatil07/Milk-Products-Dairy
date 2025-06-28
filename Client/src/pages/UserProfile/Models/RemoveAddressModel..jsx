import React from "react";
import PropTypes from "prop-types";


export default function RemoveAddressModel({ selectedAddress, setRemoveModal, removeAddress, loading }) {
  return (

    <div className="bg-white dark:bg-black/80 p-3">

      <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
        Do you want to remove this address?
      </h2>

      <div className="text-sm sm:text-base bg-gray-100 dark:bg-gray-500/20 p-4 rounded mb-4 text-gray-700 dark:text-gray-200">
        <p><span className="font-medium">Name:</span> {selectedAddress.name}</p>
        <p><span className="font-medium">Phone:</span> {selectedAddress.phone}</p>
        <p><span className="font-medium">Address:</span> {selectedAddress.streetAddress}, {selectedAddress.city}, {selectedAddress.state} - {selectedAddress.pincode}</p>
        <p><span className="font-medium">Type:</span> {selectedAddress.addressType}</p>
      </div>

      <div className="flex justify-between gap-4">
        <button
          disabled={loading}
          className="flex-1 py-2 border border-blue-600 text-blue-600 font-semibold rounded hover:bg-blue-600/10 hover:text-white transition-all duration-300 disabled:cursor-not-allowed"
          onClick={() => setRemoveModal(false)}
        >
          Cancel
        </button>
        <button
          disabled={loading}
          className="flex-1 py-2 border border-red-600 text-red-600 font-semibold rounded hover:bg-red-600/10 hover:text-white transition-all duration-300 disabled:cursor-not-allowed"
          onClick={() => removeAddress(selectedAddress)}
        >
          {
            loading ? "Removing..." : "Remove"
          }
        </button>
      </div>
    </div>
  );
}

RemoveAddressModel.propTypes = {
  selectedAddress: PropTypes.shape({
    name: PropTypes.string,
    phone: PropTypes.string,
    streetAddress: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    pincode: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    addressType: PropTypes.string,
  }).isRequired,
  setRemoveModal: PropTypes.func.isRequired,
  removeAddress: PropTypes.func.isRequired,
  loading: PropTypes.bool
};
