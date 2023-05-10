import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import NavDash from "./navbar-dash";
import { db } from "../../Firebase/Config";
import React, { useState, useEffect } from "react";

import { BsCheckCircleFill } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { MdCancel } from "react-icons/md";

import {
  getDocs,
  collection,
  doc,
  deleteDoc,
  runTransaction,
} from "firebase/firestore";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [info, setInfo] = useState([]);
  const [editMode, setEditMode] = useState(false);

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const fetchPost = async () => {
    await getDocs(collection(db, "users")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setInfo(newData);
    });
  };

  localStorage.setItem("information-user", JSON.stringify(info));

  useEffect(() => {
    fetchPost();
  }, [info]);

  const deleteUser = (id) => {
    deleteDoc(doc(db, "users", id));
  };

  const handleEditUserData = async (name, email, id) => {
    setEditMode(true);
    setId(id);
    setName(name);
    setEmail(email);
  };
  const handleUpdateUserData = async () => {
    const sfDocRef = doc(db, "users", id);
    try {
      await runTransaction(db, async (transaction) => {
        const sfDoc = await transaction.get(sfDocRef);
        if (!sfDoc.exists()) {
        }
        const newName = (sfDoc.data().displayName = name);
        const newEmail = (sfDoc.data().email = email);
        transaction.update(sfDocRef, {
          displayName: newName,
          email: newEmail,
        });
      });
      toast.success("User Info Updated Successefully");
      setEditMode(false);
    } catch (e) {
      toast.error("Transaction failed: ", e);
    }
  };
  return (
    <>
      <div className="container-fluid">
        <div className="row ">
          <div
            className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark"
            id="slider"
          >
            <div className="d-flex flex-column align-items-center  px-3 pt-2 text-white min-vh-100">
              <ul
                className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center "
                id="menu"
              >
                <li>
                  <a
                    href="#submenu1"
                    data-bs-toggle="collapse"
                    className="nav-link px-0 align-middle"
                  >
                    <i className="fs-4 bi-speedometer2"></i>{" "}
                    <span className="ms-1 d-none d-sm-inline text">User</span>{" "}
                  </a>
                  <ul
                    className="collapse show nav flex-column ms-1"
                    id="submenu1"
                    data-bs-parent="#menu"
                  ></ul>
                </li>
                <li>
                  <a href="/" className="nav-link px-0 align-middle">
                    <i className="fs-4 bi-table"></i>{" "}
                    <span
                      className="ms-1 d-none d-sm-inline text"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate("/admin/blog");
                      }}
                    >
                      Blogs
                    </span>
                  </a>
                </li>
              </ul>
              <hr />
            </div>
          </div>
          <div className="col" id="navbar-admin">
            <NavDash />
            <div>
              <h3 className="tableLength">Table Records:{info.length}</h3>
            </div>
            <div className="container" id="cont">
              <table className="table table-striped ">
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
                    <tr key={user.id}>
                      <th scope="row">{index + 1}</th>
                      {!editMode ? (
                        <td>{user?.displayName}</td>
                      ) : user?.id === id ? (
                        <td>
                          <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </td>
                      ) : (
                        <td>{user?.displayName}</td>
                      )}

                      {!editMode ? (
                        <td>{user?.email}</td>
                      ) : user?.id === id ? (
                        <td>
                          <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </td>
                      ) : (
                        <td>{user?.email}</td>
                      )}
                      <td>
                        {!editMode ? (
                          <FiEdit
                            onClick={() =>
                              handleEditUserData(
                                user?.displayName,
                                user?.email,
                                user?.id
                              )
                            }
                          />
                        ) : (
                          <BsCheckCircleFill
                            onClick={() => handleUpdateUserData()}
                          />
                        )}

                        <MdCancel
                          type="button"
                          className="edit"
                          onClick={(e) => {
                            e.preventDefault();
                            deleteUser(user.id);
                          }}
                        >
                          Delete
                        </MdCancel>
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
