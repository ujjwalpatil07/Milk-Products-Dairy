import React from "react";
import PropTypes from "prop-types";
import {
  User, Phone, Building2, Mail,
  X, Home, MapPin, Locate, Plus,
} from "lucide-react";


export default function NewAddressModel({ setNewAddressModel, addAddress, newAddress, setNewAddress }) {
  return (
    <div className="min-h-screen overflow-auto fixed inset-0 backdrop-blur-sm bg-black/10 flex flex-col items-center z-100 p-3">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-xl w-full max-w-xl relative">
        <button
          onClick={() => setNewAddressModel(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-black dark:hover:text-white text-xl"
        >
          <X />
        </button>

        <h2 className="text-xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">
          <Plus className="inline mr-2 mb-1" /> Add New Address
        </h2>

        <form onSubmit={addAddress} className="space-y-4 text-sm sm:text-base">
          {/* Address Type */}
          <div>
            <label htmlFor="addressType" className="block mb-1 text-sm font-medium">Address Type</label>
            <div className="flex items-center gap-2">
              <Home className="w-5 h-5 text-gray-500" />
              <select
                name="addressType"
                id="addressType"
                className="flex-1 p-2 border rounded outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white"
                value={newAddress?.addressType}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, addressType: e.target.value })
                }
              >
                <option value="Home">Home</option>
                <option value="Work">Work</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="block mb-1 text-sm font-medium">Full Name *</label>
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-gray-500" />
              <input
                type="text"
                id="fullName"
                className="flex-1 p-2 border rounded outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white"
                placeholder="e.g. Ujjwal Patil"
                value={newAddress.name}
                onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                required
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block mb-1 text-sm font-medium">Phone *</label>
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-gray-500" />
              <input
                type="tel"
                pattern="[0-9]{10}"
                id="phone"
                title="Enter a 10-digit valid phone number"
                className="flex-1 p-2 border rounded outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white"
                placeholder="e.g. 9876543210"
                value={newAddress.phone}
                onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                required
              />
            </div>
          </div>

          {/* Street Address */}
          <div>
            <label htmlFor="streetAdd" className="block mb-1 text-sm font-medium">Street Address *</label>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-gray-500" />
              <input
                type="text"
                id="streetAdd"
                className="flex-1 p-2 border rounded outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white"
                placeholder="e.g. Flat 101, MG Road"
                value={newAddress.streetAddress}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, streetAddress: e.target.value })
                }
                required
              />
            </div>
          </div>

          {/* City & State */}
          <div className="flex flex-col md:flex-row gap-2">
            <div className="w-full md:w-1/2">
              <label htmlFor="city" className="block mb-1 text-sm font-medium">City *</label>
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  id="city"
                  className="flex-1 p-2 border rounded outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white"
                  placeholder="e.g. Mumbai"
                  value={newAddress.city}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, city: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div className="w-full md:w-1/2">
              <label htmlFor="state" className="block mb-1 text-sm font-medium">State *</label>
              <div className="flex items-center gap-2">
                <Locate className="w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  id="state"
                  className="flex-1 p-2 border rounded outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white"
                  placeholder="e.g. Maharashtra"
                  value={newAddress.state}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, state: e.target.value })
                  }
                  required
                />
              </div>
            </div>
          </div>

          {/* Pincode */}
          <div>
            <label htmlFor="pincode" className="block mb-1 text-sm font-medium">Pincode *</label>
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-gray-500" />
              <input
                type="text"
                id="pincode"
                pattern="[0-9]{6}"
                title="Enter a valid 6-digit pincode"
                className="flex-1 p-2 border rounded outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white"
                placeholder="e.g. 400001"
                value={newAddress.pincode}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, pincode: e.target.value })
                }
                required
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-sm rounded hover:bg-gray-400 dark:hover:bg-gray-600"
              onClick={() => setNewAddressModel(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
            >
              Save Address
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

NewAddressModel.propTypes = {
  newAddress: PropTypes.shape({
    name: PropTypes.string,
    phone: PropTypes.string,
    streetAddress: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    pincode: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    addressType: PropTypes.string,
  }).isRequired,
  setNewAddressModel: PropTypes.func.isRequired,
  addAddress: PropTypes.func.isRequired,
  setNewAddress: PropTypes.func.isRequired
};
