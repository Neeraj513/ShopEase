import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const Admin = () => {
  const { token } = useAuth();

  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  const [editingId, setEditingId] =
    useState(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: "Electronics",
    stock: "",
    rating: ""
  });

  const fetchData = async () => {
    const productResponse = await fetch(
      `${import.meta.env.VITE_API_URL}/products`
    );

    const productData =
      await productResponse.json();

    setProducts(productData);

    const orderResponse = await fetch(
      `${import.meta.env.VITE_API_URL}/orders`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    const orderData =
      await orderResponse.json();

    setOrders(orderData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const saveProduct = async (e) => {
    e.preventDefault();

    const url = editingId
      ? `${import.meta.env.VITE_API_URL}/products/${editingId}`
      : `${import.meta.env.VITE_API_URL}/products`;

    const method = editingId
      ? "PUT"
      : "POST";

    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
        rating: Number(form.rating)
      })
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message);
      return;
    }

    alert(
      editingId
        ? "Product updated"
        : "Product added"
    );

    resetForm();
    fetchData();
  };

  const resetForm = () => {
    setEditingId(null);

    setForm({
      name: "",
      description: "",
      price: "",
      image: "",
      category: "Electronics",
      stock: "",
      rating: ""
    });
  };

  const editProduct = (product) => {
    setEditingId(product._id);

    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
      category: product.category,
      stock: product.stock,
      rating: product.rating
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const deleteProduct = async (id) => {
    if (
      !window.confirm(
        "Delete this product?"
      )
    ) {
      return;
    }

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/products/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    const data = await response.json();

    alert(data.message);

    fetchData();
  };

  const updateOrder = async (
    id,
    orderStatus
  ) => {
    await fetch(
      `${import.meta.env.VITE_API_URL}/orders/${id}/status`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          orderStatus
        })
      }
    );

    fetchData();
  };

  return (
    <div className="admin-page">
      <h1>Admin Dashboard</h1>

      <section className="admin-section">
        <h2>
          {editingId
            ? "Edit Product"
            : "Add Product"}
        </h2>

        <form
          className="admin-form"
          onSubmit={saveProduct}
        >
          <input
            name="name"
            placeholder="Product Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            required
          />

          <input
            name="price"
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            required
          />

          <input
            name="image"
            placeholder="Image URL"
            value={form.image}
            onChange={handleChange}
            required
          />

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
          >
            <option>Electronics</option>
            <option>Fashion</option>
            <option>Home</option>
          </select>

          <input
            name="stock"
            type="number"
            placeholder="Stock"
            value={form.stock}
            onChange={handleChange}
            required
          />

          <input
            name="rating"
            type="number"
            step="0.1"
            placeholder="Rating"
            value={form.rating}
            onChange={handleChange}
          />

          <button type="submit">
            {editingId
              ? "Update Product"
              : "Add Product"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={resetForm}
            >
              Cancel
            </button>
          )}
        </form>
      </section>

      <section className="admin-section">
        <h2>Products</h2>

        <div className="admin-products">
          {products.map((product) => (
            <div
              className="admin-product"
              key={product._id}
            >
              <img
                src={product.image}
                alt={product.name}
              />

              <h3>{product.name}</h3>

              <p>
                ₹{product.price}
              </p>

              <button
                onClick={() =>
                  editProduct(product)
                }
              >
                Edit
              </button>

              <button
                className="delete-btn"
                onClick={() =>
                  deleteProduct(product._id)
                }
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="admin-section">
        <h2>Orders</h2>

        {orders.map((order) => (
          <div
            className="order-card"
            key={order._id}
          >
            <h3>
              {order.user?.name}
            </h3>

            <p>
              {order.user?.email}
            </p>

            <p>
              Total: ₹{order.totalAmount}
            </p>

            <select
              value={order.orderStatus}
              onChange={(e) =>
                updateOrder(
                  order._id,
                  e.target.value
                )
              }
            >
              <option>Pending</option>
              <option>Processing</option>
              <option>Shipped</option>
              <option>Delivered</option>
              <option>Cancelled</option>
            </select>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Admin;