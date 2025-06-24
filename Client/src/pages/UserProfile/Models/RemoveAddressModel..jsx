import React from "react";
import PropTypes from "prop-types";


export default function RemoveAddressModel({selectedAddress, setRemoveModal, removeAddress}) {
  return (
            <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm px-4  flex flex-col items-center overflow-auto">
              <div className="bg-white dark:bg-gray-500/20 rounded-2xl shadow-2xl w-full max-w-md p-6 sm:p-8 animate-fadeIn scale-95 animate-scaleIn">
  
                <h2 className="text-xl sm:text-2xl font-semibold text-center mb-4 text-gray-800 dark:text-gray-100">
                  Do you want to remove this address?
                </h2>
  
                <div className="text-sm sm:text-base bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-6 text-gray-700 dark:text-gray-200">
                  <p><span className="font-medium">Name:</span> {selectedAddress.name}</p>
                  <p><span className="font-medium">Phone:</span> {selectedAddress.phone}</p>
                  <p><span className="font-medium">Address:</span> {selectedAddress.streetAddress}, {selectedAddress.city}, {selectedAddress.state} - {selectedAddress.pincode}</p>
                  <p><span className="font-medium">Type:</span> {selectedAddress.addressType}</p>
                </div>
  
                <div className="flex justify-between gap-4">
                  <button
                    className="flex-1 py-2 border border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={() => setRemoveModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="flex-1 py-2 border border-red-600 text-red-600 font-semibold rounded-lg hover:bg-red-600 hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                    onClick={() => removeAddress(selectedAddress)}
                  >
                    Remove
                  </button>
                </div>
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
};
