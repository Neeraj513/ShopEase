import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <section className="hero">
        <div>
          <h1>Welcome to ShopEase</h1>

          <p>
            Everything you need, all in one place.
          </p>

          <Link to="/products" className="hero-btn">
            Shop Now
          </Link>
        </div>
      </section>

      <section className="home-section">
        <h2>Why ShopEase?</h2>

        <div className="features">
          <div>
            <h3>🚚 Fast Delivery</h3>
            <p>Quick and reliable delivery.</p>
          </div>

          <div>
            <h3>🔒 Secure Shopping</h3>
            <p>Your account stays protected.</p>
          </div>

          <div>
            <h3>💰 Best Prices</h3>
            <p>Quality products at great prices.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;