import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Checkout = () => {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [cart, setCart] = useState(null);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: ""
  });

  useEffect(() => {
    const getCart = async () => {
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

    getCart();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const placeOrder = async (e) => {
    e.preventDefault();

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/orders`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          shippingAddress: form,
          paymentMethod: "COD"
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      alert(data.message);
      return;
    }

    alert("Order placed successfully!");

    navigate("/orders");
  };

  if (!cart) {
    return <h2 className="loading">Loading...</h2>;
  }

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>

      <form
        onSubmit={placeOrder}
        className="form checkout-form"
      >
        <input
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          required
        />

        <textarea
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
          required
        />

        <input
          name="city"
          placeholder="City"
          value={form.city}
          onChange={handleChange}
          required
        />

        <input
          name="pincode"
          placeholder="Pincode"
          value={form.pincode}
          onChange={handleChange}
          required
        />

        <h3>Payment: Cash on Delivery</h3>

        <button type="submit">
          Place Order
        </button>
      </form>
    </div>
  );
};

export default Checkout;