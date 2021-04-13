import React from "react";
import Sidebar from "./messengerComponent/LeftComponents/Sidebar";
import "./messengerHome.css";
import Chats from "./messengerComponent/RightComponents/Chats";
import { Route } from "react-router-dom";
const MessengerHome = () => {
  return (
    <div className="container px-4 mt-4 mb-5">
      <div className="row gx-2 messenger-body ">
        <div className="col col-md-4  ">
          <div className="p-3 border ">
            <Sidebar />
          </div>
        </div>
        <div className="col col-md-8">
          <div className="p-3 border">
            <Route path="/messenger/chat/:senderId/:receiver">
              <Chats />
            </Route>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessengerHome;
