import { TextField } from "@mui/material";
import styles from "../../styles.module.css";
import axios from "axios";
import { Button } from "@mui/material";

function Feedback() {
  const submitFeedback = async () => {
    await axios.post("http://localhost:5000/feedback/submit", {
      feedback: document.getElementById("feedback-field").value,
    });
    document.getElementById("feedback-field").value = "";
    document.getElementById("feedback-submitted").style.display = "flex";
    document.getElementById("feedback").style.display = "none";
  };
  return (
    <>
      <div id="feedback" className={styles.mainFeedback}>
        <TextField
          required
          label="Feedback"
          multiline
          rows={14}
          variant="filled"
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#77F877", // Border color when not in focus
              },
              "&:hover fieldset": {
                borderColor: "green", // Border color on hover
              },
              "&.Mui-focused fieldset": {
                borderColor: "yellow", // Border color when in focus
              },
            },
            display: "block",
          }}
          InputLabelProps={{
            style: { color: "orange" },
          }}
          InputProps={{
            style: { color: "lightgreen", width: "80vw", height: "50vh" },
          }}
          id="feedback-field"
          className={styles.feedbackTextField}
        />
        <Button className={styles.signInButton2} onClick={submitFeedback}>
          Submit
        </Button>
      </div>
      <div id="feedback-submitted" className={styles.feedbackSubmitted}>
        <div className={styles.formatter}>
          <div>Feedback submitted successfully! Continue using our app</div>
          <div>OR</div>
          <div>
            <Button
              className={styles.feedBackButton}
              onClick={() => (window.location.href = "/feedback")}
            >
              submit another feedback
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Feedback;
