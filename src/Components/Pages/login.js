import React, { useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const auth = getAuth();

  const nevigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setSuccessMsg("Logged in Successfully :)");
       sessionStorage.setItem("user-email", email);
        setEmail("");
        setPassword("");
        setErrorMsg("");
        setTimeout(() => {
          setSuccessMsg("");
          var loginUser= sessionStorage.getItem('user-email')
         
          loginUser ? nevigate("/"): nevigate('/auth/login')
        }, 3000);
      })
      .catch((error) => {
        if (error.message === "Firebase: Error (auth/invalid-email).") {
          setErrorMsg("Please fill required field");
        }
        if (error.message === "Firebase: Error (auth/user-not-found).") {
          setErrorMsg("Email Not Found");
        }
        if (error.message === "Firebase: Error (auth/wrong-password).") {
          setErrorMsg("Please enter correct password");
        }
      });
  };
  return (
    <div>
      <section
        className=""
        style={{
          marginTop: "5%",
        }}
      >
        <div className="px-4 py-5 px-md-5 text-center text-lg-start">
          <div className="container">
            <div className="row gx-lg-5 align-items-center">
              <div className="col-lg-6 mb-5 mb-lg-0">
                <h1 className="my-5 display-3 fw-bold ls-tight">
                  Blog Maker <br />
                </h1>
                <p style={{ color: "#4a2f2f" }}>
                  <h4>
                    {" "}
                    You can create,edit delete your own blogs and can see others
                    too. Enjoyy.....
                  </h4>
                </p>
              </div>

              <div className="col-lg-6 mb-5 mb-lg-0">
                <div className="card">
                  <div
                    className="card-body py-5 px-md-5"
                    style={{
                      boxShadow:
                        " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                    }}
                  >
                    {successMsg && (
                      <>
                        <div className="succ-msg">{successMsg}</div>
                      </>
                    )}
                    {errorMsg && (
                      <>
                        <div className="error-msg">{errorMsg}</div>
                      </>
                    )}
                    <form>
                      <h1 style={{ marginBottom: "39px" }}>Sign IN</h1>

                      <div className="form-outline mb-4">
                        <input
                          type="email"
                          id="form3Example3"
                          className="form-control"
                          placeholder="email"
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
                        />
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="password"
                          id="form3Example4"
                          className="form-control"
                          placeholder="Password"
                          onChange={(e) => {
                            setPassword(e.target.value);
                          }}
                        />
                      </div>

                      <div className="form-check d-flex justify-content-center mb-4"></div>

                      <button
                        type="submit"
                        className="btn btn-primary btn-block mb-4"
                        style={{ background: "#2d4a74" }}
                        onClick={handleSubmit}
                      >
                        Sign In
                      </button>
                      <h5>
                        Dont have an account?
                        <Link to="/auth/register"> Sign Up</Link>
                      </h5>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
