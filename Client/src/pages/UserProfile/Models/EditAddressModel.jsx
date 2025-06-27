import React from "react";
import PropTypes from "prop-types";
import {
  User, Phone, Building2, Mail,
  X, MapPin, Locate,
  Check,
} from "lucide-react";


export default function EditAddressModel({ selectedAddress, editAddress, setEditModal, setSelectedAddress }) {
  return (
    <div className="fixed inset-0 z-100 bg-black/40 backdrop-blur-sm p-4 flex flex-col justify-center items-center overflow-auto">
      <div className="bg-white dark:bg-gray-500/50 p-6 sm:p-8 rounded-2xl shadow-2xl w-full max-w-lg animate-fadeIn animate-scaleIn">

        <h2 className="text-xl sm:text-2xl font-semibold text-center mb-6 text-gray-800 dark:text-gray-100">
          ✏️ Edit Address
        </h2>

        <form onSubmit={editAddress} className="grid gap-4 text-sm sm:text-base">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-gray-500" />
            <input
              type="text"
              defaultValue={selectedAddress.name}
              placeholder="Full Name"
              className="flex-1 p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setSelectedAddress({ ...selectedAddress, name: e.target.value })}
            />
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-5 h-5 text-gray-500" />
            <input
              type="text"
              defaultValue={selectedAddress.phone}
              placeholder="Phone Number"
              className="flex-1 p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setSelectedAddress({ ...selectedAddress, phone: e.target.value })}
            />
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-gray-500" />
            <input
              type="text"
              defaultValue={selectedAddress.streetAddress}
              placeholder="Street Address"
              className="flex-1 p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setSelectedAddress({ ...selectedAddress, streetAddress: e.target.value })}
            />
          </div>
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-gray-500" />
            <input
              type="text"
              defaultValue={selectedAddress.city}
              placeholder="City"
              className="flex-1 p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setSelectedAddress({ ...selectedAddress, city: e.target.value })}
            />
          </div>
          <div className="flex items-center gap-2">
            <Locate className="w-5 h-5 text-gray-500" />
            <input
              type="text"
              defaultValue={selectedAddress.state}
              placeholder="State"
              className="flex-1 p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setSelectedAddress({ ...selectedAddress, state: e.target.value })}
            />
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-gray-500" />
            <input
              type="text"
              defaultValue={selectedAddress.pincode}
              placeholder="Pincode"
              className="flex-1 p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setSelectedAddress({ ...selectedAddress, pincode: e.target.value })}
            />
          </div>

          <div className="flex justify-between gap-4 mt-6">
            <button
              type="button"
              onClick={() => setEditModal(false)}
              className="flex-1 py-2 flex items-center justify-center gap-2 border border-gray-400 dark:border-gray-600 text-gray-700 dark:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              <X size={18} /> Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2 flex items-center justify-center gap-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
            >
              <Check size={18} /> Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

EditAddressModel.propTypes = {
  selectedAddress: PropTypes.shape({
    name: PropTypes.string,
    phone: PropTypes.string,
    streetAddress: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    pincode: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    addressType: PropTypes.string,
  }).isRequired,
  setEditModal: PropTypes.func.isRequired,
  editAddress: PropTypes.func.isRequired,
  setSelectedAddress: PropTypes.func.isRequired
};