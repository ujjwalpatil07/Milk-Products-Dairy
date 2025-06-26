import React from 'react';

export default function AdminProfileInfo() {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow space-y-2">
      <h2 className="text-xl font-semibold">👨‍💼 Admin Info</h2>
      <p><strong>Name:</strong> Ujjwal Patil</p>
      <p><strong>Email:</strong> admin@dairyhub.com</p>
      <p><strong>Role:</strong> Super Admin</p>
      <p><strong>Joined:</strong> January 2024</p>
    </div>
  );
}
