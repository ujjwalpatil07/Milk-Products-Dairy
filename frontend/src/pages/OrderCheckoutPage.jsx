import { useContext, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartProvider";
import { UserAuthContext } from "../context/AuthProvider";
import { getCartProductDetails } from "../utils/cartUtils";
import { products } from "../data/products";

export default function OrderCheckoutPage() {

  const { authUser } = useContext(UserAuthContext);
  const { cartItems, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const cartDetails = useMemo(
    () => getCartProductDetails(cartItems, products),
    [cartItems, products]
  );

  const subtotal = cartDetails.reduce((acc, item) => acc + item.price * item.selectedQuantity, 0);
  const discountPercent = authUser?.discount || 0;
  const discountAmount = (subtotal * discountPercent) / 100;
  const totalAmount = subtotal - discountAmount;

  const handlePlaceOrder = () => {
    clearCart(); 
    navigate("/order-success"); 
  };

  if (!authUser || cartItems?.length === 0) {
    return (
      <div className="p-5 text-center flex flex-col items-center justify-center h-[300px]">
        <h2 className="text-xl font-semibold">No items to checkout</h2>
        <Link to="/products" className="mt-4 inline-block bg-[#843E71] text-white py-2 px-4 rounded hover:bg-[#843e71dd]">
          Go to Products
        </Link>
      </div>
    );
  }

  return (
    <section className="max-w-4xl mx-auto my-10 px-4">
      <h1 className="text-2xl font-bold mb-4 text-[#843E71] dark:text-white">Confirm Delivery Details</h1>

      <div className="bg-white dark:bg-gray-500/20 rounded-lg p-4 mb-6">
        <h2 className="text-lg font-semibold">Deliver To:</h2>
        <p><span className="font-medium">Name:</span> {authUser.fullName}</p>
        <p><span className="font-medium">Phone:</span> {authUser.phone || "N/A"}</p>
        <p><span className="font-medium">Address:</span> {authUser.address}</p>
        <Link to="/profile-update" className="text-blue-500 hover:underline mt-2 inline-block">Edit Address</Link>
      </div>

      <div className="bg-white dark:bg-gray-500/20 rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-3">Order Summary</h2>

        {cartDetails.map((item, idx) => (
          <div key={idx * 0.65} className="flex justify-between py-2 border-b border-dashed border-gray-300">
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {item.selectedQuantity} {item.quantityUnit} &times; &#8377;{item.price.toFixed(2)}
              </p>
            </div>
            <p className="text-green-600 font-semibold">
              &#8377;{(item.price * item.selectedQuantity).toFixed(2)}
            </p>
          </div>
        ))}

        <div className="pt-4 text-sm text-gray-800 dark:text-gray-100 space-y-2 font-medium">
          <p>Total MRP: <span className="float-right text-blue-600 font-bold">&#8377;{subtotal.toFixed(2)}</span></p>
          <p>Discount ({discountPercent}%): <span className="float-right text-red-500">- &#8377;{discountAmount.toFixed(2)}</span></p>
          <p className="text-lg font-bold">Total Payable: <span className="float-right text-green-600">&#8377;{totalAmount.toFixed(2)}</span></p>
        </div>
      </div>

      <div className="mt-6 flex justify-between">
        <Link
          to="/cart"
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
        >
          Back to Cart
        </Link>
        <button
          onClick={handlePlaceOrder}
          className="bg-[#843E71] text-white px-6 py-2 rounded hover:bg-[#843e71d4]"
        >
          Place Order
        </button>
      </div>
    </section>
  );
}
