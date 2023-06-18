import Navbarlogo from "../resources/voiceveil-logo-zip-file/png/navbar-logo.png";
import styles from "../styles.module.css";
import { Button } from "@mui/material";

function NavBar() {
  return (
    <div className={styles.navBarContainer}>
      <img src={Navbarlogo} alt="test" className={styles.navBarLogo} />
      <Button className={styles.navButtons}>Home</Button>
      <Button className={styles.navButtons}>Log In</Button>
      <Button className={styles.navButtons}>Know More</Button>
      <Button className={styles.navButtons}>Feedback</Button>
    </div>
  );
}

export default NavBar;
