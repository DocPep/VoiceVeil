import styles from "../../styles.module.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Box } from "@mui/material";

function HomeFeed() {
  const navigate = useNavigate();
  const [shouldFadeOut, setShouldFadeOut] = React.useState(false);

  const handleTextFieldClick = () => {
    setShouldFadeOut(true);
    setTimeout(() => {
      navigate("/create-post");
    }, 100);
  };

  return (
    <div
      className={`${styles.postLoginHomePageBackground} ${
        shouldFadeOut ? styles.fadeOut : ""
      }`}
    >
      <div className={styles.postVoice}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#030303",
            padding: "10px",
          }}
        >
          <AccountCircle
            sx={{
              color: "orange",
              mr: 1,
              my: 0.5,
            }}
          />
          <TextField
            label="Create a post and Voice Yourself!"
            multiline
            fullWidth
            rows={4}
            variant="filled"
            sx={{
              backgroundColor: "#d1542f",
              borderRadius: "4px",
              flexGrow: 1,
              width: "50vw",
            }}
            onClick={handleTextFieldClick}
          />
        </Box>
      </div>
    </div>
  );
}

export default HomeFeed;
