import styles from "../../styles.module.css";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";

function CreatePost() {
  return (
    <div className={styles.createPostBackground}>
      <div className={styles.createPostHeading}>
        <h1>CREATE A POST</h1>
      </div>
      <div className={styles.createPostTextFieldsContainer}>
        <TextField
          label="Post Title"
          placeholder="Enter the title of the post"
          fullWidth
          sx={{
            backgroundColor: "#d1542f",
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
          multiline
          fullWidth
          rows={16}
          variant="filled"
          sx={{
            backgroundColor: "#d1542f",
            borderRadius: "4px",
            flexGrow: 1,
            width: "50vw",
          }}
          className={styles.createPostTextFields}
        />
        <TextField
          label="Tags"
          placeholder="Enter tags without '#' and separated by commas, they will be converted into tags for you automatically"
          fullWidth
          sx={{
            backgroundColor: "#d1542f",
            borderRadius: "4px",
            flexGrow: 1,
            width: "50vw",
          }}
          variant="filled"
          className={styles.createPostTextFields}
        />
      </div>
      <div className={styles.createPostButtonsContainer}>
        <Button className={styles.createPostButtons}>Create Post</Button>
        <Button className={styles.createPostButtons}>Cancel</Button>
      </div>
    </div>
  );
}

export default CreatePost;
