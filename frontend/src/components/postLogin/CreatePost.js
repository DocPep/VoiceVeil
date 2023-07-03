import styles from "../../styles.module.css";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import React from "react";
import axios from "axios";

function CreatePost() {
  const [prompt, SetPrompt] = React.useState("");

  const handleCreatePost = async () => {
    const title = document.getElementById("post-title-field");
    const body = document.getElementById("post-body-field");
    const tags = document.getElementById("post-tag-field");

    if (!title.value) {
      SetPrompt("The post should have a title!");
    } else if (!body.value) {
      SetPrompt("The post should have content other than title!");
    } else if (!tags.value) {
      window.alert("No tags were specified");
    } else {
      const tagsArray = tags.value.split(", ").map((tag) => "#" + tag);
      const result = await axios.post("http://localhost:5000/post/createPost", {
        title: title.value,
        content: body.value,
        tags: tagsArray,
        createdBy: JSON.parse(localStorage.getItem("token")).username,
        createdAt: new Date(),
      });

      SetPrompt(result.data);
    }
  };

  const handleCancelCreatePost = () => {
    window.location.href = "/feed";
  };

  return (
    <div className={styles.createPostBackground}>
      <div className={styles.createPostHeading}>
        <h1>CREATE A POST</h1>
      </div>
      <div className={styles.createPostTextFieldsContainer}>
        <TextField
          label="Post Title"
          placeholder="Enter the title of the post"
          id="post-title-field"
          fullWidth
          sx={{
            backgroundColor: "rgb(17, 221, 211)",
            borderRadius: "4px",
            flexGrow: 1,
            width: "50vw",
          }}
          variant="filled"
          className={styles.createPostTextFields}
        />
        <TextField
          label="Share your thoughts!"
          placeholder="All your opinions go here!"
          id="post-body-field"
          multiline
          fullWidth
          rows={16}
          variant="filled"
          sx={{
            backgroundColor: "rgb(17, 221, 211)",
            borderRadius: "4px",
            flexGrow: 1,
            width: "50vw",
          }}
          className={styles.createPostTextFields}
        />
        <TextField
          label="Tags"
          placeholder="Space for tags relevant to the post"
          id="post-tag-field"
          fullWidth
          sx={{
            backgroundColor: "rgb(17, 221, 211)",
            borderRadius: "4px",
            flexGrow: 1,
            width: "50vw",
          }}
          variant="filled"
          className={styles.createPostTextFields}
          onFocus={() => {
            SetPrompt(
              "Enter tags without '#' and separated by one comma and one space, they will be converted into tags for you automatically"
            );
          }}
          onBlur={() => SetPrompt("")}
        />
      </div>
      <div className={styles.createPostPrompt}>
        <h2>{prompt}</h2>
      </div>
      <div className={styles.createPostButtonsContainer}>
        <Button className={styles.createPostButtons} onClick={handleCreatePost}>
          Create Post
        </Button>
        <Button
          className={styles.createPostButtons}
          onClick={handleCancelCreatePost}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}

export default CreatePost;
