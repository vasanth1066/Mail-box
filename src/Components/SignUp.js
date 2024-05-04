import React, { Fragment, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const emailinputref = useRef();
  const passwordinputref = useRef();
  const confirmpasswordinputref = useRef();
  const [passwordError, setPasswordError] = useState("");
  const Navigate = useNavigate();

  const submitHandler = (event) => {
    event.preventDefault();
    const useremail = emailinputref.current.value;
    const userpassword = passwordinputref.current.value;
    const userconfirmpassword = confirmpasswordinputref.current.value;
    if (userpassword !== userconfirmpassword) {
      setPasswordError("Passwords don't match");
      return;
    }

    setPasswordError("");
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDuzV31KFVM_yKHIekGdzBogdlZRYWcMyU",
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
        console.log(data);
        Navigate("/SignIn");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const handleClick = () => {
    Navigate("/SignIn");
  };

  return (
    <Fragment>
      <img
        src="https://png.pngtree.com/thumb_back/fh260/background/20211108/pngtree-abstract-blue-plain-background-with-modern-style-and-dynamic-lines-image_915412.png"
        alt="image"
        style={{
          width: "100vw",
          height: "100vh",
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
        <h2>Signup</h2>
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
          <div className="mb-3 col-4">
            <label htmlFor="exampleInputPassword2" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              ref={confirmpasswordinputref}
              className="form-control"
              id="exampleInputPassword2"
              required
            />
            {passwordError && (
              <div className="invalid-feedback d-block">{passwordError}</div>
            )}
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>

        <span>Already Have an Account </span>
        <button onClick={handleClick} className="btn btn-secondary ">
          Go to Login Page
        </button>
      </div>
    </Fragment>
  );
};

export default SignUp;
