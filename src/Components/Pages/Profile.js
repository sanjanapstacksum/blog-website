import Navbar from "../../Layout/Navbar";
import "./Profile.css";
import { useSelector } from "react-redux";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { useAuth, upload } from "../../Firebase/Config";


const Profile = () => {
  const userList = useSelector((state) => state.list);
  var loginUser = sessionStorage.getItem("displayName");
  var loginEmail = sessionStorage.getItem("user-email");

  const auth = getAuth();
  const currentUser = useAuth();
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [photoURL, setPhotoURL] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
  );

  const user = auth.currentUser;
  const displayName = user?.displayName;
  const personalList = userList.filter((name) => name.name === displayName);


  function handleChange(e) {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  }

  function handleClick() {
    upload(photo, currentUser, setLoading);
  }
  useEffect(() => {
    if (currentUser?.photoURL) {
      setPhotoURL(currentUser.photoURL);
    }
  }, [currentUser]);
  localStorage.setItem("image", photoURL);

  var today = new Date();
  const date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  var todayDate = new Date();
  const curTime =
    todayDate.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

  return (
    <>
      <Navbar />

      <div className="container" id="container">
        <div className="card">
          <div className="face face1" id="cardd">
            <div className="content">
              <img src={photoURL} alt="" style={{ width: "300px",
height:" 200px"}}/>
            </div>
          </div>
          <div
            className="face face2"
            id="card-inner"
            
          >
            <div className="content">
              <p>
                <h4>{loginUser}</h4>
              </p>
              <p>
                <h5>{loginEmail}</h5>
              </p>
              <input
                type="file"
                className="file"
                onChange={handleChange}
              ></input>
              <div>
                <button
                  type="button"
                  id="upload"
                  class="btn btn-primary"
                  disabled={loading || !photo}
                  onClick={handleClick}
                >
                  Upload Picture
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="my-blog">
        <h1>My Blogs</h1>
      </div>
      <div className="container">
        <>
          {personalList?.map((blog) => (
            <div className="card" id="card" key={blog.id}>
              <div className="card__body">
                <span className="tag tag-blue" id="title">
                  <h4>{blog.Text}</h4>
                </span>
                <h5>{blog.Description}</h5>
                <h6>
                  {date} ,{curTime}
                </h6>
               
              </div>
            </div>
          ))}
          {personalList.length === 0 ? (
            <h2 className="No-data">Oops!! No record found :(</h2>
          ) : (
            ""
          )}
        </>
      </div>
    </>
  );
};
export default Profile;
