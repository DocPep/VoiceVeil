import styles from "../../styles.module.css";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import React from "react";
import axios from "axios";

function CreatePost() {
  const [prompt, SetPrompt] = React.useState("");

  function formatDate(dateString) {
    const parts = dateString.split("-");
    const day = parseInt(parts[0]);
    const month = parseInt(parts[1]);
    const year = parseInt(parts[2]);

    const date = new Date(year, month - 1, day);
    const formatter = new Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    return formatter.format(date);
  }

  const handleCreatePost = async () => {
    const title = document.getElementById("post-title-field");
    const body = document.getElementById("post-body-field");
    const tags = document.getElementById("post-tag-field");

    if (!title.value) {
      SetPrompt("The post should have a title!");
    } else if (!body.value) {
      SetPrompt("The post should have content other than title!");
    } else if (!tags.value) {
      SetPrompt("Specify at least one tag related to the post!");
    } else {
      const tagsArray = tags.value.split(", ").map((tag) => "#" + tag);
      const dateobj = new Date();
      const day = dateobj.getDate();
      const month = dateobj.getMonth() + 1;
      const year = dateobj.getFullYear();
      const dateactual = formatDate(day + "-" + month + "-" + year);
      const result = await axios.post("http://localhost:5000/post/createPost", {
        title: title.value,
        content: body.value,
        tags: tagsArray,
        createdBy: JSON.parse(localStorage.getItem("token")).username,
        createdAt: dateactual,
      });

      SetPrompt(result.data);
      document.getElementById("actual-create-post").style.display = "none";
      document.getElementById("post-created").style.display = "flex";
    }
  };

  const createAnotherPost = () => {
    document.getElementById("post-title-field").value = "";
    document.getElementById("post-body-field").value = "";
    document.getElementById("post-tag-field").value = "";
    document.getElementById("actual-create-post").style.display = "block";
    document.getElementById("post-created").style.display = "none";
    SetPrompt("");
  };

  const handleCancelCreatePost = () => {
    window.location.href = "/feed";
  };

  return (
    <div className={styles.createPostBackground}>
      <div id="actual-create-post">
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
          <h4>{prompt}</h4>
        </div>
        <div className={styles.createPostButtonsContainer}>
          <Button
            className={styles.createPostButtons}
            onClick={handleCreatePost}
          >
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
      <div id="post-created" className={styles.hiddenPostCreate}>
        <div className={styles.hiddenPostCreateHolder}>
          POST CREATED SUCCESFULLY!
          <Button
            onClick={createAnotherPost}
            className={styles.createPostButtons2}
          >
            Create another post
          </Button>
          <Button
            onClick={handleCancelCreatePost}
            className={styles.createPostButtons2}
          >
            Go to Home
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
