import styles from "../styles.module.css";
import NavBar from "./preLogin/NavigationBar";
import Homepage from "./preLogin/Homepage";
import KnowMore from "./preLogin/KnowMore";
import Feedback from "./preLogin/Feedback";
import Background from "./ParticlesBackground";
import SignInPage from "./preLogin/SignIn";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function LoginSide(props) {
  return (
    <Router>
      <Background />
      <div className={styles.mainPageContainer}>
        <NavBar />
        <div className={styles.horizontalSeparator}></div>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route
            path="/login"
            element={<SignInPage setLoggedIn={props.setLoggedIn} />}
          />
          <Route path="/know-more" element={<KnowMore />} />
          <Route path="/feedback" element={<Feedback />} />
        </Routes>
      </div>
    </Router>
  );
}

export default LoginSide;
