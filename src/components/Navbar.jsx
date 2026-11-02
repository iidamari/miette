import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <header className="magazine-header">
      <div className="magazine-topline">
    
    
      </div>

      <NavLink to="/" className="brand">
        Miette
      </NavLink>

      <nav className="main-navigation">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/discover">Discover</NavLink>
        <NavLink to="/favorites">Favorites</NavLink>
      </nav>

      <div className="header-divider"></div>
    </header>
  );
}

export default Navbar;