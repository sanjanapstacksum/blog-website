import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import NavDash from "./navbar-dash";
import {  db } from "../../Firebase/Config";
import React, { useState, useEffect  } from "react";
import { collection, getDocs } from "firebase/firestore";
import { useSelector } from "react-redux";

const BlogAdmin = () => {
 
    const blogList = useSelector((state) => state.list);
    const navigate = useNavigate();

  
  return (
    <>
      <div class="container-fluid">
        <div class="row ">
          <div
            class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark"
            id="slider"
          >
            <div class="d-flex flex-column align-items-center  px-3 pt-2 text-white min-vh-100">
             
            
              <a href="/"
                className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none"
              ></a>
              <ul
                class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center "
                id="menu"
              >
                <li>
                  <a
                    href="#submenu1"
                    data-bs-toggle="collapse"
                    class="nav-link px-0 align-middle"
                  >
                    <i class="fs-4 bi-speedometer2"></i>{" "}
                    <span class="ms-1 d-none d-sm-inline text"onClick={(e)=>{e.preventDefault(); navigate('/admin/dashboard')}}>User</span>{" "}
                  </a>
                  <ul
                    class="collapse show nav flex-column ms-1"
                    id="submenu1"
                    data-bs-parent="#menu"
                  ></ul>
                </li>
                <li>
                  <a href="/" class="nav-link px-0 align-middle">
                    <i class="fs-4 bi-table"></i>{" "}
                    <span class="ms-1 d-none d-sm-inline text" onClick={(e)=>{e.preventDefault(); navigate('/admin/blog')}}>Blogs</span>
                  </a>
                </li>
              </ul>
              <hr />
            </div>
          </div>
          <div class="col" id="navbar-admin">
            <NavDash />
            <div className="container" id="cont">
              <table class="table table-striped ">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Username</th>
                    <th scope="col">Email</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {blogList?.map((blog, index) => (
                    <tr>
                      <th scope="row">{index + 1}</th>
                      <td>{blog.Text}</td>
                      <td>{blog.Description}</td>
                      <td>
                        <button type="button" class="btn btn-success">
                          Edit
                        </button>
                        <button type="button" class="btn btn-danger edit">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default BlogAdmin;
