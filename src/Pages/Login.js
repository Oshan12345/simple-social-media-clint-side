import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../App";
import Navbar from "../Components/Navbar";

const Login = () => {
  const { state, dispatch } = useContext(UserContext);

  const history = useHistory();
  const [signUpInfo, setSignUpInfo] = useState({
    email: "",
    password: "",
  });
  const [displayMessage, setDisplayMessage] = useState({});
  const [isDisplayMessage, setIsDisplayMessage] = useState(false);
  const inputChange = (e) => {
    const userInfo = { ...signUpInfo };
    userInfo[e.target.name] = e.target.value;
    setSignUpInfo(userInfo);
  };
  const handleLogin = (e) => {
    e.preventDefault();

    fetch("/logIn", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signUpInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.isLoggedIn) {
          localStorage.setItem("instragram-jwt", JSON.stringify(data));
          setSignUpInfo({});
          dispatch({ type: "USER", payload: data });

          return history.push("/");
        }
        handleLoginConfirmation(data);
      })
      .catch((err) => console.log(err));
  };

  const handleLoginConfirmation = (data) => {
    setDisplayMessage(data);
    data.isLoggedIn === false && triggerMessage();
  };
  const triggerMessage = () => {
    setIsDisplayMessage(true);
    setTimeout(() => {
      setIsDisplayMessage(false);
      setDisplayMessage({});
    }, 10000);
  };

  return (
    <div>
      <Navbar />

      <div className="card m-auto mt-5" style={{ maxWidth: 500 }}>
        {isDisplayMessage && (
          <div
            className={`m-3 p-4 ${
              displayMessage.isSignedUp ? "bg-success" : "bg-danger"
            }`}
          >
            <p>{displayMessage.message}</p>
          </div>
        )}
        <div className="card-body">
          <form>
            <legend
              className="text-center"
              style={{
                fontFamily: "Grand Hotel, cursive",
                fontSize: 18,
                fontWeight: 700,
              }}
            >
              Buddy-zone
            </legend>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control form-control-sm"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                name="email"
                onBlur={inputChange}
              />
              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control form-control-sm"
                id="exampleInputPassword1"
                name="password"
                onBlur={inputChange}
              />
            </div>

            <button
              type="submit"
              onClick={(e) => handleLogin(e)}
              className="btn btn-primary w-100"
            >
              Login
            </button>
          </form>
          <Link to="/reset" className="text-center p-1">
            <p>Forgot Password? </p>
          </Link>
          <Link to="/signup" className="text-center p-1">
            <p>Don't have an account? Sign In</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
