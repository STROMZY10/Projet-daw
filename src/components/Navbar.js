import { Link } from "react-router-dom";
import "./Navbar.css"; // Optional styling file

function Navbar() {
  return (
    <nav className="Navbar">
      <Link to="/">Home</Link>
      <Link to="/cart">Cart</Link>
    </nav>
  );
}
export default Navbar; 