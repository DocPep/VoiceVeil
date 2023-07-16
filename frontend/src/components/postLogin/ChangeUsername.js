import styles from "../../styles.module.css";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import React from "react";
import axios from "axios";
function ChangeUsername() {
  const [prompt, setPrompt] = React.useState("");
  const changeUsername = async () => {
    setPrompt("");
    const newUsername = document.getElementById("username-field").value;

    const result = await axios.post(
      "http://localhost:5000/user/change-username",
      {
        username: JSON.parse(localStorage.getItem("token")).username,
        newUsername: newUsername,
      }
    );

    setPrompt(result.data);
    if (result.data === "Username updated succesfully! :)") {
      localStorage.setItem(
        "token",
        JSON.stringify({
          username: newUsername,
          loggedIn: true,
        })
      );
      setPrompt("Username updated succesfully! :) Refresh to see changes");
    }
  };
  return (
    <div className={styles.settingsBackground}>
      <h1 className={styles.accountSettingsHeading}>Change Username</h1>
      <TextField
        required
        id="username-field"
        label="New Username"
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
          style: { color: "orange", fontFamily: "Kanit" },
        }}
        InputProps={{
          style: { color: "lightgreen", fontFamily: "Kanit" },
        }}
        className={styles.loginTextField}
      />
      <Button
        className={styles.accountSettingsSubmitButton}
        onClick={changeUsername}
      >
        Confirm
      </Button>
      <h2 className={styles.accountSettingsPrompt}>{prompt}</h2>
    </div>
  );
}

export default ChangeUsername;
