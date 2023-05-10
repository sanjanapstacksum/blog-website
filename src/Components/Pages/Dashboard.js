import { useNavigate } from "react-router-dom";
import Navbar from "../../Layout/Navbar";
import "./Dashboard.css";
import NavDash from "./navbar-dash";
import { auth, db } from "../../Firebase/Config";
import React, { useState, useEffect  } from "react";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { collection, getDocs } from "firebase/firestore";

const Dashboard = () => {
  const [info, setInfo] = useState([]);
  const navigate = useNavigate()


  const fetchPost = async () => {
    await getDocs(collection(db, "users")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setInfo(newData);
    });
  };
 
  localStorage.setItem("information-user",JSON.stringify(info))
  const getItem = JSON.parse(localStorage.getItem("information-user"))
  console.log(getItem,"gi")
  useEffect(() => {
    fetchPost();
  }, []);

  
  return (
    <>
      <div class="container-fluid">
        <div class="row ">
          <div
            class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark"
            id="slider"
          >
            <div class="d-flex flex-column align-items-center  px-3 pt-2 text-white min-vh-100">
             
            
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
                    <span class="ms-1 d-none d-sm-inline text">User</span>{" "}
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
                  {info?.map((user, index) => (
                    <tr>
                      <th scope="row">{index + 1}</th>
                      <td>{user.displayName}</td>
                      <td>{user.email}</td>
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
export default Dashboard;
