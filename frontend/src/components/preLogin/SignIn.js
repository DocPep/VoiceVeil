import styles from "../../styles.module.css";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import react from "react";
import axios from "axios";

function SignInPage(props) {
  const [logInPrompt, setLogInPrompt] = react.useState("");
  const [registerPrompt, setRegisterPrompt] = react.useState("");
  const [showLogin, setShowLogin] = react.useState(true);
  const [loginUserNameValue, setLoginUserNameValue] = react.useState("");
  const [loginPassValue, setLoginPassValue] = react.useState("");
  const [registerUserNameValue, setRegisterUserNameValue] = react.useState("");
  const [registerPassValue, setRegisterPassValue] = react.useState("");
  const [registerEmailValue, setRegisterEmailValue] = react.useState("");

  const handleLoginUserNameChange = (event) => {
    setLoginUserNameValue(event.target.value);
  };
  const handleLoginPassChange = (event) => {
    setLoginPassValue(event.target.value);
  };
  const handleRegisterUserNameChange = (event) => {
    setRegisterUserNameValue(event.target.value);
  };
  const handleRegisterPassChange = (event) => {
    setRegisterPassValue(event.target.value);
  };
  const handleRegisterEmailChange = (event) => {
    setRegisterEmailValue(event.target.value);
  };

  const showLoginScreen = () => {
    if (!showLogin) {
      document.getElementById("registerHeader").style.color = "#9dc4eb";
      document.getElementById("loginHeader").style.color = "white";
      document.getElementById("loginFormContainer").style.opacity = "1";
      document.getElementById("registerFormContainer").style.opacity = "0";
      document.getElementById("loginFormContainer").style.zIndex = "20";
      document.getElementById("registerFormContainer").style.zIndex = "10";
      setLoginPassValue("");
      setLoginUserNameValue("");
      setRegisterPrompt("");
      setShowLogin(true);
    }
  };

  const showRegisterScreen = () => {
    if (showLogin) {
      document.getElementById("registerHeader").style.color = "white";
      document.getElementById("loginHeader").style.color = "#9dc4eb";
      document.getElementById("loginFormContainer").style.opacity = "0";
      document.getElementById("registerFormContainer").style.opacity = "1";
      document.getElementById("loginFormContainer").style.zIndex = "10";
      document.getElementById("registerFormContainer").style.zIndex = "20";
      setRegisterEmailValue("");
      setRegisterPassValue("");
      setRegisterUserNameValue("");
      setLogInPrompt("");
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
      if(response.data === "Login successful! :)") {
        localStorage.setItem("token", JSON.stringify({
          "username": username,
          "loggedIn": "true"
        }));
        props.setLoggedIn(true);
        window.location.href = "/feed"
      }
    }
  };

  const validateUserName = (username) => {
    const regex = /[a-zA-Z]/g;
    const matches = username.match(regex);
    return matches !== null && matches.length >= 4;
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
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
    } else if (validateUserName(username) === false) {
      setRegisterPrompt("Username must contain atleast 4 english characters");
    } else if (validateEmail(email) === false) {
      setRegisterPrompt("Please enter a valid email");
    } else if (password.length < 8) {
      setRegisterPrompt("Password must be atleast 8 characters");
    } else {
      const response = await axios.post("http://localhost:5000/user/register", {
        username: username,
        email: email,
        password: password,
      });
      setRegisterPrompt(response.data);
      if(response.data === "User succesfully registered! Please login with the registered details :)") {
        setTimeout(showLoginScreen, 3000);
      }
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
            value={loginUserNameValue}
            onChange={handleLoginUserNameChange}
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
              shrink: loginUserNameValue!== ""
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
            value={loginPassValue}
            onChange={handleLoginPassChange}
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
              shrink: loginPassValue!== ""
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
            value={registerUserNameValue}
            onChange={handleRegisterUserNameChange}
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
              shrink: registerUserNameValue!== ""
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
            value={registerEmailValue}
            onChange={handleRegisterEmailChange}
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
              shrink: registerEmailValue!== ""
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
            value={registerPassValue}
            onChange={handleRegisterPassChange}
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
              shrink: registerPassValue !== ""
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
