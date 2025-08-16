import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, resetCart } from "../slices/cartSlice";
import { toast } from "react-hot-toast";
import { FaTrashCan } from "react-icons/fa6";

function CartItems() {
  const { items, totalItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleReset = () => {
    dispatch(resetCart());
    toast.success("Cart cleared");
  };

  return (
    <div className="min-h-screen bg-richblack-900 text-richblack-25 px-8 py-10">
      <h1 className="text-3xl font-bold text-yellow-50 mb-6">🛒 Your Cart</h1>

      {totalItems === 0 ? (
        <p className="text-richblack-300">Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-richblack-800 p-4 rounded-lg shadow-md"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-16 rounded-md object-cover"
                  />
                  <div>
                    <h2 className="text-lg font-semibold">{item.name}</h2>
                    <p className="text-sm text-richblack-300">
                      {item.instructor}
                    </p>
                    <p className="text-yellow-50 font-bold">₹ {item.price}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition"
                >
                  <FaTrashCan/>
                </button>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="bg-richblack-800 p-6 rounded-lg shadow-lg h-fit">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <p className="text-richblack-300 mb-2">
              Total Items: <span className="font-bold">{totalItems}</span>
            </p>
            <p className="text-richblack-300 mb-4">
              Total Price:{" "}
              <span className="font-bold text-yellow-50">
                ₹ {items.reduce((sum, i) => sum + Number(i.price), 0)}
              </span>
            </p>
            <button
              onClick={handleReset}
              className="w-full px-4 py-2 bg-richblack-700 hover:bg-richblack-600 text-white rounded-md transition"
            >
              Clear Cart
            </button>
            <button
              className="w-full mt-3 px-4 py-2 bg-yellow-50 hover:bg-yellow-100 text-richblack-900 rounded-md font-semibold transition"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartItems;
