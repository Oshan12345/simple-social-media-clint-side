import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import MyPostsCard from "../Components/MyPostCard";
import Navbar from "../Components/Navbar";

const UserProfile = () => {
  let { userId } = useParams();

  const [userProfile, setUserProfile] = useState({});
  const [followers, setFollowers] = useState();

  const [displayLike, setDisplayLike] = useState(true);
  const [displayUnlike, setDisplayUnlike] = useState(false);
  const { id, token } = JSON.parse(localStorage.getItem("instragram-jwt"));

  useEffect(() => {
    fetch(`https://mighty-springs-16344.herokuapp.com/user/${userId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUserProfile(data);
        setFollowers(data.user.followers.length);
        if (data.user?.followers?.includes(id)) {
          setDisplayLike(!displayLike);
          setDisplayUnlike(!displayUnlike);
        }
      });
  }, [userId, token]);

  const followUser = () => {
    fetch("https://mighty-springs-16344.herokuapp.com/follow", {
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
      .then((data) => {});
  };

  const unFollowUser = () => {
    fetch("https://mighty-springs-16344.herokuapp.com/unfollow", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        unFollowID: userId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {});
  };
  return (
    <div>
      <Navbar />
      {!userProfile.user ? (
        <div className="m-auto mt-5 p-5" style={{ width: "fit-content" }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="card mb-3 m-auto p-5 mt-3" style={{ maxWidth: "90%" }}>
          <div className="row g-0">
            <div className="col-md-4">
              <img
                className="rounded-circle w-50"
                src={userProfile?.user?.profilePic}
                alt="..."
              />
            </div>
            <div className="col-md-8 ">
              <div className="card-body">
                <div className="d-flex">
                  <h5 className="card-title mx-4">{userProfile.user?.name}</h5>
                  {/*  */}
                  {displayUnlike && (
                    <div
                      className="d-flex justify-content-between align-items-center"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        unFollowUser();
                        setFollowers(followers - 1);
                        setDisplayLike(!displayLike);
                        setDisplayUnlike(!displayUnlike);
                      }}
                    >
                      <div
                        style={{
                          transform: "rotate(179deg)",
                        }}
                      >
                        <i className="bi bi-hand-index-thumb mx-1"></i>
                      </div>
                      Un-follow
                    </div>
                  )}

                  {displayLike && (
                    <div
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        followUser();
                        setFollowers(followers + 1);
                        setDisplayLike(!displayLike);
                        setDisplayUnlike(!displayUnlike);
                      }}
                    >
                      <i className="bi bi-hand-index-thumb mx-1"></i> Follow
                    </div>
                  )}
                </div>
                <div className="d-flex justify-content-between">
                  <p>{followers} followers</p>
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
