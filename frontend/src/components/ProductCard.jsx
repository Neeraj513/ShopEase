import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <img
        src={product.image}
        alt={product.name}
      />

      <div className="product-info">
        <h3>{product.name}</h3>

        <p className="category">
          {product.category}
        </p>

        <p className="rating">
          ⭐ {product.rating}
        </p>

        <h3>₹{product.price}</h3>

        <Link
          to={`/products/${product._id}`}
          className="view-btn"
        >
          View Product
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;