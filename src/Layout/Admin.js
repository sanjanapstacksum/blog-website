import { Outlet, Navigate } from "react-router-dom";
import { useState } from "react";

const getItem = JSON.parse(localStorage.getItem("information-user"));

const Admin = () => {
  const found = getItem.find((blog) => blog.role === "admin");
  console.log(found.role);
  window.location.href = `auth/login`

  return (
    <>
      <Outlet />
    </>
  );
};
export default Admin;
