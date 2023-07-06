import styles from "../../styles.module.css";
import React from "react";
import axios from "axios";
import { format } from "date-fns";

function ViewPost() {
  const postID = window.location.href.split("/").slice(-1)[0];
  const [post, setPost] = React.useState([]);

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

  return (
    <>
      {post.length === 0 ? (
        <div>LOADING POST...</div>
      ) : (
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
            Related tags:{" "}
            <b>
              {post.postTags.map((tag) => {
                return <>{tag + " "}</>;
              })}
            </b>
          </div>
          <div className={styles.likes}>
            This post resonated with:
            {" " + post.likes + " "} users
          </div>
        </div>
      )}
    </>
  );
}

export default ViewPost;
