import { useState } from "react";
import Navbar from "../../Layout/Navbar";
import "./Blog.css";
import { useSelector, useDispatch } from "react-redux";
import { addUSers } from "../../Store/BlogSlice";
import { v4 as uuidv4 } from "uuid";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAuth, signOut } from "firebase/auth";

const Blog = () => {
  const [Text, setText] = useState("");
  const [Description, setDescription] = useState("");
  const [errorMsgDiv, setErrorMsgDiv] = useState("");
  const [pages, setPages] = useState("");
 

  const userList = useSelector((state) => state.list);
  const dispatch = useDispatch();
  const auth = getAuth();
  console.log(userList)
  
  
  const user = auth.currentUser;

  const changeHandle = (e) => {
    setPages(e.target.value);
  };

  const filter = userList.filter(user => user?.Text.toLowerCase().includes(pages.toLowerCase()))
  console.log(userList,"ul")

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
      dispatch(addUSers({ id: uuidv4(), Text, Description , name:user.displayName }));
      console.log(userList);
      toast.success("Blog Added Successfully");
    }
  }
  if(filter===""){
    console.log("gyi8s8wd")
  }
  return (
    <>
      <Navbar />
      <form class="d-flex" id="search">
        <input
          class="form-control "
          type="search"
          placeholder="Search"
          aria-label="Search"
          onChange={changeHandle}
        />
        <button class="btn btn-navy" id="btn-search" type="submit">
          Search
        </button>
      </form>
      <form>
        <div class="row" id="form">
          <div class="col-1">
            <input
              type="text"
              class="form-control"
              placeholder="Title"
              onChange={(e) => {
                setText(e.target.value);
              }}
            />
            <span
              class="error"
              style={{
                display: !Text ? "block" : "none",
                color: "red",
              }}
            >
              {errorMsgDiv?.Text}
            </span>
          </div>
          <div class="col-2">
            <input
              type="text"
              class="form-control"
              placeholder="Description"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
            <span
              class="error"
              style={{
                display: !Description ? "block" : "none",
                color: "red",
              }}
            >
              {errorMsgDiv?.Description}
            </span>
          </div>
          <div class="col-2">
            <button
              type="button"
              class="btn btn-primary"
              id="add"
              onClick={submit}
            >
              Add-blogs
            </button>
          </div>
        </div>
      </form>
      <ToastContainer />
     
      <div class="container">
        <>
          {filter?.map((blog) => (
            <div class="card" id="card">
              <div class="card__body">
                <span class="tag tag-blue" id="title">
                  <h4>{blog.Text}</h4>
                </span>
                <h3>{blog.Description}</h3>
              </div>
            </div>
          ))}
          {filter.length===0 ? <h2 className="No-data">Oops!! No record found :(</h2>:""}
        </>
      </div>
    </>
  );
};
export default Blog;
