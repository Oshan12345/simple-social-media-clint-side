import Navbar from "./Components/Navbar";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Profile from "./Pages/Profile";
import CreatePost from "./Pages/CreatePost";
import { createContext, useContext, useEffect, useReducer } from "react";
import { initialState, reducer } from "./reducers/userReducer";
import MessengerHome from "./Messenger/MessengerHome";
import UserProfile from "./Pages/UserProfile";
import SubscribedUsersPost from "./Pages/SubscribedUsersPost";
import ResetPassword from "./Pages/ResetPassword";
export const UserContext = createContext("");
const Routing = () => {
  const history = useHistory();
  const { dispatch } = useContext(UserContext);
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      const redirect = () => {
        const user = JSON.parse(localStorage.getItem("instragram-jwt"));
        if (user) {
          const { name, email } = user;
          dispatch({ type: "USER", payload: { name, email } });
        } else {
          !history.location.pathname.startsWith("/reset") &&
            history.push("/login");
        }
      };
      redirect();
    }

    return () => {
      mounted = false;
    };
  }, [history, dispatch]);
  //ekane dispatch ta delete korbo problem hole
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/signup">
        <SignUp />
      </Route>
      <Route exact path="/reset">
        <ResetPassword />
      </Route>
      <Route exact path="/reset/:resetToken">
        <ResetPassword />
      </Route>
      <Route path="/user/:userId">
        <UserProfile />
      </Route>
      <Route path="/profile">
        <Profile />
      </Route>
      <Route path="/create-post">
        <CreatePost />
      </Route>
      <Route path="/messenger">
        <MessengerHome />
      </Route>
      <Route path="/myFollowingsPosts">
        <SubscribedUsersPost />
      </Route>
    </Switch>
  );
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log(state);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <Router>
        {/* <Navbar /> */}
        <Routing />
      </Router>
    </UserContext.Provider>
  );
}

export default App;
