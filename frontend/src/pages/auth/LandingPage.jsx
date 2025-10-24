import { Link } from 'react-router-dom';
import '../../styles/LandingPage.css'; // We will use the new CSS file below

const LandingPage = () => {
  return (
    <section className="landing-hero">
      <div className="landing-content">
        
        {/* New visual element, moved to the top */}
        <div className="hero-visual" aria-hidden>
          <div className="hero-icon">🥗</div>
        </div>

        {/* Copy section is now centered by default */}
        <div className="copy">
          <h1 className="title">Welcome to Forked</h1>
          <p className="lead">Discover meals, connect with food partners, and enjoy great offers.</p>

          <div className="cta-row">
            <Link to="/user/register" className="btn btn-primary">
              Register as User
            </Link>
            <Link to="/food-partner/register" className="btn btn-outline">
              Register as Partner
            </Link>
          </div>

          <p className="muted">
            Already have an account? <Link to="/user/login">User Login</Link> · <Link to="/food-partner/login">Partner Login</Link>
          </p>
        </div>

      </div>
    </section>
  );
};

export default LandingPage;