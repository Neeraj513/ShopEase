import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Cart = () => {
  const { token } = useAuth();

  const [cart, setCart] = useState(null);

  const fetchCart = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/cart`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    const data = await response.json();

    setCart(data);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateQuantity = async (
    itemId,
    quantity
  ) => {
    await fetch(
      `${import.meta.env.VITE_API_URL}/cart/${itemId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          quantity
        })
      }
    );

    fetchCart();
  };

  const removeItem = async (itemId) => {
    await fetch(
      `${import.meta.env.VITE_API_URL}/cart/${itemId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    fetchCart();
  };

  if (!cart) {
    return <h2 className="loading">Loading...</h2>;
  }

  const total = cart.items.reduce(
    (sum, item) =>
      sum +
      item.product.price * item.quantity,
    0
  );

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>

      {cart.items.length === 0 ? (
        <div>
          <h3>Your cart is empty.</h3>

          <Link to="/products">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cart.items.map((item) => (
              <div
                className="cart-item"
                key={item._id}
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                />

                <div>
                  <h3>
                    {item.product.name}
                  </h3>

                  <p>
                    ₹{item.product.price}
                  </p>

                  <div className="quantity">
                    <button
                      onClick={() =>
                        updateQuantity(
                          item._id,
                          item.quantity - 1
                        )
                      }
                    >
                      -
                    </button>

                    <span>
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        updateQuantity(
                          item._id,
                          item.quantity + 1
                        )
                      }
                    >
                      +
                    </button>
                  </div>

                  <button
                    className="delete-btn"
                    onClick={() =>
                      removeItem(item._id)
                    }
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Total: ₹{total}</h2>

            <Link
              to="/checkout"
              className="checkout-btn"
            >
              Proceed to Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;