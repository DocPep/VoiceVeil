import React from "react";
import NavBar from "./postLogin/NavigationBar";
import ExplorePage from "./postLogin/Explore";
import HomeFeed from "./postLogin/HomeFeed";
import Account from "./postLogin/UserSettings";
import CreatePost from "./postLogin/CreatePost";
import ViewPost from "./postLogin/ViewPost";
import ViewUser from "./postLogin/ViewUser";
import AccountSettings from "./postLogin/AccountSettings";
import ChangePassword from "./postLogin/ChangePassword";
import ChangeUsername from "./postLogin/ChangeUsername";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function LoginHome(props) {
  const [username, setUsername] = React.useState("");

  React.useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    setUsername(token.username);
  }, []);
  return (
    <Router>
      <div>
        <NavBar username={username} setLoggedIn={props.setLoggedIn} />
        <Routes>
          <Route path="/" element={<HomeFeed />} />
          <Route path="/feed" element={<HomeFeed />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route
            path={"/account/" + username}
            element={<Account username={username} />}
          />
          <Route
            path="/create-post"
            element={<CreatePost username={username} />}
          ></Route>
          <Route path="/viewpost/:id" element={<ViewPost />} />
          <Route path="/user/:id" element={<ViewUser />} />
          <Route
            path="/:username/account-settings"
            element={<AccountSettings />}
          />
          <Route
            path="/:username/account-settings/change-password"
            element={<ChangePassword />}
          />
          <Route
            path="/:username/account-settings/change-username"
            element={<ChangeUsername />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default LoginHome;
