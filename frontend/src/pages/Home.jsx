import "./Home.css";
import { Link } from "react-router-dom";

function Home() {
    return (
        <main className="home">
            <div className="home-content">
                <h1>Find Academic Resources</h1>

                <p>
                    Access question papers and assignments
                    for your semester and department.
                </p>

                <Link to="/resources">Browse Resources</Link>
            </div>
        </main>
    );
}

export default Home;