import React, { useEffect, useState } from "react";
import MyPostsCard from "../Components/MyPostCard";

const Profile = () => {
  const [myPosts, setMyPosts] = useState([]);

  useEffect(() => {
    const { token } = JSON.parse(localStorage.getItem("instragram-jwt"));
    fetch("/my-post", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setMyPosts(data.result));
  }, []);
  console.log(myPosts);
  return (
    <div>
      <div className="card mb-3 m-auto p-5 mt-3" style={{ maxWidth: "90%" }}>
        <div className="row g-0">
          <div className="col-md-4">
            <img
              className="rounded-circle w-50"
              src="https://images.unsplash.com/photo-1485893086445-ed75865251e0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
              alt="..."
            />
          </div>
          <div className="col-md-8 ">
            <div className="card-body">
              <h5 className="card-title">{myPosts[0]?.postedBy?.name}</h5>
              <div className="d-flex justify-content-between">
                <p>40 followers</p>
                <p>40 followings</p>
                <p>{myPosts.length} posts</p>
              </div>
            </div>
          </div>
          <hr className="mt-5" />
          <div className="row row-cols-1 row-cols-md-3 g-4 mt-5">
            {myPosts.map((post) => (
              <MyPostsCard post={post} key={post._id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
