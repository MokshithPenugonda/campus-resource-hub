
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./UploadResource.css";

function UploadResource() {
    const [title, setTitle] = useState("");
    const [subject, setSubject] = useState("");
    const [department, setDepartment] = useState("");
    const [semester, setSemester] = useState("");
    const [academicYear, setAcademicYear] = useState("");
    const [resourceType, setResourceType] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState(null);

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();

        setMessage("");
        setError("");

        if (!file) {
            setError("Please select a PDF file");
            return;
        }

        const formData = new FormData();

        formData.append("title", title);
        formData.append("subject", subject);
        formData.append("department", department);
        formData.append("semester", semester);
        formData.append("academicYear", academicYear);
        formData.append("resourceType", resourceType);
        formData.append("description", description);
        formData.append("file", file);

        try {
            const response = await api.post(
                "/resource/uploadResource",
                formData
            );

            setMessage(response.data.message);

            setTitle("");
            setSubject("");
            setDepartment("");
            setSemester("");
            setAcademicYear("");
            setResourceType("");
            setDescription("");
            setFile(null);

            document.getElementById("file-input").value = "";

            setTimeout(() => {
                navigate("/resources");
            }, 1000);
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to upload resource"
            );
        }
    }

    return (
        <main className="upload-page">
            <div className="upload-container">

                <h1>Upload Resource</h1>

                <p>
                    Upload a question paper or assignment.
                </p>

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
                        <label>Title</label>

                        <input
                            type="text"
                            placeholder="Enter resource title"
                            value={title}
                            onChange={(event) =>
                                setTitle(event.target.value)
                            }
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Subject</label>

                        <input
                            type="text"
                            placeholder="Enter subject"
                            value={subject}
                            onChange={(event) =>
                                setSubject(event.target.value)
                            }
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Department</label>

                        <select
                            value={department}
                            onChange={(event) =>
                                setDepartment(event.target.value)
                            }
                            required
                        >
                            <option value="">
                                Select department
                            </option>

                            <option value="CSE">CSE</option>
                            <option value="ECE">ECE</option>
                            <option value="EEE">EEE</option>
                            <option value="IT">IT</option>
                            <option value="MMECH">MMECH</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Semester</label>

                        <select
                            value={semester}
                            onChange={(event) =>
                                setSemester(event.target.value)
                            }
                            required
                        >
                            <option value="">
                                Select semester
                            </option>

                            {[1, 2, 3, 4, 5, 6, 7, 8].map(
                                (sem) => (
                                    <option
                                        key={sem}
                                        value={sem}
                                    >
                                        Semester {sem}
                                    </option>
                                )
                            )}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Academic Year</label>

                        <input
                            type="text"
                            placeholder="Example: 2025-26"
                            value={academicYear}
                            onChange={(event) =>
                                setAcademicYear(event.target.value)
                            }
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Resource Type</label>

                        <select
                            value={resourceType}
                            onChange={(event) =>
                                setResourceType(event.target.value)
                            }
                            required
                        >
                            <option value="">
                                Select resource type
                            </option>

                            <option value="Question Paper">
                                Question Paper
                            </option>

                            <option value="Assignment">
                                Assignment
                            </option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Description</label>

                        <textarea
                            placeholder="Enter a short description"
                            value={description}
                            onChange={(event) =>
                                setDescription(event.target.value)
                            }
                        />
                    </div>

                    <div className="form-group">
                        <label>PDF File</label>

                        <input
                            id="file-input"
                            type="file"
                            accept="application/pdf"
                            onChange={(event) =>
                                setFile(event.target.files[0])
                            }
                            required
                        />
                    </div>

                    <button type="submit">
                        Upload Resource
                    </button>

                </form>
            </div>
        </main>
    );
}

export default UploadResource;
