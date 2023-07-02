import styles from "../../styles.module.css";
import React from "react";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Box } from "@mui/material";

function HomeFeed() {
  return (
    <div className={styles.postLoginHomePageBackground}>
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
              width: "50vw"
            }}
          />
        </Box>
      </div>
    </div>
  );
}

export default HomeFeed;
