import { useState } from "react";
import Navbar from "../../Layout/Navbar";
import "./Blog.css";
import { useSelector, useDispatch } from "react-redux";
import { addUSers } from "../../Store/BlogSlice";
import { v4 as uuidv4 } from "uuid";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAuth } from "firebase/auth";

const Blog = (props) => {
  const [Text, setText] = useState("");
  const [Description, setDescription] = useState("");
  const [errorMsgDiv, setErrorMsgDiv] = useState("");
  const [pages, setPages] = useState("");
  const [seach, setSearch] = useState("");

  const userList = useSelector((state) => state.list);
  const dispatch = useDispatch();
  const auth = getAuth();

  const user = auth.currentUser;

  const changeHandle = (e) => {
    setPages(e.target.value);
  };

  const filter = userList.filter((user) =>
    user?.Text.toLowerCase().includes(pages.toLowerCase())
  );

  const submit = (e) => {
    e.preventDefault();

    var isValid = true;

    if (!Text || !Description) {
      setErrorMsgDiv({
        Text: !Text ? " * Please Enter Text" : "",
        Description: !Description ? " * Please Enter Description" : "",
      });
      isValid = false;
    }
    if (isValid) {
      dispatch(
        addUSers({ id: uuidv4(), Text, Description, name: user.displayName })
      );

      toast.success("Blog Added Successfully");
    }
  };

  const searchClick = (e) => {
    e.preventDefault();
  };

  var today = new Date();
  const date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  var todayDate = new Date();
  const curTime =
    todayDate.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

  return (
    <>
      <Navbar />
      <form className="d-flex" id="search">
        <input
          className="form-control "
          type="search"
          placeholder="Search"
          aria-label="Search"
          onChange={changeHandle}
        />
        <button
          className="btn btn-navy"
          id="btn-search"
          type="submit"
          onClick={searchClick}
        >
          Search
        </button>
      </form>
      <form>
        <div className="row" id="form">
          <div className="col-1">
            <input
              type="text"
              className="form-control"
              placeholder="Title"
              onChange={(e) => {
                setText(e.target.value);
              }}
            />
            <span
              className="error"
              style={{
                display: !Text ? "block" : "none",
                color: "red",
              }}
            >
              {errorMsgDiv?.Text}
            </span>
          </div>
          <div className="col-2">
            <textarea
              rows="3"
              className="form-control"
              placeholder="Description"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
            <span
              className="error"
              style={{
                display: !Description ? "block" : "none",
                color: "red",
              }}
            >
              {errorMsgDiv?.Description}
            </span>
          </div>
          <div className="col-2">
            <button
              type="button"
              className="btn btn-primary"
              id="add"
              onClick={submit}
            >
              Add-blogs
            </button>
          </div>
        </div>
      </form>
      <ToastContainer />

      <div className="container">
        <>
          {filter?.map((blog) => (
            <div className="card" id="card" key={blog.id}>
              <div className="card__body">
                <span className="tag tag-blue" id="title">
                  <h4>{blog.Text}</h4>
                </span>
                <h5>👉{blog.Description}</h5>
                <h6>
                  {date} ,{curTime}
                </h6>
              </div>
            </div>
          ))}
          {filter.length === 0 ? (
            <h2 className="No-data">Oops!! No record found :(</h2>
          ) : (
            ""
          )}
        </>
      </div>
    </>
  );
};
export default Blog;
