import React, { useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import "./Chats.css";
import { animateScroll } from "react-scroll";
import Pusher from "pusher-js";
import { UserContext } from "../../../App";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const Chats = () => {
  const { state, dispatch } = useContext(UserContext);
  const { senderId, receiver } = useParams();
  const [message, setMessage] = useState("");
  const [chatId, setChatId] = useState("");
  const [chats, setChats] = useState([]);

  const scrollToBottom = () => {
    animateScroll.scrollToBottom({
      containerId: "main_chat_body",
    });
  };

  const { id, token } = JSON.parse(localStorage.getItem("instragram-jwt"));

  let query = useQuery();

  useEffect(() => {
    const createChat = () => {
      fetch(
        `https://mighty-springs-16344.herokuapp.com/create-chat/${senderId}/${receiver}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => res.json())
        .then((result) => {
          setChatId(result.responseObj._id);
          setChats(result.responseObj?.messages);

          scrollToBottom();
        });
    };
    createChat();
  }, [receiver, senderId]);

  useEffect(() => {
    var pusher = new Pusher("400843c3e3c79864883e", {
      cluster: "mt1",
    });

    var channel = pusher.subscribe("Chats");
    channel.bind("my-chats", function (data) {
      if (data) {
        setChats(data._doc.messages);
        scrollToBottom();
      }
    });
  }, [state, chats]);

  const sendMessage = (e) => {
    e.preventDefault();
    fetch("https://mighty-springs-16344.herokuapp.com/continue-chat", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        message,
        chatId,
      }),
    })
      .then((res) => res.json())
      .then((result) => {});
  };

  return (
    <div className="chat_main">
      <div className="chat_header d-flex justify-content-between align-items-top">
        <i className="bi bi-person-circle"></i>
        <div className="icon_right_side d-flex justify-content-end align-items-center">
          <p className="mx-4 fs-4">{query.get("receiver")}</p>
        </div>
      </div>
      <hr />
      <div className="chat_body" id="main_chat_body">
        {chats.map((chat) => (
          <p
            className={`chat_message  ${
              chat.sendBy?._id === id && "message_sender"
            }`}
            key={chat._id}
            style={{ maxWidth: 250, overflowWrap: "anywhere" }}
          >
            {" "}
            <span className="chat_name">{chat?.sendBy?.name}</span>
            {chat.chatText}
          </p>
        ))}
      </div>
      <div className="chat_footer w-75 m-auto">
        <form
          className="d-flex align-items-center w-100 m-auto"
          onSubmit={sendMessage}
        >
          <textarea
            className="form-control"
            placeholder="Leave a comment here"
            id="floatingTextarea"
            style={{ height: "38px" }}
            onBlur={(e) => setMessage(e.target.value)}
          ></textarea>

          <input className="btn btn-info " type="submit" />
        </form>
      </div>
    </div>
  );
};

export default Chats;
