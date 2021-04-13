import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";

const CreatePost = () => {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [photo, setPhoto] = useState("");
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
        //  console.log({ responseData });
        console.log(responseData.url);
        setPhoto(responseData.url);
        // photo && uploadPost(responseData.url);
      });
  };

  const tokenData = localStorage.getItem("instragram-jwt");
  // const uploadPost = (pic) => {
  //   console.log(photo);

  //   const { token } = JSON.parse(localStorage.getItem("instragram-jwt"));

  //   if (photo) {
  //     fetch("/make-post", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //       body: JSON.stringify({
  //         title,
  //         body,
  //         photo: pic || photo,
  //       }),
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         console.log("saggggaaaar", data);
  //         history.push("/");
  //       })
  //       .catch((err) => console.log({ err }));
  //   }
  // };
  useEffect(() => {
    if (tokenData && photo) {
      const { token } = JSON.parse(tokenData);

      if (photo) {
        fetch("/make-post", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title,
            body,
            photo,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            history.push("/");
          })
          .catch((err) => console.log({ err }));
      }
    }
  }, [photo, tokenData, body, title, history]);
  // const uploadPost = () => {
  //   console.log(photo);

  //   const { token } = JSON.parse(localStorage.getItem("instragram-jwt"));

  //   fetch("/create-post", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token}`,
  //     },
  //     body: JSON.stringify({
  //       title,
  //       body,
  //       photo,
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //     })
  //     .catch((err) => console.log({ err }));
  // };
  return (
    <div className="card m-auto mt-3 p-5" style={{ maxWidth: 500 }}>
      <div className="mb-3">
        <label htmlFor="exampleFormControlTextarea1" className="form-label">
          Title
        </label>
        <textarea
          className="form-control"
          id="exampleFormControlTextarea1"
          rows="3"
          onBlur={(e) => setTitle(e.target.value)}
        ></textarea>
      </div>
      <div className="mb-3">
        <label htmlFor="exampleFormControlTextarea1" className="form-label">
          Body
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
  );
};

export default CreatePost;
