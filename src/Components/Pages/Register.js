import React, { useState } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../../Firebase/Config";
import { setDoc, doc } from "firebase/firestore";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";



function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [lastname, setlastname] = useState("");
  const [password, setPassword] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [errorMsgDiv, setErrorMsgDiv] = useState("");

  const navigate = useNavigate();
  const onSubmit = (e) => {
    e.preventDefault();

    var isValid = true;

    if (!name || !lastname || !email || !password) {
      setErrorMsgDiv({
        name: !name ? "Please Enter name" : "",
        lastname: !lastname ? "Please Enter last name" : "",
        email: !email ? "Please Enter email" : "",
        password: !password ? "Please Enter password" : "",
      });
      isValid = false;
    }

    if (isValid) {
      createUserWithEmailAndPassword(auth, email, password, {
        displayName: "sldj",
      })
        .then((response) => {
          console.log("response", response);
          updateProfile(auth.currentUser, {
            displayName: name,
          })
            .then(() => {
              // Profile updated!
              // ...
            })
            .catch((error) => {
              // An error occurred
              // ...
            });
          setDoc(doc(db, "users", response?.user?.uid), {
            email: email,
            displayName: name,
            role: "user",
            id: response?.user?.uid,
          }).then((docResponse) => {
            setSuccessMsg("Registered Successfully :)");
            setTimeout(() => {
              navigate("/auth/login");
            }, 3000);
          });
        })
        .catch((error) => {
          if (
            error.message === "Firebase: Error (auth/email-already-in-use)."
          ) {
            setTimeout(() => {
              setErrorMsg("User already exists");
            }, 1000);
            setErrorMsg("");
          }
        });
    }
  };
  return (
    <div>
      <ToastContainer />
      <section
        className=""
        style={{
          marginTop: "2%",
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
                    <form onSubmit={onSubmit}>
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

                      <h1 style={{ marginBottom: "39px" }}>Sign Up</h1>
                      <div className="row">
                        <div className="col-md-6 mb-4">
                          <div className="form-outline">
                            <input
                              type="text"
                              id="form3Example1"
                              className="form-control"
                              placeholder="First name"
                              name="name"
                              onChange={(e) => setName(e.target.value)}
                            />
                            <span
                              style={{
                                display: !name ? "block" : "none",
                                color: "red",
                              }}
                            >
                              {errorMsgDiv?.name}
                            </span>
                          </div>
                        </div>
                        <div className="col-md-6 mb-4">
                          <div className="form-outline">
                            <input
                              type="text"
                              id="form3Example2"
                              className="form-control"
                              placeholder="Last name"
                              name="lastname"
                              onChange={(e) => setlastname(e.target.value)}
                            />
                            <span
                              style={{
                                display: !lastname ? "block" : "none",
                                color: "red",
                              }}
                            >
                              {errorMsgDiv?.lastname}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="email"
                          id="form3Example3"
                          className="form-control"
                          placeholder="email"
                          name="email"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <span
                          style={{
                            display: !email ? "block" : "none",
                            color: "red",
                          }}
                        >
                          {errorMsgDiv?.email}
                        </span>
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="password"
                          id="form3Example4"
                          className="form-control"
                          placeholder="password"
                          name="password"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <span
                          style={{
                            display: !password ? "block" : "none",
                            color: "red",
                          }}
                        >
                          {errorMsgDiv?.password}
                        </span>
                      </div>

                      <div className="form-check d-flex justify-content-center mb-4"></div>

                      <button
                        type="submit"
                        className="btn btn-primary btn-block mb-4"
                        style={{ background: "#2d4a74" }}
                      >
                        Sign up
                      </button>
                      <h5>
                        already have an account?
                        <Link to="/auth/login"> Sign In</Link>
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

export default Register;
