import React from "react";
import "./homepage.css";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <div className="main-home">
        <Link to="/tasks">
          <button className="btn-home">Start</button>
        </Link>
      </div>
    </>
  );
};

export default HomePage;
