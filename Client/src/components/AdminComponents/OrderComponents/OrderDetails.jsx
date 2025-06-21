import SingleOrder from "../OrderComponents/SingleOrder"

export default function OrderDetails({ orders, loading }) {

  return (
    <div className="bg-white dark:bg-gray-500/20 rounded-xl p-6 shadow-md w-full overflow-x-auto flex flex-col gap-y-4">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 border-b pb-2">
        🧾 Orders Section
      </h2>
      {loading ? (
        <div className="flex items-center justify-center h-[50vh] text-gray-600 dark:text-white gap-3">
          <div className="w-8 h-8 border-4 border-dashed rounded-full animate-spin border-[#843E71]"></div>
          <span className="text-xl">Loading orders...</span>
        </div>
      ) : (
        orders.length === 0 ? (
          <div>
            No orders found
          </div>
        ) : (
          orders?.map((order, index) => (
            <SingleOrder key={index} order={order} />
          ))
        )
      )}
    </div>
  );
}