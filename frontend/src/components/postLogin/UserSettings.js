import React from "react";
import axios from "axios";
import { Button } from "@mui/material";
import styles from "../../styles.module.css";
import AccountCircle from "@mui/icons-material/AccountCircle";

function Account(props) {
  const [username, setUsername] = React.useState("");
  const [chorusCount, setChorusCount] = React.useState(-1);
  const [chorusList, setChorusList] = React.useState([]);
  const [chorusToCount, setChorusToCount] = React.useState(-1);
  const [chorusToList, setChorusToList] = React.useState([]);
  const [postCount, setPostCount] = React.useState(-1);
  const [postList, setPostList] = React.useState([]);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    async function getUserData() {
      try {
        const accountData = await axios.get(
          "http://localhost:5000/user/getData",
          {
            params: {
              username: props.username,
            },
          }
        );

        setUsername(accountData.data.userID);
        setChorusCount(accountData.data.chorusVoices);
        setChorusList(accountData.data.chorusList);
        setChorusToCount(accountData.data.chorusTo);
        setChorusToList(accountData.data.chorusToList);
        setPostCount(accountData.data.postsCount);
        setPostList(accountData.data.postList);
      } catch (error) {
        setError(true);
        window.alert(
          "There was some error getting account data. Please try again!"
        );
      }
    }

    getUserData();
  }, [props.username]);

  return (
    <div className={styles.accountSettingsBackground}>
      <div className={styles.accountDetailsContainer}>
        {error ? (
          <div className={styles.errorMessage}>
            We are encountering an error fetching the account data! Please try
            again!
          </div>
        ) : (
          <>
            <div className={styles.accountInfoSocials}>
              <div className={styles.accountDetialsUsernameAndPhotoHolder}>
                <div className={styles.accountDetailsUserIconHolder}>
                  <AccountCircle
                    style={{ fontSize: 100 }}
                    sx={{ color: "gray" }}
                  />
                </div>
                <div className={styles.accountDetailsUserNameHolder}>
                  <h2>{username ? username : "..."}</h2>
                </div>
              </div>
              <div className={styles.chorusOfUserHolder}>
                <div className={styles.accountDetailText}>
                  <h3>User's Chorus has</h3>
                </div>
                <div className={styles.mainAccountDetailValue}>
                  <h2>{chorusCount >= 0 ? chorusCount : "..."}</h2>
                </div>
                <div className={styles.accountDetailText}>
                  <h3>Users</h3>
                </div>
              </div>
              <div className={styles.chorusToUsersHolder}>
                <div className={styles.accountDetailText}>
                  <h3>User is Chorus to</h3>
                </div>
                <div className={styles.mainAccountDetailValue}>
                  <h2>{chorusToCount >= 0 ? chorusToCount : "..."}</h2>
                </div>
                <div className={styles.accountDetailText}>
                  <h3>Users</h3>
                </div>
              </div>
            </div>
            <div className={styles.accountDetailsVerticalSeparator}></div>
            <div className={styles.moreDetailsViewButtons}>
              <Button className={styles.detailViewButtons}>
                View Your Chorus
              </Button>
              <Button className={styles.detailViewButtons}>
                View Who You're Chorus To
              </Button>
              <Button className={styles.detailViewButtons}>
                Account settings
              </Button>
            </div>
            <div className={styles.accountDetailsVerticalSeparator}></div>
            <div className={styles.postSection}>
              <div className={styles.postHeading}>POSTS</div>
              <div className={styles.postsContainer}>
                {postCount > 0
                  ? postList.map((post) => {
                      return (
                        <div className={styles.viewPostInAccount}>
                          <div>{post.title}</div>
                          <Button>View Post</Button>
                        </div>
                      );
                    })
                  : "NO POSTS AS OF NOW :("}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Account;
