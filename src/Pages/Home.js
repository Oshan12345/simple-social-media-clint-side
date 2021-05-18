import React, { useEffect, useState, Suspense } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
//import Card from "../Components/Card";
const Card = React.lazy(() => import("../Components/Card"));
const Home = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const user = localStorage.getItem("instragram-jwt");
  const imageStyle = {
    maxHeight: 30,
    maxWidth: 30,
    borderRadius: "50%",
    objectFit: "contain",
  };
  useEffect(() => {
    let mounted = true;
    if (mounted && user) {
      fetchData("https://mighty-springs-16344.herokuapp.com/get-posts").then(
        (res) => setAllPosts(res.result)
      );

      fetchData("https://mighty-springs-16344.herokuapp.com/all-users").then(
        (res) => setAllUsers(res.result)
      );
    }

    return () => {
      mounted = false;
    };
  }, [user]);
  //

  const fetchData = (url) => {
    const { token, id } = JSON.parse(user);
    return fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        return data;
      });
  };

  //

  const deletePost = (postId) => {
    const { token } = JSON.parse(localStorage.getItem("instragram-jwt"));

    fetch(
      `https://mighty-springs-16344.herokuapp.com/delete-my-post/${postId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        const newPost = allPosts.filter((post) => postId !== post._id);

        setAllPosts(newPost);
      });
  };

  return (
    <div>
      <Navbar />

      {allPosts.length === 0 && (
        <div className="loading-spinner">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      <div className="card mb-3">
        <div className="row g-0">
          <div className="col-md-8">
            {allPosts.map((post) => (
              <Suspense fallback={<div>Loading...</div>} key={post._id}>
                <Card post={post} deletePost={deletePost} />
              </Suspense>
            ))}
          </div>

          <div className="col-md-4 mt-4 p-3">
            <ul className="list-group">
              <li className="list-group-item active" aria-current="true">
                People you may know...
              </li>

              {allUsers.map((user) => (
                <li className="list-group-item" key={user._id}>
                  <Link to={`/user/${user._id}`}>
                    <div className="d-flex justify-content-start mx-4">
                      <img src={user?.profilePic} alt="" style={imageStyle} />{" "}
                      <div className="ms-5">
                        {" "}
                        <p> {user?.name}</p>
                      </div>{" "}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
