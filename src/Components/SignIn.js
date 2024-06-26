import React, { useRef } from "react";

import { useNavigate } from "react-router-dom";
import { authActions } from "../Store/AuthSlice";
import { useDispatch } from "react-redux";

const SignIn = () => {
  const emailinputref = useRef();
  const passwordinputref = useRef();
  const Navigate = useNavigate();

  const dispatch = useDispatch();

  const submitHandler = (event) => {
    event.preventDefault();

    const useremail = emailinputref.current.value;
    const userpassword = passwordinputref.current.value;

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDuzV31KFVM_yKHIekGdzBogdlZRYWcMyU",
      {
        method: "POST",
        body: JSON.stringify({
          email: useremail,
          password: userpassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errormessage = "Authentication Failed";
            if (data && data.error && data.error.message) {
              errormessage = data.error.message;
            }
            throw new Error(errormessage);
          });
        }
      })
      .then((data) => {
        localStorage.setItem("isLogin", true);
        console.log(data);
        dispatch(authActions.login(data.idToken));
        localStorage.setItem("email", useremail);

        Navigate("/mail");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const handleClick = () => {
    Navigate("/SignUp");
  };
  return (
    <>
      <img
        src="https://png.pngtree.com/thumb_back/fh260/background/20211108/pngtree-abstract-blue-plain-background-with-modern-style-and-dynamic-lines-image_915412.png"
        alt="image"
        style={{
          width: "100%",
          height: "auto",
          maxWidth: "100%",
          display: "block",
          margin: "auto",

          pointerEvents: "none",
        }}
      />
      <div
        className="container-xl"
        style={{
          position: "fixed",
          top: "50%",
          left: "100%",
          transform: "translate(-50%, -50%)",
          backgroundSize: "cover",
        }}
      >
        <h2>SignIn</h2>
        <form onSubmit={submitHandler}>
          <div className="mb-7 col-4">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              ref={emailinputref}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              required
            />
          </div>
          <div className="mb-7 col-4">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              ref={passwordinputref}
              className="form-control"
              id="exampleInputPassword1"
              required
            />
          </div>
          <br />

          <button type="submit" className="  btn btn-primary">
            Login
          </button>
        </form>
        <div></div>

        <a href="SignIn" class="link-danger">
          Forgot Password
        </a>
        <br />
        <br />

        <span className=" mb-7 col-4  ">Create an Account </span>
        <button onClick={handleClick} className="  btn btn-secondary ">
          Go to Signup
        </button>
      </div>
    </>
  );
};
export default SignIn;
