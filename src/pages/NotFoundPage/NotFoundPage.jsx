// import React from 'react'

// const NotFoundPage = () => {
//   return (
//     <div>NotFoundPage</div>
//   )
// }

// export default NotFoundPage

import React from "react";
import { useNavigate } from "react-router-dom";
import "./NotFoundPage.style.css";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="notfound-container">
      <h1 className="notfound-heading">404</h1>
      <p className="notfound-subheading">Not Found</p>
      <button
        className="gohome-button"
        onClick={() => navigate("/")}
      >
        Go Home
      </button>
    </div>
  );
};

export default NotFoundPage;