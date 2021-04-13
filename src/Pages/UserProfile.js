import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import MyPostsCard from "../Components/MyPostCard";

const UserProfile = () => {
  let { userId } = useParams();
  console.log("heyy----------", userId);
  const [userProfile, setUserProfile] = useState([]);

  const { id, token } = JSON.parse(localStorage.getItem("instragram-jwt"));
  console.log("id", id);
  useEffect(() => {
    fetch(`/user/${userId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setUserProfile(data));
  }, [userId, token]);
  console.log(userProfile);

  const followUser = () => {
    fetch("/follow", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        followID: userId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  return (
    <div>
      {userProfile.length === 0 ? (
        <div className="m-auto mt-5 p-5" style={{ width: "fit-content" }}>
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
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
                <div className="d-flex">
                  <h5 className="card-title mx-4">{userProfile.user?.name}</h5>

                  {userProfile?.user?.followers.includes(id) ? (
                    <div className="d-flex justify-content-between align-items-center">
                      <div
                        style={{
                          transform: "rotate(179deg)",
                          cursor: "pointer",
                        }}
                      >
                        <i class="bi bi-hand-index-thumb mx-1"></i>
                      </div>
                      Un-follow
                    </div>
                  ) : (
                    <div style={{ cursor: "pointer" }} onClick={followUser}>
                      <i class="bi bi-hand-index-thumb mx-1"></i> Follow
                    </div>
                  )}
                </div>
                <div className="d-flex justify-content-between">
                  <p>{userProfile?.user?.followers.length} followers</p>
                  <p>{userProfile?.user?.followings?.length} followings</p>
                  <p>{userProfile?.posts?.length} Post</p>
                </div>
              </div>
            </div>
            <hr className="mt-5" />
            <div className="row row-cols-1 row-cols-md-3 g-4 mt-5">
              {userProfile?.posts?.map((post) => (
                <MyPostsCard post={post} key={post._id} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
