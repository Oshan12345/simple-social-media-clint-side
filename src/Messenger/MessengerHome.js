// import React from "react";
// import Sidebar from "./messengerComponent/LeftComponents/Sidebar";
// import "./messengerHome.css";
// import Chats from "./messengerComponent/RightComponents/Chats";
// import { Route } from "react-router-dom";
// import MenuDrawer from "../Components/MenuDrawer";
// const MessengerHome = () => {
//   return (
//     <div className="container px-4 mt-4 mb-5">
//       <div className="row gx-2 messenger-body ">
//         <div className="col col-md-4  ">
//           <div className="p-3 border ">
//             <Sidebar />
//           </div>
//         </div>
//         <div className="col col-md-8">
//           <div className="p-3 border">
//             <Route path="/messenger/chat/:senderId/:receiver">
//               <Chats />
//             </Route>
//           </div>
//         </div>
//       </div>
//       <MenuDrawer />
//     </div>
//   );
// };

// export default MessengerHome;

import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";

import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Sidebar from "./messengerComponent/LeftComponents/Sidebar";
import { Route } from "react-router";
import Chats from "./messengerComponent/RightComponents/Chats";
import { Link } from "react-router-dom";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function ResponsiveDrawer(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            {/* <MenuIcon /> */}
            <i className="bi bi-list"></i>
          </IconButton>
          Select your buddy from options.
          <Link
            to="/"
            className="text-white ms-auto text-decoration-none text-center"
          >
            <i className="bi bi-house-door-fill text-white me-1"></i>Home{" "}
          </Link>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            <i
              className="bi bi-x-circle-fill p-3 fs-5 text-dark ms-auto"
              onClick={handleDrawerToggle}
            ></i>
            <div className="p-3 border ">
              <Sidebar />
            </div>
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            <div className="p-3 border ">
              <Sidebar />{" "}
            </div>
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />

        <div className="p-2 border">
          <Route path="/messenger/chat/:senderId/:receiver">
            <Chats />
          </Route>
        </div>
      </main>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
