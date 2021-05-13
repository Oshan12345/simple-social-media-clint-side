import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../App";
import SearchModal from "./SearchModal";

const Navbar = () => {
  const history = useHistory();
  const { state, dispatch } = useContext(UserContext);

  const handleLogOut = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("instragram-jwt");
    history.push("/login");
  };
  const renderList = () => {
    if (state) {
      return [
        <li className="nav-item mx-3  nav-item-style" key="n11">
          <SearchModal />
        </li>,

        <li className="nav-item mx-3 " key="n2">
          <Link
            to="/create-post"
            className="text-decoration-none text-white nav-item-style"
          >
            Create Post
          </Link>
        </li>,
        <li className="nav-item mx-3 " key="n8">
          <Link
            to="/myFollowingsPosts"
            className="text-decoration-none text-white nav-item-style"
          >
            Followings Post
          </Link>
        </li>,
        <li className="nav-item mx-3 " key="n7">
          <Link
            to="/messenger"
            className="text-decoration-none text-white nav-item-style"
          >
            Chat
          </Link>
        </li>,
        <li className="nav-item mx-3 " key="n1">
          <Link
            to="/profile"
            className="text-decoration-none text-white nav-item-style"
          >
            <i className="bi bi-person-circle ">
              <span className="mx-1">{state.name}</span>
            </i>
          </Link>
        </li>,
        <li className="nav-item mx-3 pointer " key="n5" onClick={handleLogOut}>
          LogOut
        </li>,
      ];
    } else {
      return [
        <li className="nav-item mx-3 " key="n3">
          <Link
            to="/login"
            className="text-decoration-none text-white nav-item-style"
          >
            Login
          </Link>
        </li>,
        <li className="nav-item mx-3 " key="n4">
          <Link
            to="/signup"
            className="text-decoration-none text-white nav-item-style"
          >
            SignUp
          </Link>
        </li>,
      ];
    }
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light  p-4 shadow-sm"
      style={{ backgroundColor: "#3f51b5", color: "white" }}
    >
      <div className="container-fluid">
        <div
          className="brand-logo black-text"
          style={{
            fontFamily: "Grand Hotel, cursive",
            fontSize: 25,
            fontWeight: 700,
          }}
        >
          <Link to={state ? "/" : "/login"} className="text-white">
            {" "}
            Buddy-zone
          </Link>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">{renderList()}</ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
