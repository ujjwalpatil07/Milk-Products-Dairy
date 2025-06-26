import React from 'react';
import AdminProfileInfo from '../../components/AdminComponents/ProfileComponents/AdminProfileInfo';
import SummaryCards from '../../components/AdminComponents/ProfileComponents/SummaryCards';
import OrdersPreview from '../../components/AdminComponents/ProfileComponents/OrdersPreview';
import InvoicesPreview from '../../components/AdminComponents/ProfileComponents/InvoicesPreview';
import CustomersPreview from '../../components/AdminComponents/ProfileComponents/CustomersPreview';

export default function AdminProfile() {
  return (
    <div className="p-4 space-y-6 dark:bg-gray-900 min-h-screen text-gray-800 dark:text-white">
      <h1 className="text-3xl font-bold">👤 Admin Dashboard</h1>

      <AdminProfileInfo />

      <SummaryCards />

      <div className="grid gap-6 md:grid-cols-2">
        <OrdersPreview />
        <InvoicesPreview />
        <CustomersPreview />
      </div>
    </div>
  );
}
