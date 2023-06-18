import pageLogo from "../resources/voiceveil-logo-zip-file/png/logo-no-background.png";
import styles from "../styles.module.css";
import Button from "@mui/material-next/Button";
import Background from "./ParticlesBackground";
import Navbar from "./NavigationBar";

function Homepage() {
  return (
    <div className={styles.mainPageBackground}>
      <Background />
      <Navbar />
      <div className={styles.horizontalSeparator}></div>
      <div className={styles.mainContent}>
        <img src={pageLogo} alt="Page Logo" className={styles.pageLogo} />
        <div className={styles.verticalSeparator}></div>
        <div className={styles.signInContainer}>
          <h3 className={styles.welcomeText}>
            Are you new to this platform or already a member? No matter which
            category you fall into, we warmly invite you to join us and explore
            an engaging community where you can freely express yourself. Click
            the button below to Sign In and immerse yourself in vibrant
            discussions, connect with others, and enjoy a fulfilling experience!
          </h3>
          <Button
            size="large"
            variant="elevated"
            className={styles.signInButton}
          >
            Sign In
          </Button>
          <h3 className={styles.moreText}>
            Or, if you want to read and know more about us, please scroll down
            below! :)
          </h3>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
