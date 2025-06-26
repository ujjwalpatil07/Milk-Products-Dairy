export default function OrdersPreview() {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-2">📦 Recent Orders</h2>
      <ul className="text-sm space-y-1">
        <li>Order #1234 - ₹250</li>
        <li>Order #1233 - ₹180</li>
        <li>Order #1232 - ₹350</li>
      </ul>
    </div>
  );
}
