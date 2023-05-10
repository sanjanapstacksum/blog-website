import { Outlet, Navigate } from "react-router-dom";

const MainLayout = () => {
  var loginUser = sessionStorage.getItem("user-email");

//   return (
//     <div>
//       {loginUser !== "mitva@gmail.com" && loginUser ? (
//         <>
//           <Outlet />
//         </>
//       ) : (
//         <Navigate to="/admin/dashboard" />
//       )}
//     </div>
//   );
if (loginUser) {
    return (
      <div>
        {loginUser !== null && loginUser !== "mitva@gmail.com" ? (
          <>
            
            <Outlet />
          </>
        ) : (
          <Navigate to="/admin/dashboard" />
        )}
      </div>
    );
  } else {
    return <Navigate to="/auth/login" />;
  }
};

export default MainLayout;
