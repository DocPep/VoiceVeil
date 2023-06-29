import Navbarlogo from "../../resources/voiceveil-logo-zip-file/png/navbar-logo.png";
import styles from "../../styles.module.css";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div className={styles.navBarContainer}>
      <a href="google.com">
        <img src={Navbarlogo} alt="Logo" className={styles.navBarLogo} />
      </a>
      <Button component={Link} to="/" className={styles.navButtons}>
        Home
      </Button>
      <Button component={Link} to="/login" className={styles.navButtons}>
        Log In
      </Button>
      <Button component={Link} to="/know-more" className={styles.navButtons}>
        Know More
      </Button>
      <Button component={Link} to="/feedback" className={styles.navButtons}>
        Feedback
      </Button>
    </div>
  );
}

export default NavBar;
