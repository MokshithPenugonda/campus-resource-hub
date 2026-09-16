
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import "./EditResource.css";

function EditResource() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [subject, setSubject] = useState("");
    const [department, setDepartment] = useState("");
    const [semester, setSemester] = useState("");
    const [academicYear, setAcademicYear] = useState("");
    const [resourceType, setResourceType] = useState("");
    const [description, setDescription] = useState("");

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        async function getResource() {
            try {
                const response = await api.get(
                    `/resource/getresourceById/${id}`
                );

                const resource = response.data.resource;

                setTitle(resource.title);
                setSubject(resource.subject);
                setDepartment(resource.department);
                setSemester(resource.semester);
                setAcademicYear(resource.academicYear);
                setResourceType(resource.resourceType);
                setDescription(resource.description || "");

            } catch (error) {
                setError(
                    error.response?.data?.message ||
                    "Failed to load resource"
                );
            }
        }

        getResource();
    }, [id]);

    async function handleSubmit(event) {
        event.preventDefault();

        setMessage("");
        setError("");

        try {
            const response = await api.put(
                `/resource/updateResource/${id}`,
                {
                    title,
                    subject,
                    department,
                    semester,
                    academicYear,
                    resourceType,
                    description
                }
            );

            setMessage(response.data.message);

            setTimeout(() => {
                navigate("/resources");
            }, 1000);

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to update resource"
            );
        }
    }

    return (
        <main className="edit-page">
            <div className="edit-container">

                <h1>Edit Resource</h1>

                <p>
                    Update the resource information.
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
                            <option value="">Select department</option>
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
                            <option value="">Select semester</option>

                            {[1, 2, 3, 4, 5, 6, 7, 8].map(
                                (sem) => (
                                    <option key={sem} value={sem}>
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
                            value={description}
                            onChange={(event) =>
                                setDescription(event.target.value)
                            }
                        />
                    </div>

                    <div className="edit-actions">

                        <button type="submit">
                            Update Resource
                        </button>

                        <button
                            type="button"
                            className="cancel-button"
                            onClick={() => navigate("/resources")}
                        >
                            Cancel
                        </button>

                    </div>

                </form>
            </div>
        </main>
    );
}

export default EditResource;
