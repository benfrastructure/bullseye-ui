import { NavLink } from "react-router-dom";

function Navbar() {
    return(
        <nav>
            <span>Bullseye</span>
            <NavLink to="/">Dashboard</NavLink>
            <NavLink to="/portfolio">Portfolio</NavLink>
            <NavLink to="/stocks">Stocks</NavLink>
        </nav>
    )
}

export default Navbar