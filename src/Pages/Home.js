import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../Components/Card";
import Navbar from "../Components/Navbar";
import CreatePost from "./CreatePost";

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
      // const { token } = JSON.parse(user);
      fetchData("/get-posts").then((res) => setAllPosts(res.result));
      // console.log("ddddddddaaaaaaaaaaaaaaatttttttttta", data);
      fetchData("/all-users").then((res) => setAllUsers(res.result));
      // setAllPosts(data.result);
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
        console.log("ssssssssssssssssss", data);

        //  setAllPosts(data.result);

        return data;
      });
  };

  //
  console.log("allll users--------", allUsers);
  const deletePost = (postId) => {
    const { token } = JSON.parse(localStorage.getItem("instragram-jwt"));
    console.log(postId);
    fetch(`/delete-my-post/${postId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(allPosts);
        const newPost = allPosts.filter((post) => postId !== post._id);
        console.log(newPost);
        console.log(data);
        setAllPosts(newPost);
      });
  };

  return (
    <div>
      <Navbar />

      <div class="card mb-3">
        <div class="row g-0">
          <div class="col-md-8">
            {allPosts.map((post) => (
              <Card post={post} key={post._id} deletePost={deletePost} />
            ))}
          </div>

          <div class="col-md-4 mt-4 p-3">
            <ul class="list-group">
              <li class="list-group-item active" aria-current="true">
                People you may know...
              </li>

              {allUsers.map((user) => (
                <li class="list-group-item" key={user._id}>
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
