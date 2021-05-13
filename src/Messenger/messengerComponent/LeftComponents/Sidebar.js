import React, { useEffect, useState } from "react";
import ChatList from "./ChatList";

import "./Sidebar.css";
const Sidebar = () => {
  const [allRooms, setAllRooms] = useState([]);

  const user = localStorage.getItem("instragram-jwt");

  useEffect(() => {
    const { id, token } = JSON.parse(user);
    let mounted = true;

    mounted &&
      fetch(`https://mighty-springs-16344.herokuapp.com/following-list/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((result) => {
          const seen = new Set();

          const filteredArr = result.filter((el) => {
            const duplicate = seen.has(el._id);

            seen.add(el._id);
            return !duplicate;
          });

          setAllRooms(filteredArr);
        });

    return function cleanup() {
      mounted = false;
    };
  }, [user]);

  return (
    <aside className="sidebar">
      <div className="sidebar_header d-flex justify-content-between align-items-center">
        <i className="bi bi-person-circle"></i>
        <div className="icon_right_side d-flex justify-content-end align-items-center">
          <i className="bi bi-chat-left-text mx-1"></i>
          <i className="bi bi-gear mx-1"></i>
        </div>
      </div>
      <hr />
      <div className="sidebar_search mt-2 mb-3">
        <form className="d-flex align-items-center border w-75 rounded-3 m-auto">
          <input
            className="form-control me-2 form-control-sm border-0  "
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <i className="bi bi-search mx-3"></i>
        </form>
      </div>
      <div className="sidebar_chat_list">
        {allRooms?.map((room) => (
          <ChatList room={room} key={room._id} />
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
