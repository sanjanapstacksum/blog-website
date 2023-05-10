import Blog from "../Components/Pages/Blog";
import Login from "../Components/Pages/login";
import Register from "../Components/Pages/Register";
import MainLayout from "../Layout/MainLayout";
import AuthenticationLayout from "../Layout/AuthenticationLayout";
import Profile from "../Components/Pages/Profile";
import NoPagelayOut from "../Layout/Nopage";
import NoPageFound from "../Layout/NoPageFound";
import AboutUs from "../Components/Pages/AboutUs";
import Admin from "../Layout/Admin";
import Dashboard from "../Components/Pages/Dashboard";
import BlogAdmin from "../Components/Pages/BlogAdmin";

const Router = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Blog/> },
      { path: "/profile", element: <Profile /> },
      { path: "/about-us", element: <AboutUs/> },
    ],
  },
  {
    path: "auth",
    element: <AuthenticationLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
  {
    path: "*",
    element: <NoPageFound />,
    children: [
      { path: "*", element: <NoPagelayOut/> },
     
    ],
  },
  {
    path: "admin",
    element: <Admin />,
    children: [
      { path: "dashboard", element: <Dashboard /> },
      { path: "blog", element: <BlogAdmin/> },
     
    ],
  },
];
export default Router;
