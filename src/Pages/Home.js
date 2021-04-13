import React, { useEffect, useState } from "react";
import Card from "../Components/Card";
import CreatePost from "./CreatePost";

const Home = () => {
  const [allPosts, setAllPosts] = useState([]);
  const user = localStorage.getItem("instragram-jwt");

  useEffect(() => {
    let mounted = true;
    if (mounted && user) {
      const { token } = JSON.parse(user);

      fetch("/get-posts", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);

          setAllPosts(data.result);
        });
    }

    return () => {
      mounted = false;
    };
  }, [user]);

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
    <div className=" mt-5">
      {/* <CreatePost /> */}
      {allPosts.map((post) => (
        <Card post={post} key={post._id} deletePost={deletePost} />
      ))}
    </div>
  );
};

export default Home;
