import React from "react";
import Login from "./components/LoginSide";
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
      {loggedIn ? <div>Logged in</div> : <Login setLoggedIn={setLoggedIn} />}
    </div>
  );
}

export default App;
