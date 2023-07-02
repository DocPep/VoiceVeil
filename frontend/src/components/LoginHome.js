import React from "react";
import NavBar from "./postLogin/NavigationBar";
import ExplorePage from "./postLogin/Explore";
import HomeFeed from "./postLogin/HomeFeed";
import Account from "./postLogin/UserSettings";
import NotificationsPage from "./postLogin/Notifications";
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
        <NavBar username={username} setLoggedIn={props.setLoggedIn}/>
        <Routes>
          <Route path="/feed" element = {<HomeFeed/>} />
          <Route path="/explore" element = {<ExplorePage/>} />
          <Route path={"/account/" + username} element = {<Account username={username}/>} />
          <Route path="/notifications" element = {<NotificationsPage/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default LoginHome;
