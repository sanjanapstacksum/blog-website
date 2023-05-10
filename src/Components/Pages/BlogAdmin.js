/* eslint-disable jsx-a11y/anchor-has-content */
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import NavDash from "./navbar-dash";
import React, { useState } from "react";
import { deleteUsers, editUser } from "../../Store/BlogSlice";
import { useSelector, useDispatch } from "react-redux";
import { FiEdit } from "react-icons/fi";
import { BsCheckCircleFill } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";

import { toast, ToastContainer } from "react-toastify";

const BlogAdmin = () => {
  const blogList = useSelector((state) => state.list);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const [id, setId] = useState("");
  const [Text, setTitle] = useState("");
  const [Description, setDescription] = useState("");

  const handleEditBlogData = async (Text, Description, id) => {
    setEditMode(true);
    setId(id);
    setTitle(Text);
    setDescription(Description);
  };

  const handleUpdateBlogData = () => {
    dispatch(
      editUser({
        id: id,
        Text: Text,
        Description: Description,
      })
    );
    setEditMode(false);
    toast.success("Blog Updated Successefully");
    navigate("/admin/blog");
  };

  return (
    <>
      <ToastContainer />
      <div className="container-fluid">
        <div className="row ">
          <div
            className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark"
            id="slider"
          >
            <div className="d-flex flex-column align-items-center  px-3 pt-2 text-white min-vh-100">
              <a
                href="/"
                className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none"
              ></a>
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
                    <span
                      className="ms-1 d-none d-sm-inline text"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate("/admin/dashboard");
                      }}
                    >
                      User
                    </span>{" "}
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
            <div><h3 className="tableLength">Table Records:{blogList.length}</h3></div>
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
                  {blogList?.map((blog, index) => (
                    <tr key={blog.id}>
                      <th scope="row">{index + 1}</th>
                      {!editMode ? (
                        <td>{blog?.Text}</td>
                      ) : blog?.id === id ? (
                        <td>
                          <input
                            value={Text}
                            onChange={(e) => setTitle(e.target.value)}
                          />
                        </td>
                      ) : (
                        <td>{blog?.Text}</td>
                      )}

                      {!editMode ? (
                        <td>{blog?.Description}</td>
                      ) : blog?.id === id ? (
                        <td>
                          <input
                            value={Description}
                            onChange={(e) => setDescription(e.target.value)}
                          />
                        </td>
                      ) : (
                        <td>{blog?.Description}</td>
                      )}
                      <td>
                        {!editMode ? (
                          <FiEdit
                            className="deletee"
                            onClick={() =>
                              handleEditBlogData(
                                blog?.Text,
                                blog?.Description,
                                blog?.id
                              )
                            }
                          />
                        ) : (
                          <BsCheckCircleFill
                            onClick={() => handleUpdateBlogData()}
                          />
                        )}
                        <AiFillDelete
                          type="button"
                          className="editt"
                          onClick={() => {
                            dispatch(deleteUsers({ id: blog.id }));
                            toast.success("Blog Deleted Successefully");
                          }}
                        >
                          Delete
                        </AiFillDelete>
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
