import React from 'react';

import AdminProfileInfo from '../../components/AdminComponents/ProfileComponents/AdminProfileInfo';
import OrdersPreview from '../../components/AdminComponents/ProfileComponents/OrdersPreview';
import InvoicesPreview from '../../components/AdminComponents/ProfileComponents/InvoicesPreview';
import CustomersPreview from '../../components/AdminComponents/ProfileComponents/CustomersPreview';
import AdminProfileReviews from '../../components/AdminComponents/ProfileComponents/AdminProfileReviews';

export default function AdminProfile() {
 
  return (
    <div className="p-4 space-y-6 bg-white dark:bg-gray-500/20 rounded-sm min-h-screen m-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold ms-2">Admin Profile</h1>
      </div>

      <AdminProfileInfo />

      <div className="grid gap-6 md:grid-cols-2">
        <OrdersPreview />
        <InvoicesPreview />
        <CustomersPreview />
        <AdminProfileReviews />
      </div>
    </div>
  );
}
