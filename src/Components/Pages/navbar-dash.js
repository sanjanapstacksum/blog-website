import "bootstrap/dist/css/bootstrap.min.css";
// import "../../Layout/Navbar.css"
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { getAuth, signOut } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";


const NavDash = () => {
  const auth = getAuth();
  const navigte = useNavigate();
  
  const user = auth.currentUser;
  if(user)
  {sessionStorage.setItem("displayName",user?.displayName)}
  
 var loginUser= sessionStorage.getItem('displayName')

  const logOut = (e) => {
    e.preventDefault();

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success m-2",
        cancelButton: "btn btn-danger mr-2",
        margin: "10px",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",

        icon: "warning",
        showCancelButton: true,
        confirmButtonText: `Logout `,
        cancelButtonText: " Cancel",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire(
            "",
            "You have successfully logged out!.",
            "success"
          );
          signOut(auth)
            .then(() => {
              navigte("/auth/login");
              sessionStorage.clear();
            })
            .catch((error) => {});
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire("Cancelled", "", "error");
        }
      });
  };
 

  return (
    <>
     <nav class="navbar navbar-expand-lg navbar-light " id="navbar">
        <a class="navbar-brand" href="/" id="blog-maker">
          Blog-Maker
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
             
            </li>
          </ul>
          <div class="btn-group">
            <div class="dropdown">
              <button
                class="btn btn-success dropdown-toggle"
                type="button"
                id="dropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Hello! {loginUser}😊
              </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                
                <li>
                  <a class="dropdown-item" href="/" onClick={(e)=>{e.preventDefault(); navigte('/auth/register')}}>
                    Registration
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="/" onClick={logOut}>
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
export default NavDash;
