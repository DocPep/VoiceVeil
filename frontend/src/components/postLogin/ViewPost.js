import styles from "../../styles.module.css";
import React from "react";
import axios from "axios";
import { format } from "date-fns";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";

function ViewPost() {
  const postID = window.location.href.split("/").slice(-1)[0];
  const [post, setPost] = React.useState([]);
  const [commentsSize, setCommentsSize] = React.useState(0);

  React.useEffect(() => {
    async function getPost() {
      const post = await axios.get("http://localhost:5000/post/getpost", {
        params: {
          postID: postID,
        },
      });

      setPost(post.data);
    }

    getPost();
  }, [postID]);

  const addComment = () => {
    console.log("I was called");
    const comment = document.getElementById("add-comment-field").value;
    post.comments.push(comment);
    setCommentsSize(post.comments.length);
    document.getElementById("add-comment-field").value = "";
  };

  return (
    <>
      {post.length === 0 ? (
        <div className={styles.loadingPostScreen}>LOADING POST...</div>
      ) : (
        <div className={styles.viewPostBackground}>
          <div className={styles.viewPostContainer}>
            <div className={styles.viewPostTitle}>
              <h1>{post.postTitle}</h1>
            </div>
            <div className={styles.viewPostContent}>
              <h3>{post.postContent}</h3>
            </div>
            <div className={styles.viewShowPostBottomBar}>
              <div className={styles.viewPostCreator}>
                Voice of: <b>{post.postCreator}</b>
              </div>
              <div className={styles.viewPostDate}>
                {format(new Date(post.postDate), "do-MMMM-yyyy HH:mm:ss")}
              </div>
            </div>
            <div className={styles.viewPostTags}>
              Related tags:{" "}
              <b>
                {post.postTags.map((tag) => {
                  return <>{tag + " "}</>;
                })}
              </b>
            </div>
            <div className={styles.viewLikes}>
              This post resonated with:
              {" " + post.likes + " "} users
            </div>
          </div>
          <div className={styles.viewComments}>
            <h2>COMMENTS</h2>
            {commentsSize === 0 ? (
              <>
                <div>NO COMMENTS YET</div>
              </>
            ) : (
              <>
                <div className={styles.commentsHolder}>
                  {post.comments.map((com) => (
                    <div>{com}</div>
                  ))}
                </div>
              </>
            )}
            <TextField
              label="Add a comment"
              placeholder="Share your thoughts"
              sx={{
                backgroundColor: "rgb(17, 221, 211)",
                borderRadius: "4px",
                flexGrow: 1,
                width: "50vw",
              }}
              InputLabelProps={{
                shrink: true,
              }}
              variant="filled"
              id="add-comment-field"
            />
            <Button onClick={() => addComment()}>POST COMMENT</Button>
          </div>
        </div>
      )}
    </>
  );
}

export default ViewPost;
