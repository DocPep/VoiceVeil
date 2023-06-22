import React from "react";
import Homepage from "./components/Homepage";
import NavBar from "./components/NavigationBar";
import SignInPage from "./components/SignIn";
import Feedback from "./components/Feedback";
import styles from "./styles.module.css";
import Background from "./components/ParticlesBackground";
import KnowMore from "./components/KnowMore";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Background />
      <div className={styles.mainPageContainer}>
        <NavBar />
        <div className={styles.horizontalSeparator}></div>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<SignInPage />} />
          <Route path="/know-more" element={<KnowMore />} />
          <Route path="/feedback" element={<Feedback />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
