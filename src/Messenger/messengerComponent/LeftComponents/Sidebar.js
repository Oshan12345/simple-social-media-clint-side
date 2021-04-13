import React, { useCallback, useEffect, useState } from "react";
import ChatList from "./ChatList";
import "./Sidebar.css";
const Sidebar = () => {
  const [allRooms, setAllRooms] = useState([]);
  // const [roomsForMessageReceived, setRoomsForMessageReceived] = useState([]);
  const [fetchApi, setFetchApi] = useState(true);
  const user = localStorage.getItem("instragram-jwt");

  //newcode

  //newend
  useEffect(() => {
    const { id, token } = JSON.parse(user);
    let mounted = true;
    console.log(id);
    mounted &&
      fetch(`/following-list/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((result) => {
          setAllRooms(result);
          console.log("maaaaaaaaaa-------", result);
        });

    return function cleanup() {
      mounted = false;
    };
  }, [user]);
  console.log("sagar", allRooms);
  //new code
  // const setNewRooms = useCallback(
  //   (result) => {
  //     if (fetchApi) {
  //       const newRooms = result.map((rs) => rs.sender);
  //       console.log("divyaaaaaa---", newRooms);
  //       console.log("sagar----------------------", result);
  //       setAllRooms([...allRooms, newRooms]);
  //     }
  //   },
  //   [allRooms, fetchApi]
  // );

  // useEffect(() => {
  //   const { id, token } = JSON.parse(user);
  //   let mounted = true;

  //   mounted &&
  //     fetch(`/check-received-message`, {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //       .then((res) => res.json())
  //       .then((result) => {
  //         if (result.length) {
  //           console.log("xxxxx---", result);
  //           setNewRooms(result);
  //           setFetchApi(false);
  //         }
  //       });

  //   return function cleanup() {
  //     mounted = false;
  //   };
  // }, [user, setNewRooms]);

  //new code

  console.log("diptom-----", allRooms);
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
        {/* {allRooms?.followings?.map((room) => (
          <ChatList room={room} key={room._id} />
        ))} */}
        {/* <ChatList addNewChat /> */}
        {allRooms?.map((room) => (
          <ChatList room={room} key={room._id} />
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
