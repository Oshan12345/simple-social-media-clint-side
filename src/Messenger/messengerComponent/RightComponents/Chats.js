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

  console.log("state.name---------->", state?.name);
  const [newMessage, setNewMessage] = useState({
    chatText: "",
    _id: "",
    sendBy: { _id: "", name: state?.name },
  });
  //  console.log(message);
  // let query = useQuery();
  const scrollToBottom = () => {
    animateScroll.scrollToBottom({
      containerId: "main_chat_body",
    });
  };
  // senderName = query.get("name");
  // console.log(senderName);

  const { id, token } = JSON.parse(localStorage.getItem("instragram-jwt"));
  //Pusher.logToConsole = true;

  // const sendMessage = (e) => {

  // };

  //console.log("ss->", chats);
  let query = useQuery();

  //   useEffect(() => {
  // fetch('/send-message')
  //   })
  // console.log(senderId, receiver);

  //console.log("hhh", message, chatId);
  useEffect(() => {
    const createChat = () => {
      fetch(`/create-chat/${senderId}/${receiver}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((result) => {
          console.log("hello----------", result);
          setChatId(result.responseObj._id);
          setChats(result.responseObj?.messages);
          // console.log("ss----------->", result.responseObj._id);
          scrollToBottom();
        });
    };
    createChat();
    // fetch(`/get-chat/${senderId}/${receiver}`, {
    //   method: "GET",
    // })
    //   .then((res) => res.json())
    //   .then((data) => console.log("sagar here is data", data));
  }, [receiver, senderId]);

  useEffect(() => {
    var pusher = new Pusher("400843c3e3c79864883e", {
      cluster: "mt1",
    });

    var channel = pusher.subscribe("Chats");
    channel.bind("my-chats", function (data) {
      // alert(JSON.stringify(data));

      if (data) {
        console.log("dddddddd----->", data);
        // let newInputMessage = {
        //   chatText: data.chatText,
        //   _id: "",
        //   sendBy: { _id: data.sendBy, name: state?.name },
        // };
        //  newInputMessage.sendBy._id = data.sendBy;

        // setNewMessage(newInputMessage);
        console.log("data------------->", chats.length, chats);
        console.log("ssssssssssssss->", data._doc.length, data._doc.messages);

        setChats(data._doc.messages);
        scrollToBottom();
        console.log("newmessage--->", chats.length);
      } else {
        console.log("sorryyy");
      }
    });
  }, [state, chats]);

  const sendMessage = (e) => {
    e.preventDefault();
    fetch("/continue-chat", {
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
      .then((result) => {
        console.log("here is the chat result", result);

        //  setChats(result.messages);
      });
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
        {/* message.name===user.displayName */}

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
            {/* <span className="chat_time">9.30</span> */}
          </p>
        ))}

        {/* <p className={`chat_message ${true && "message_receiver"}`}>
          {" "}
          <span className="chat_name">name</span> hello sagar
          <span className="chat_time">9.30</span>
        </p>

        <p className={`chat_message ${false && "message_receiver"}`}>
          {" "}
          <span className="chat_name">name</span> hello jishan
          <span className="chat_time">9.30</span>
        </p> */}
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
            //  value={message}
            onBlur={(e) => setMessage(e.target.value)}
          ></textarea>

          <input className="btn btn-info " type="submit" />
        </form>
      </div>
    </div>
  );
};

export default Chats;
