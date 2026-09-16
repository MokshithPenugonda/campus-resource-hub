
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Resources from "./pages/Resources";
import UploadResource from "./pages/UploadResource";
import EditResource from "./pages/EditResource";

function App() {
    return (
        <>
            <Navbar title="Campus Resource Hub" />

            <Routes>
                <Route path="/" element={<Home />} />

                <Route path="/login" element={<Login />} />

                <Route path="/register" element={<Register />} />

                <Route
                    path="/resources"
                    element={
                        <ProtectedRoute>
                            <Resources />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/upload"
                    element={
                        <ProtectedRoute>
                            <UploadResource />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/edit-resource/:id"
                    element={
                        <ProtectedRoute>
                            <EditResource />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </>
    );
}

export default App;

