import React from "react";

const MyPostsCard = ({ post }) => {
  const { body, photo, title, postedBy } = post;
  return (
    <div className="col">
      <div className="card h-100">
        <img className="m-auto rounded-circle w-50" src={photo} alt="..." />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{body}</p>
        </div>
      </div>
    </div>
  );
};

export default MyPostsCard;
