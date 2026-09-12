import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { user, token } = useAuth();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/products/${id}`
      );

      const data = await response.json();

      setProduct(data);
    };

    fetchProduct();
  }, [id]);

  const addToCart = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/cart`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          productId: product._id,
          quantity
        })
      }
    );

    const data = await response.json();

    if (response.ok) {
      alert("Product added to cart");
      navigate("/cart");
    } else {
      alert(data.message);
    }
  };

  if (!product) {
    return <h2 className="loading">Loading...</h2>;
  }

  return (
    <div className="details">
      <img
        src={product.image}
        alt={product.name}
      />

      <div className="details-info">
        <h1>{product.name}</h1>

        <p>{product.description}</p>

        <h2>₹{product.price}</h2>

        <p>Category: {product.category}</p>

        <p>⭐ {product.rating}</p>

        <p>
          Stock: {product.stock}
        </p>

        <div className="quantity">
          <button
            onClick={() =>
              setQuantity(
                Math.max(1, quantity - 1)
              )
            }
          >
            -
          </button>

          <span>{quantity}</span>

          <button
            onClick={() =>
              setQuantity(quantity + 1)
            }
          >
            +
          </button>
        </div>

        <button
          className="cart-btn"
          onClick={addToCart}
          disabled={product.stock === 0}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;