import { Outlet, Navigate } from "react-router-dom";

const Admin = () => {
  var loginUser = sessionStorage.getItem("user-email");

  return (
    <div>
      {loginUser === "mitva@gmail.com" ? (
        <>
          <Outlet />
        </>
      ) : (
        <Navigate to="/" />
      )}
    </div>
  );
};
export default Admin;
