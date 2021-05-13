import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  Suspense,
} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
import { initialState, reducer } from "./reducers/userReducer";
const Home = React.lazy(() => import("./Pages/Home"));
const Login = React.lazy(() => import("./Pages/Login"));
const SignUp = React.lazy(() => import("./Pages/SignUp"));
const Profile = React.lazy(() => import("./Pages/Profile"));
const CreatePost = React.lazy(() => import("./Pages/CreatePost"));
const MessengerHome = React.lazy(() => import("./Messenger/MessengerHome"));
const UserProfile = React.lazy(() => import("./Pages/UserProfile"));
const SubscribedUsersPost = React.lazy(() =>
  import("./Pages/SubscribedUsersPost")
);
const ResetPassword = React.lazy(() => import("./Pages/ResetPassword"));

// import Home from "./Pages/Home";
// import Login from "./Pages/Login";
// import SignUp from "./Pages/SignUp";
// import Profile from "./Pages/Profile";
// import CreatePost from "./Pages/CreatePost";

// import MessengerHome from "./Messenger/MessengerHome";
// import UserProfile from "./Pages/UserProfile";
// import SubscribedUsersPost from "./Pages/SubscribedUsersPost";
// import ResetPassword from "./Pages/ResetPassword";
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

  return (
    <Switch>
      <Route exact path="/">
        <Suspense fallback={<div>Loading...</div>}>
          <Home />
        </Suspense>
      </Route>
      <Route path="/login">
        <Suspense fallback={<div>Loading...</div>}>
          <Login />
        </Suspense>
      </Route>
      <Route path="/signup">
        <Suspense fallback={<div>Loading...</div>}>
          <SignUp />
        </Suspense>
      </Route>
      <Route exact path="/reset">
        <Suspense fallback={<div>Loading...</div>}>
          <ResetPassword />
        </Suspense>
      </Route>
      <Route exact path="/reset/:resetToken">
        <Suspense fallback={<div>Loading...</div>}>
          <ResetPassword />
        </Suspense>
      </Route>
      <Route path="/user/:userId">
        <Suspense fallback={<div>Loading...</div>}>
          <UserProfile />
        </Suspense>
      </Route>
      <Route path="/profile">
        <Suspense fallback={<div>Loading...</div>}>
          <Profile />
        </Suspense>
      </Route>
      <Route path="/create-post">
        <Suspense fallback={<div>Loading...</div>}>
          <CreatePost />
        </Suspense>
      </Route>
      <Route path="/messenger">
        <Suspense fallback={<div>Loading...</div>}>
          <MessengerHome />
        </Suspense>
      </Route>
      <Route path="/myFollowingsPosts">
        <Suspense fallback={<div>Loading...</div>}>
          <SubscribedUsersPost />
        </Suspense>
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
        <Routing />
      </Router>
    </UserContext.Provider>
  );
}

export default App;
