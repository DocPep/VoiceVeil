import styles from "../styles.module.css";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import react from "react";
import axios from "axios";

function SignInPage() {
  const [logInPrompt, setLogInPrompt] = react.useState("");
  const [registerPrompt, setRegisterPrompt] = react.useState("");
  const [showLogin, setShowLogin] = react.useState(true);

  const showLoginScreen = () => {
    if (!showLogin) {
      document.getElementById("registerHeader").style.color = "#9dc4eb";
      document.getElementById("loginHeader").style.color = "white";
      document.getElementById("loginFormContainer").style.display = "flex";
      document.getElementById("registerFormContainer").style.display = "none";
      setShowLogin(true);
    }
  };

  const showRegisterScreen = () => {
    if (showLogin) {
      document.getElementById("registerHeader").style.color = "white";
      document.getElementById("loginHeader").style.color = "#9dc4eb";
        document.getElementById("loginFormContainer").style.display = "none";
        document.getElementById("registerFormContainer").style.display = "flex";
      setShowLogin(false);
    }
  };

  const logInUser = async () => {
    const username = document.getElementById("login-userid-field").value;
    const password = document.getElementById("login-password-field").value;
    if (!username) {
      setLogInPrompt("Please enter a username");
    } else if (!password) {
      setLogInPrompt("Please enter a password");
    } else {
      const response = await axios.post("http://localhost:5000/user/login", {
        username: username,
        password: password,
      });
      setLogInPrompt(response.data);
      console.log(response.data);
    }
  };

  const registerUser = async () => {
    const username = document.getElementById("register-userid-field").value;
    const email = document.getElementById("register-email-field").value;
    const password = document.getElementById("register-password-field").value;

    if (!username) {
      setRegisterPrompt("Please enter a username");
    } else if (!password) {
      setRegisterPrompt("Please enter a password");
    } else if (!email) {
      setRegisterPrompt("Please enter an email");
    } else {
      const response = await axios.post("http://localhost:5000/user/register", {
        username: username,
        email: email,
        password: password,
      });
      setRegisterPrompt(response.data);
      console.log(response.data);
    }
  };
  return (
    <div className={styles.SignInMainContainer}>
      <div className={styles.SignInHeaderContainer}>
        <div
          id="loginHeader"
          className={styles.loginHeader}
          onClick={showLoginScreen}
        >
          LOG IN
        </div>
        <div
          id="registerHeader"
          className={styles.registerHeader}
          onClick={showRegisterScreen}
        >
          REGISTER
        </div>
      </div>
      <div className={styles.SignInFormContainer}>
        <div id="loginFormContainer" className={styles.logInFormContainer}>
          <div className={styles.loginHeading}>LOGIN</div>
          <TextField
            required
            id="login-userid-field"
            label="User ID"
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#77F877", // Border color when not in focus
                },
                "&:hover fieldset": {
                  borderColor: "green", // Border color on hover
                },
                "&.Mui-focused fieldset": {
                  borderColor: "yellow", // Border color when in focus
                },
              },
              display: "block",
            }}
            InputLabelProps={{
              style: { color: "orange" },
            }}
            InputProps={{
              style: { color: "lightgreen" },
            }}
            className={styles.loginTextField}
          />
          <TextField
            required
            id="login-password-field"
            type="password"
            label="Password"
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#77F877", // Border color when not in focus
                },
                "&:hover fieldset": {
                  borderColor: "green", // Border color on hover
                },
                "&.Mui-focused fieldset": {
                  borderColor: "yellow", // Border color when in focus
                },
              },
              display: "block",
            }}
            InputLabelProps={{
              style: { color: "orange" },
            }}
            InputProps={{
              style: { color: "lightgreen" },
            }}
            className={styles.loginTextField}
          />
          <div className={styles.LoginPromptTextField}>{logInPrompt}</div>
          <Button className={styles.loginButton} onClick={logInUser}>
            Submit
          </Button>
        </div>
        <div
          id="registerFormContainer"
          className={styles.registerFormContainer}
        >
          <div className={styles.registerHeading}>REGISTER</div>
          <TextField
            required
            id="register-userid-field"
            label="User ID"
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#77F877", // Border color when not in focus
                },
                "&:hover fieldset": {
                  borderColor: "green", // Border color on hover
                },
                "&.Mui-focused fieldset": {
                  borderColor: "yellow", // Border color when in focus
                },
              },
              display: "block",
            }}
            InputLabelProps={{
              style: { color: "orange" },
            }}
            InputProps={{
              style: { color: "lightgreen" },
            }}
            className={styles.registerTextField}
          />
          <TextField
            required
            id="register-email-field"
            label="Email Address"
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#77F877", // Border color when not in focus
                },
                "&:hover fieldset": {
                  borderColor: "green", // Border color on hover
                },
                "&.Mui-focused fieldset": {
                  borderColor: "yellow", // Border color when in focus
                },
              },
              display: "block",
            }}
            InputLabelProps={{
              style: { color: "orange" },
            }}
            InputProps={{
              style: { color: "lightgreen" },
            }}
            className={styles.registerTextField}
          />
          <TextField
            required
            id="register-password-field"
            type="password"
            label="Password"
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#77F877", // Border color when not in focus
                },
                "&:hover fieldset": {
                  borderColor: "green", // Border color on hover
                },
                "&.Mui-focused fieldset": {
                  borderColor: "yellow", // Border color when in focus
                },
              },
              display: "block",
            }}
            InputLabelProps={{
              style: { color: "orange" },
            }}
            InputProps={{
              style: { color: "lightgreen" },
            }}
            className={styles.registerTextField}
          />
          <div className={styles.registerPromptTextField}>{registerPrompt}</div>
          <Button className={styles.registerButton} onClick={registerUser}>
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;
