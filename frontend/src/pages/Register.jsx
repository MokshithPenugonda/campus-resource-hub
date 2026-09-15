import { useState } from "react";
import "./Register.css";
import api from "../services/api";


function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [department, setDepartment] = useState("");
    const [semester, setSemester] = useState(""); 
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");  

    async function handleSubmit(event) {
    event.preventDefault();

    setMessage("");
    setError("");

    const userData = {
        name: name,
        email: email,
        password: password,
        department: department,
        semester: Number(semester),
        role: "student"
    };

    try {
        const response = await api.post("/auth/register", userData);

        setMessage(response.data.message);
    } catch (error) {
        
        setError(error.response?.data?.message || "Registration failed");
    }
}
    return (
        <main className="register-page">
            <div className="register-container">
                <h1>Create Account</h1>

                <p>Register to use Campus Resource Hub.</p>
                {message && (<p className="success-message">{message} </p> )}
                {error && (<p className="error-message">{error}</p>)}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Name</label>

                        <input
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(event) =>
                                setName(event.target.value)
                            }
                        />  
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Department</label>
                        <select value={department} onChange={(event) => setDepartment(event.target.value)}>
                            <option value="">Select department</option>
                            <option value="CSE">CSE</option>
                            <option value="IT">IT</option>
                            <option value="ECE">ECE</option>
                            <option value="EEE">EEE</option>
                            <option value="MECH">MECH</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Semester</label>
                        <select value={semester} onChange={(event) => setSemester(event.target.value)}>
                            <option value="">Select semester</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                        </select>
                    </div>

                    <button type="submit">Register</button>
                </form>
            </div>
        </main>
    );
}

export default Register;