import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Card = ({ post, deletePost }) => {
  const { body, photo, postedBy, title, _id, likedBy, comments } = post;
  const [like, setLike] = useState(likedBy);
  const { id, token } = JSON.parse(localStorage.getItem("instragram-jwt"));
  const [postComments, setPostComment] = useState([]);

  useEffect(() => {
    setPostComment(comments);
  }, [comments]);

  const likePost = (userId) => {
    fetch("https://mighty-springs-16344.herokuapp.com/like-post", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        postId: userId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setLike(data.likedBy);
      });
  };

  const unLikePost = (post_id) => {
    const { token } = JSON.parse(localStorage.getItem("instragram-jwt"));
    fetch("https://mighty-springs-16344.herokuapp.com/unlike-post", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        postId: post_id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setLike(data.likedBy);
      });
  };

  const postComment = (comment, postId) => {
    fetch("https://mighty-springs-16344.herokuapp.com/comment-to-post", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        comment,
        postId,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        setPostComment(result.comments);
      });
  };

  return (
    <div>
      <div className="card mt-4 m-auto" style={{ maxWidth: 500 }}>
        <h3 className="p-3">
          {" "}
          <Link to={id === postedBy._id ? "/profile" : `/user/${postedBy._id}`}>
            {postedBy?.name}
          </Link>
        </h3>

        {id === postedBy._id && (
          <i
            className="bi bi-trash-fill mx-3 position-absolute"
            style={{
              alignSelf: "center",
              cursor: "pointer",
              right: 0,
              top: 21,
            }}
            onClick={() => deletePost(_id)}
          ></i>
        )}

        <img
          src={photo}
          className="card-img-top m-auto p-3"
          alt="..."
          style={{ width: "70%", objectFit: "cover" }}
        />

        <div className="card-body">
          <h6>
            <i className="bi bi-suit-heart-fill text-danger"></i> {title}
          </h6>
          <p>{body}</p>
          <div className="mt-5 mb-3 border border-1 round-1 border-primary p-1">
            {like.length}{" "}
            {like.includes(id) ? (
              <i
                className="bi bi-hand-thumbs-down mx-2"
                onClick={() => unLikePost(_id)}
              ></i>
            ) : (
              <i
                className="bi bi-hand-thumbs-up mx-2"
                onClick={() => likePost(_id)}
              ></i>
            )}
          </div>
          <div
            className="border p-2"
            style={{ maxHeight: 300, overflowY: "scroll" }}
          >
            comments
            <br />
            {postComments.map((cm) => (
              <div key={cm._id} className="d-flex">
                <p className="position-relative mt-3">
                  <span
                    className="position-absolute"
                    style={{ top: "-7px", fontSize: "xx-small" }}
                  >
                    {cm.commentBy.name}
                  </span>
                  {cm.commentText}
                </p>
              </div>
            ))}
          </div>
          <div className="form-floating">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                postComment(e.target[0].value, _id);
                e.target[0].value = "";
              }}
            >
              <textarea
                className="form-control"
                placeholder="Leave a comment here"
                id="floatingTextarea"
              ></textarea>

              <div className="d-flex mt-1">
                <input type="submit" className="btn btn-primary w-100" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
