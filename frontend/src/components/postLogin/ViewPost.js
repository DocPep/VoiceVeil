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
  const [commentRepliesShowStates, setCommentRepliesShowStates] =
    React.useState([]);
  const [writeReplyToComment, setWriteReplyToComment] = React.useState([]);

  React.useEffect(() => {
    async function getPost() {
      const post = await axios.get("http://localhost:5000/post/getpost", {
        params: {
          postID: postID,
        },
      });

      setPost(post.data);
      setCommentsSize(post.data.comments.length);
      setCommentRepliesShowStates(Array(post.data.comments.length).fill(false));
      setWriteReplyToComment(Array(post.data.comments.length).fill(false));
    }

    getPost();
  }, [postID]);

  const addComment = async () => {
    const comment = {};
    comment["id"] = post.comments.length;
    comment["commenter"] = JSON.parse(localStorage.getItem("token")).username;
    comment["comment"] = document.getElementById("add-comment-field").value;
    comment["likesCount"] = 0;
    comment["dislikesCount"] = 0;
    comment["childComments"] = [];
    post.comments.push(comment);
    setCommentsSize(post.comments.length);
    document.getElementById("add-comment-field").value = "";
    await axios.post("http://localhost:5000/post/updatePost", { post: post });
    commentRepliesShowStates.push(false);
    setCommentRepliesShowStates(commentRepliesShowStates);
  };

  const viewReply = (index) => {
    setCommentRepliesShowStates((prevState) =>
      prevState.map((state, i) => (i === index ? !state : state))
    );
  };

  const replyToComment = (index) => {
    setWriteReplyToComment((prevState) =>
      prevState.map((state, i) => (i === index ? !state : state))
    );
  };

  const addReply = async (index) => {
    const updatedPost = post;
    const newReply = {};
    newReply["index"] = post.comments[index].childComments.length;
    newReply["reply"] = document.getElementById(
      "reply-comment-field-" + index
    ).value;
    newReply["username"] = JSON.parse(localStorage.getItem("token")).username;
    updatedPost.comments[index].childComments.push(newReply);
    setCommentRepliesShowStates((prevState) =>
      prevState.map((state, i) => (i === index ? !state : state))
    );
    document.getElementById("reply-comment-field-" + index).value = "";
    await axios.post("http://localhost:5000/post/updatePost", {
      post: updatedPost,
    });
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
            <h2 className={styles.commentsHeading}>COMMENTS</h2>
            {commentsSize === 0 ? (
              <>
                <div className={styles.commentsInfo}>
                  NO COMMENTS YET :( BE THE FIRST TO COMMENT!!
                </div>
              </>
            ) : (
              <>
                <div className={styles.commentsHolder}>
                  {post.comments.map((com) => (
                    <div className={styles.comment}>
                      <div className={styles.mainCommentBody}>
                        <pre className={styles.commenter}>
                          <div>{com.commenter} says: </div>
                        </pre>
                        <div className={styles.commentBody}>
                          <h3>{com.comment}</h3>
                        </div>
                      </div>
                      <div className={styles.commentInfo}>
                        <div>{com.likesCount} likes</div>
                        <div>{com.dislikesCount} dislikes</div>
                      </div>
                      <div className={styles.commentReplies}>
                        <div>
                          {commentRepliesShowStates[com.id] ? (
                            com.childComments.length > 0 ? (
                              <div className={styles.repliesHolder}>
                                <b>
                                  <h2>REPLIES</h2>
                                </b>
                                {com.childComments.map((reply) => {
                                  return (
                                    <div className={styles.replyUnit}>
                                      <pre>
                                        <h4>{reply.username+":"}</h4>
                                      </pre>
                                      {reply.reply}
                                    </div>
                                  );
                                })}
                              </div>
                            ) : (
                              <div className={styles.repliesHolder}>
                                This comment has no replies
                              </div>
                            )
                          ) : (
                            <></>
                          )}
                        </div>
                        <div>
                          <div className={styles.replyButtons}>
                            <Button onClick={() => viewReply(com.id)}>
                              {commentRepliesShowStates[com.id]
                                ? "Hide All Replies"
                                : "Show All Replies"}
                            </Button>
                            <Button onClick={() => replyToComment(com.id)}>
                              {writeReplyToComment[com.id]
                                ? "Cancel Reply"
                                : "Reply to this comment"}
                            </Button>
                          </div>
                          <div>
                            {writeReplyToComment[com.id] ? (
                              <div className={styles.replyField}>
                                <TextField
                                  label="Reply"
                                  sx={{
                                    backgroundColor: "rgb(17, 221, 211)",
                                    borderRadius: "4px",
                                    width: "50vw",
                                  }}
                                  variant="filled"
                                  id={"reply-comment-field-" + com.id}
                                />
                                <Button onClick={() => addReply(com.id)}>
                                  REPLY
                                </Button>
                              </div>
                            ) : (
                              <></>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
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
