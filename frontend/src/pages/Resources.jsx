
import { useEffect, useState } from "react";
import api from "../services/api";
import "./Resources.css";

function Resources() {
    const [resources, setResources] = useState([]);

    const [department, setDepartment] = useState("");
    const [semester, setSemester] = useState("");
    const [resourceType, setResourceType] = useState("");
    const [academicYear, setAcademicYear] = useState("");
    const [subject, setSubject] = useState("");

    async function getResources() {
        try {
            const response = await api.get(
                "/resource/getAllResources",
                {
                    params: {
                        department,
                        semester,
                        resourceType,
                        academicYear,
                        subject
                    }
                }
            );

            setResources(response.data.resources);
        } catch (error) {
            console.log(error.response?.data);
        }
    }

    async function downloadResource(id, fileName) {
        try {
            const response = await api.get(
                `/resource/download/${id}`,
                {
                    responseType: "blob"
                }
            );

            const url = window.URL.createObjectURL(
                new Blob([response.data])
            );

            const link = document.createElement("a");

            link.href = url;
            link.download = fileName;

            document.body.appendChild(link);

            link.click();

            link.remove();

            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.log(error.response?.data);
        }
    }

    useEffect(() => {
        getResources();
    }, []);

    function handleFilter() {
        getResources();
    }

    function clearFilters() {
        setDepartment("");
        setSemester("");
        setResourceType("");
        setAcademicYear("");
        setSubject("");

        setTimeout(() => {
            getResources();
        }, 0);
    }

    return (
        <main className="resources-page">

            <div className="resources-header">
                <h1>Resources</h1>

                <p>
                    Find question papers and assignments for your studies.
                </p>
            </div>

            <div className="filters">

                <select
                    value={department}
                    onChange={(event) =>
                        setDepartment(event.target.value)
                    }
                >
                    <option value="">All Departments</option>
                    <option value="CSE">CSE</option>
                    <option value="ECE">ECE</option>
                    <option value="EEE">EEE</option>
                    <option value="IT">IT</option>
                    <option value="MMECH">MMECH</option>
                </select>

                <select
                    value={semester}
                    onChange={(event) =>
                        setSemester(event.target.value)
                    }
                >
                    <option value="">All Semesters</option>

                    {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                        <option key={sem} value={sem}>
                            Semester {sem}
                        </option>
                    ))}
                </select>

                <select
                    value={resourceType}
                    onChange={(event) =>
                        setResourceType(event.target.value)
                    }
                >
                    <option value="">All Types</option>
                    <option value="Question Paper">
                        Question Paper
                    </option>
                    <option value="Assignment">
                        Assignment
                    </option>
                </select>

                <select
                    value={academicYear}
                    onChange={(event) =>
                        setAcademicYear(event.target.value)
                    }
                >
                    <option value="">All Years</option>
                    <option value="2025-26">2025-26</option>
                    <option value="2024-25">2024-25</option>
                    <option value="2023-24">2023-24</option>
                </select>

                <input
                    type="text"
                    placeholder="Search subject"
                    value={subject}
                    onChange={(event) =>
                        setSubject(event.target.value)
                    }
                />

                <button onClick={handleFilter}>
                    Filter
                </button>

                <button
                    className="clear-button"
                    onClick={clearFilters}
                >
                    Clear
                </button>

            </div>

            <div className="resources-list">

                {resources.length === 0 ? (
                    <p className="no-resources">
                        No resources found.
                    </p>
                ) : (
                    resources.map((resource) => (
                        <div
                            className="resource-card"
                            key={resource._id}
                        >
                            <h2>{resource.title}</h2>

                            <p className="resource-subject">
                                {resource.subject}
                            </p>

                            <div className="resource-details">
                                <span>
                                    {resource.department}
                                </span>

                                <span>
                                    Semester {resource.semester}
                                </span>

                                <span>
                                    {resource.resourceType}
                                </span>

                                <span>
                                    {resource.academicYear}
                                </span>
                            </div>

                            {resource.description && (
                                <p className="resource-description">
                                    {resource.description}
                                </p>
                            )}

                            <div className="resource-actions">

                                <a
                                    href={`http://localhost:3000/uploads/${resource.fileName}`}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    View PDF
                                </a>

                                <button
                                    onClick={() =>
                                        downloadResource(
                                            resource._id,
                                            resource.fileName
                                        )
                                    }
                                >
                                    Download
                                </button>

                            </div>
                        </div>
                    ))
                )}

            </div>
        </main>
    );
}

export default Resources;
