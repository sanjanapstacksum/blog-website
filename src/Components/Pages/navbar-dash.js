import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router";
import { getAuth, signOut } from "firebase/auth";
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
     <nav className="navbar navbar-expand-lg navbar-light " id="navbar">
        <a className="navbar-brand" href="/" id="blog-maker">
          Blog-Maker
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
             
            </li>
          </ul>
          <div className="btn-group">
            <div className="dropdown">
              <button
                className="btn btn-success dropdown-toggle"
                type="button"
                id="dropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Hello! {loginUser}😊
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                
                <li>
                  <a className="dropdown-item" href="/" onClick={(e)=>{e.preventDefault(); navigte('/auth/register')}}>
                    Registration
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/" onClick={logOut}>
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
