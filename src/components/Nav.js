import { Link } from "react-router-dom";

export default function Nav() {
    return (
        <nav className="navbar navbar-expand-lg bg-primary text-white">
            <div className="container">
                <Link to="/" className="navbar-brand">Intern House</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Job Posting</Link>
                        </li>
                         <li className="nav-item">
                            <Link className="nav-link" to="/postAJob">Post a Job</Link>
                         </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}