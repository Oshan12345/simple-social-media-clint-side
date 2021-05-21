import React, { useState } from "react";

const MyPostsCard = ({ post }) => {
  const [isHidePost, setIsHidePost] = useState(false);
  const { body, photo, title, _id } = post;
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
        console.log(data);
        setIsHidePost(true);
      });
  };

  return (
    <div className={`col position-relative  ${isHidePost && "d-none"}`}>
      <div>
        <i
          className="bi bi-trash-fill delete-btn"
          onClick={() => deletePost(_id)}
        ></i>
      </div>
      <div className="card h-100">
        <img className="m-auto w-50" src={photo} alt="..." />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{body}</p>
        </div>
      </div>
    </div>
  );
};

export default MyPostsCard;
