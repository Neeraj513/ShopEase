import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const Orders = () => {
  const { token } = useAuth();

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/orders/my`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await response.json();

      setOrders(data);
    };

    fetchOrders();
  }, []);

  return (
    <div className="orders-page">
      <h1>My Orders</h1>

      {orders.length === 0 ? (
        <h3>No orders yet.</h3>
      ) : (
        orders.map((order) => (
          <div
            className="order-card"
            key={order._id}
          >
            <h3>
              Order ID: {order._id}
            </h3>

            <p>
              Total: ₹{order.totalAmount}
            </p>

            <p>
              Payment: {order.paymentMethod}
            </p>

            <p>
              Status:{" "}
              <strong>
                {order.orderStatus}
              </strong>
            </p>

            <div>
              {order.items.map((item, index) => (
                <p key={index}>
                  {item.name} × {item.quantity}
                </p>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;