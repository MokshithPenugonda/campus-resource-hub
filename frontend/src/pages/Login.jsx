
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import api from "../services/api";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();

        setMessage("");
        setError("");

        const loginData = {
            email: email,
            password: password
        };

        try {
            const response = await api.post("/auth/login", loginData);

            const token = response.data.token;

            localStorage.setItem("token", token);
            window.dispatchEvent(new Event("login"));

            setMessage("Login successful");

            setTimeout(() => {
                navigate("/resources");
            }, 1000);
        } catch (error) {
            setError(
                error.response?.data?.message || "Login failed"
            );
        }
    }

    return (
        <main className="login-page">
            <div className="login-container">
                <h1>Login</h1>

                <p>Login to access Campus Resource Hub.</p>

                {message && (
                    <p className="success-message">
                        {message}
                    </p>
                )}

                {error && (
                    <p className="error-message">
                        {error}
                    </p>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email</label>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(event) =>
                                setEmail(event.target.value)
                            }
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>

                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                        />
                    </div>

                    <button type="submit">
                        Login
                    </button>
                </form>
            </div>
        </main>
    );
}

export default Login;
