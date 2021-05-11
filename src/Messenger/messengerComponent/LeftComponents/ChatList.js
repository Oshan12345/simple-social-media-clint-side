import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ChatList = ({ addNewChat, room }) => {
  console.log("divya", room);
  const imageStyle = {
    maxHeight: 30,
    maxWidth: 30,
    borderRadius: "50%",
    objectFit: "contain",
  };
  const createChat = () => {
    const name = prompt("please enter a name");
    console.log("hi");
    console.log(name);
    if (name) {
    } else {
    }
  };

  const { id } = JSON.parse(localStorage.getItem("instragram-jwt"));

  console.log({ id });
  return (
    <>
      <Link
        className="text-decoration-none"
        to={`/messenger/chat/${id}/${room?._id}?receiver=${room?.name}`}
      >
        <div className="d-flex justify-content-start mx-4">
          <img src={room?.profilePic} alt="" style={imageStyle} />{" "}
          <div className="ms-5">
            {" "}
            <p> {room?.name}</p>
          </div>{" "}
        </div>
      </Link>
    </>
  );
};

export default ChatList;
