import styles from "../../styles.module.css";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import React from "react";
import axios from "axios";
function ChangePassword() {
  const [prompt, setPrompt] = React.useState("");
  const changePassword = async () => {
    const oldPassword = document.getElementById("old-password").value;
    const oldPassword2 = document.getElementById("old-password-2").value;
    const newPassword = document.getElementById("new-password").value;

    if (!oldPassword || !oldPassword2 || !newPassword) {
      setPrompt("Please fill all the fields!");
    } else if (oldPassword !== oldPassword2) {
      setPrompt("Old password does not match with re-entered password!");
    } else if (oldPassword === newPassword) {
      setPrompt("New password cannot be the same as old password!");
    } else {
      if (newPassword.length < 8) {
        setPrompt("Password length must be at least 8");
      } else {
        setPrompt("");
        const response = await axios.post(
          "http://localhost:5000/user/change-password",
          {
            username: JSON.parse(localStorage.getItem("token")).username,
            oldPassword: oldPassword2,
            newPassword: newPassword,
          }
        );

        setPrompt(response.data);
      }
    }
  };

  return (
    <div className={styles.settingsBackground}>
      <h1 className={styles.accountSettingsHeading}>Change Password</h1>
      <TextField
        required
        id="old-password"
        label="Old Password"
        type="password"
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
      <TextField
        required
        id="old-password-2"
        label="Re-Enter Old Password"
        type="password"
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
      <TextField
        required
        id="new-password"
        label="New Password"
        type="password"
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
        onClick={changePassword}
      >
        Confirm
      </Button>
      <h2 className={styles.accountSettingsPrompt}>{prompt}</h2>
    </div>
  );
}

export default ChangePassword;
