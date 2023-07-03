import styles from "../../styles.module.css";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import NavBarLogo from "../../resources/voiceveil-logo-zip-file/png/navbar-logo.png";

function NavBar(props) {
  const homeRedirect = () => {
    window.location.href = "/feed";
  };

  const logoutUser = () => {
    localStorage.removeItem("token");
    props.setLoggedIn(false);
    window.location.href = "/";
  };

  return (
    <div className={styles.postLoginNavContainer}>
      <Button
        className={styles.postLoginNavBarLogoButton}
        onClick={homeRedirect}
      >
        <img
          src={NavBarLogo}
          alt="Logo"
          className={styles.postLoginNavBarLogo}
        />
      </Button>
      <Button
        component={Link}
        to="/feed"
        className={styles.postLoginNavButtons}
      >
        Home
      </Button>
      <Button
        component={Link}
        to="/explore"
        className={styles.postLoginNavButtons}
      >
        Explore
      </Button>
      <Button
        component={Link}
        to={"/account/" + props.username}
        className={styles.postLoginNavButtons}
      >
        Account
      </Button>
      <Button
        component={Link}
        to="/notifications"
        className={styles.postLoginNavButtons}
      >
        Notifications
      </Button>
      <div className={styles.accountNameAndLogout}>
        <div className={styles.userNameHolder}>{props.username}</div>
        <div className={styles.smallVerticalSeparator}></div>
        <Button onClick={logoutUser} className={styles.LogOutButton}>
          LOGOUT
        </Button>
      </div>
    </div>
  );
}

export default NavBar;
