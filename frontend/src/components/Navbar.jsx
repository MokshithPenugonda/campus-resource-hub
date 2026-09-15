
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar({ title }) {
    const [isLoggedIn, setIsLoggedIn] = useState(
        !!localStorage.getItem("token")
    );

    const navigate = useNavigate();

    useEffect(() => {
        function handleLogin() {
            setIsLoggedIn(true);
        }

        window.addEventListener("login", handleLogin);

        return () => {
            window.removeEventListener("login", handleLogin);
        };
    }, []);

    function handleLogout() {
        localStorage.removeItem("token");

        setIsLoggedIn(false);

        navigate("/login");
    }

    return (
        <nav className="navbar">
            <h2>{title}</h2>

            <div className="nav-links">
                <Link to="/resources">Resources</Link>

                {!isLoggedIn && (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}

                {isLoggedIn && (
                    <>
                        <Link to="/upload">Upload</Link>
                        <button onClick={handleLogout}>
                            Logout
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
