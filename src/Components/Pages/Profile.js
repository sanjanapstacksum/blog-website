import Navbar from "../../Layout/Navbar";
import "./Profile.css";
import { useSelector } from "react-redux";
import { getAuth, signOut } from "firebase/auth";

const Profile = () => {
  const userList = useSelector((state) => state.list);
  var loginUser = sessionStorage.getItem("displayName");
  var loginEmail = sessionStorage.getItem("user-email");

  const auth = getAuth();

  const user = auth.currentUser;
  const displayName = user.displayName;
  userList.map((user)=>{
    console.log(user?.name)
  })

  userList.filter((item) => {
    // eslint-disable-next-line no-unused-expressions
    item?.name === displayName;
  
  });

  return (
    <>
      <Navbar />

      <div class="container" id="container">
        <div class="card">
          <div class="face face1" id="cardd">
            <div class="content">
              <img src="" alt="" />
              <h3>My Profile</h3>
              <h3>Click here!</h3>
            </div>
          </div>
          <div class="face face2" id="card-inner">
            <div class="content">
              <p>
                <h3>{loginUser}</h3>
              </p>
              <p>
                <h4>{loginEmail}</h4>
              </p>
              <a href="/">Read More</a>
            </div>
          </div>
        </div>
      </div>
      <div class="container">
        <>
          {userList?.map((blog) => (
            <div class="card" id="card">
              <div class="card__body">
                <span class="tag tag-blue" id="title">
                  <h4>{blog.Text}</h4>
                </span>
                <h3>{blog.Description}</h3>
              </div>
            </div>
          ))}
          {userList.length === 0 ? (
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
