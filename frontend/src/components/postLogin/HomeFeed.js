import styles from "../../styles.module.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Box, Button } from "@mui/material";
import axios from "axios";
import { format } from "date-fns";

function HomeFeed() {
  const navigate = useNavigate();
  const [shouldFadeOut, setShouldFadeOut] = React.useState(false);
  const [feedPosts, setFeedPosts] = React.useState([]);
  const username = JSON.parse(localStorage.getItem("token")).username;
  const [feedSet, setFeed] = React.useState(false);

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
      setFeed(true);
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
        {feedSet ? (
          feedPosts.length > 0 ? (
            feedPosts.map((post) => {
              return (
                <div className={styles.postContainer}>
                  <div className={styles.postTitle}>
                    <h1>{post.postTitle}</h1>
                  </div>
                  <div className={styles.postContent}>
                    <h3>{post.postContent}</h3>
                  </div>
                  <div className={styles.showPostBottomBar}>
                    <div className={styles.postCreator}>
                      Voice of: <b>{post.postCreator}</b>
                    </div>
                    <div className={styles.postDate}>
                      {format(new Date(post.postDate), "do-MMMM-yyyy HH:mm:ss")}
                    </div>
                  </div>
                  <div className={styles.postTags}>
                    Related tags: <b>{post.postTags}</b>
                  </div>
                  <div className={styles.likes}>
                    This post resonated with:{" " + post.likes + " "} users
                  </div>
                  <Button className={styles.viewPostButton}>VIEW POST</Button>
                </div>
              );
            })
          ) : (
            <div>NO POSTS HERE</div>
          )
        ) : (
          <><div className={styles.loadingPostsMessage}>LOADING POSTS PLEASE WAIT...</div></>
        )}
      </div>
    </div>
  );
}

export default HomeFeed;
