import React from "react";
import Login from "./components/LoginSide";
import LoginHome from "./components/LoginHome";
import styles from "./styles.module.css";

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);

  React.useEffect(() => {
    if (localStorage.getItem("token")) {
      setLoggedIn(true);
    }
  }, []);

  return (
    <div className={styles.appHolder}>
      {loggedIn ? <LoginHome setLoggedIn={setLoggedIn}/> : <Login setLoggedIn={setLoggedIn} />}
    </div>
  );
}

export default App;
