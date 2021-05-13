import React, { useEffect, useState } from "react";
import Card from "../Components/Card";
import Navbar from "../Components/Navbar";

const SubscribedUsersPost = () => {
  const [allPosts, setAllPosts] = useState([]);
  const user = localStorage.getItem("instragram-jwt");

  useEffect(() => {
    let mounted = true;
    if (mounted && user) {
      const { token } = JSON.parse(user);

      fetch("https://mighty-springs-16344.herokuapp.com/get-followings-post", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setAllPosts(data.result);
        });
    }

    return () => {
      mounted = false;
    };
  }, [user]);

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

      <div className=" mt-5">
        {allPosts.map((post) => (
          <Card post={post} key={post._id} deletePost={deletePost} />
        ))}
      </div>
    </div>
  );
};

export default SubscribedUsersPost;
