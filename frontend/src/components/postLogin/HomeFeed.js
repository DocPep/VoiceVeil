import styles from "../../styles.module.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Box, Button } from "@mui/material";
import axios from "axios";

function HomeFeed() {
  const navigate = useNavigate();
  const [shouldFadeOut, setShouldFadeOut] = React.useState(false);
  const [feedPosts, setFeedPosts] = React.useState([]);
  const username = JSON.parse(localStorage.getItem("token")).username;

  const handleTextFieldClick = () => {
    setShouldFadeOut(true);
    setTimeout(() => {
      navigate("/create-post");
    }, 100);
  };

  React.useEffect(() => {
    async function getFeedPosts(username) {
      const getPosts = await axios.get(
        "http://localhost:5000/post/get-feed-posts",
        {
          params: {
            username: username,
          },
        }
      );

      setFeedPosts(getPosts.data);
    }
    getFeedPosts(username);
  }, [username]);

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
        {feedPosts.map((post) => {
          return (
            <div className={styles.postContainer}>
              <div>{post.title}</div>
              <div>{post.content}</div>
              <div>{post.tags}</div>
              <div>{post.postCreator}</div>
              <div>{post.dateOfCreation}</div>
              <div>{post.likesCount}</div>
              <div>{post.commentsCount}</div>
              <div>{post.link}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HomeFeed;
