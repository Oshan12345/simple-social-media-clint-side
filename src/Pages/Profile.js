import React, { useEffect, useState } from "react";
import MyPostsCard from "../Components/MyPostCard";
import Navbar from "../Components/Navbar";

const Profile = () => {
  const [myProfileData, setMyProfileData] = useState({});

  const [photo, setPhoto] = useState("");
  const [showInput, setShowInput] = useState(false);
  useEffect(() => {
    const { token, id } = JSON.parse(localStorage.getItem("instragram-jwt"));

    fetch(`/user/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setMyProfileData(data);
      });
  }, []);

  const { id, token } = JSON.parse(localStorage.getItem("instragram-jwt"));
  const uploadImg = (image) => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "instragram-clone");
    data.append("cloud_name", "oshan");

    fetch("	https://api.cloudinary.com/v1_1/oshan/image/upload", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((responseData) => {
        setPhoto(responseData.url);
        updatePic(responseData.url);
        setShowInput(false);
      });
  };

  const updatePic = (imageUrl) => {
    fetch("/update-profile-pic", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        imageUrl,
      }),
    })
      .then((res) => res.json())
      .then((data) => {});
  };

  const toggleChangePicButton = (e) => {
    e.preventDefault();
    setShowInput(!showInput);
  };

  return (
    <div>
      <Navbar />
      <div className="card mb-3 m-auto p-5 mt-3" style={{ maxWidth: "90%" }}>
        <div className="row g-0">
          <div className="col-md-4 mb-5">
            <form className="upload-profile-pic">
              <img
                src={photo || myProfileData.user?.profilePic}
                style={{ borderRadius: "50%", height: 200, width: 200 }}
                alt=""
              />
              {showInput && (
                <input
                  className="form-control form-control-sm"
                  id="formFileSm"
                  type="file"
                  onChange={(e) => uploadImg(e.target.files[0])}
                />
              )}
              <button
                className="btn btn-info mt-4"
                onClick={toggleChangePicButton}
              >
                {showInput ? "Cancel" : "  Change Profile pic"}
              </button>
            </form>
          </div>
          <div className="col-md-8 mt-4">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <p>{myProfileData.user?.followers.length} followers</p>
                <p>{myProfileData.user?.followings?.length} followings</p>
                <p>{myProfileData.posts?.length} posts</p>
              </div>
            </div>
          </div>
          <hr className="mt-5" />
          <div className="row row-cols-1 row-cols-md-3 g-4 mt-5">
            {myProfileData.posts?.map((post) => (
              <MyPostsCard post={post} key={post._id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
