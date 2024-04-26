import React from "react";


function Header() {
    
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/">Profile</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
                <li className="nav-item active">
                    <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/add">Create Feedback</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/">All Feedbacks</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/">Update Feedbacks</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/">Delete Feedbacks</a>
                </li>
            
            </ul>
        </div>
    </nav>
);
}

export default Header;


