import React, { useState } from "react";
import { useHistory } from "react-router";
import Navbar from "../Components/Navbar";

const CreatePost = () => {
  const history = useHistory();

  const [body, setBody] = useState("");
  const [url, setUrl] = useState("");
  const [progressMessage, setProgressMessage] = useState(
    " Please make sure to fill both fields..."
  );
  const [progressStatus, setProgressStatus] = useState(0);
  const [bgColor, setBgColor] = useState();
  const handlePost = () => {
    setProgressStatus(25);
    setBgColor("bg-warning");
    setProgressMessage("");
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
        if (!responseData.error) {
          setProgressStatus(50);
          setBgColor("bg-primary");
          postStatus(responseData.url);
        } else {
          setProgressMessage("Please select an image to upload.");
        }
      })
      .catch((err) => {
        setProgressMessage("Some error has been occurred.");
      });
  };
  const tokenData = localStorage.getItem("instragram-jwt");
  const postStatus = (photoUrl) => {
    const { token } = JSON.parse(tokenData);

    fetch("https://mighty-springs-16344.herokuapp.com/make-post", {
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
        if (data.result) {
          setBgColor("bg-success");
          setProgressStatus(100);
          setProgressMessage("Status uploaded successfully.");
        } else {
          setProgressMessage("Please fill both the fields.");
        }
        //  history.push("/");
      })
      .catch((err) => console.log({ err }));
  };

  return (
    <div>
      <Navbar />

      <div className="card m-auto mt-3 p-5" style={{ maxWidth: 500 }}>
        {progressMessage && (
          <p className="p-3 text-center bg-info"> {progressMessage}</p>
        )}

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
        {/* prograss bar */}

        {progressStatus !== 0 && (
          <div className="progress mt-5">
            <div
              className={`progress-bar progress-bar-striped progress-bar-animated ${bgColor}`}
              role="progressbar"
              aria-valuenow={`${progressStatus}`}
              aria-valuemin="0"
              aria-valuemax="100"
              style={{ width: `${progressStatus}%` }}
            >
              {" "}
              {progressStatus} %
            </div>
          </div>
        )}
        {/*  */}
      </div>
    </div>
  );
};

export default CreatePost;
