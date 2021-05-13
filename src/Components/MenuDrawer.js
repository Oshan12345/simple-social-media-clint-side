import React, { useState } from "react";
import Drawer from "rc-drawer";

const MenuDrawer = () => {
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  return (
    <>
      {/* <button type="primary" onClick={showDrawer}>
        Open
      </button> */}
      <Drawer
        title="Basic Drawer"
        placement="down"
        width="300"
        closable={true}
        onClose={onClose}
        closeIcon="sdsdsdsd"
        visible={false}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  );
};

export default MenuDrawer;
