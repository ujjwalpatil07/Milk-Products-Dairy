import React, { useState } from 'react';
import { Pencil, Save, X } from "lucide-react";

import AdminProfileInfo from '../../components/AdminComponents/ProfileComponents/AdminProfileInfo';
import OrdersPreview from '../../components/AdminComponents/ProfileComponents/OrdersPreview';
import InvoicesPreview from '../../components/AdminComponents/ProfileComponents/InvoicesPreview';
import CustomersPreview from '../../components/AdminComponents/ProfileComponents/CustomersPreview';
import AdminProfileReviews from '../../components/AdminComponents/ProfileComponents/AdminProfileReviews';

export default function AdminProfile() {
  const [editMode, setEditMode] = useState(false);

  const handleSave = () => {
    // You can add API call here to save the data
    setEditMode(false);
  };
  return (
    <div className="p-4 space-y-6 bg-white dark:bg-gray-500/20 rounded-sm min-h-screen m-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold ms-2">Admin Profile</h1>

        {!editMode ? (
          <button
            onClick={() => setEditMode(true)}
            className="flex items-center gap-1 px-3 py-1 text-sm bg-blue-100 dark:bg-blue-800/30 hover:bg-blue-200 dark:hover:bg-blue-700 text-blue-800 dark:text-white rounded"
          >
            <Pencil size={16} />
            Edit
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={() => setEditMode(false)}
              className="flex items-center gap-1 px-3 py-1 text-sm bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-800 dark:text-white rounded"
            >
              <X size={16} />
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-1 px-3 py-1 text-sm bg-green-200 dark:bg-green-700 hover:bg-green-300 dark:hover:bg-green-600 text-green-800 dark:text-white rounded"
            >
              <Save size={16} />
              Save
            </button>
          </div>
        )}
      </div>

        <AdminProfileInfo editMode={editMode}  handleSave={handleSave}/>

        <div className="grid gap-6 md:grid-cols-2">
          <OrdersPreview />
          <InvoicesPreview />
          <CustomersPreview />
          <AdminProfileReviews/>
        </div>
      </div>
  );
}
