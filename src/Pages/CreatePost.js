import React, { useState } from "react";
import { useHistory } from "react-router";
import Navbar from "../Components/Navbar";

const CreatePost = () => {
  const history = useHistory();

  const [body, setBody] = useState("");
  const [url, setUrl] = useState("");
  const handlePost = () => {
    const data = new FormData();
    data.append("file", url);
    data.append("upload_preset", "instragram-clone");
    data.append("cloud_name", "oshan");

    fetch("	https://api.cloudinary.com/v1_1/oshan/image/upload", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((responseData) => {
        postStatus(responseData.url);
      });
  };
  const tokenData = localStorage.getItem("instragram-jwt");
  const postStatus = (photoUrl) => {
    const { token } = JSON.parse(tokenData);

    fetch("/make-post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        // title,
        body,
        photo: photoUrl,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        history.push("/");
      })
      .catch((err) => console.log({ err }));
  };

  return (
    <div>
      <Navbar />

      <div className="card m-auto mt-3 p-5" style={{ maxWidth: 500 }}>
        <p className="p-3 text-center">
          {" "}
          Please make sure to fill both fields...
        </p>

        <div className="mb-3">
          <label htmlFor="exampleFormControlTextarea1" className="form-label">
            Your feelings
          </label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            onBlur={(e) => setBody(e.target.value)}
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="formFileSm" className="form-label">
            Upload Image
          </label>
          <input
            className="form-control form-control-sm"
            id="formFileSm"
            type="file"
            onChange={(e) => setUrl(e.target.files[0])}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary w-100"
          onClick={handlePost}
        >
          {" "}
          Post
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
