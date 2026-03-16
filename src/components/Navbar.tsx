import { NavLink } from "react-router-dom";
import './Navbar.css'

function Navbar() {
    return(
        <nav className="navbar">
            <span className="navbar-brand">Bullseye</span>
            <div className="navbar-links">
                <NavLink to="/">Dashboard</NavLink>
                <NavLink to="/portfolio">Portfolio</NavLink>
                <NavLink to="/stocks">Stocks</NavLink>
            </div>
        </nav>
    )
}

export default Navbar