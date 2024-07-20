import React from "react";
import Navigate from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = sessionStorage.getItem("token");
//   const navigate = useNavigate();

  if (!token) {
    return <Navigate to="/" replace={true}/>
  }
  return children;
};

export default ProtectedRoute;
