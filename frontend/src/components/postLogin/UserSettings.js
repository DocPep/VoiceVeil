import styles from "../../styles.module.css";
import React from "react";
import axios from "axios";
import { Button } from "@mui/material";

function Account(props) {
  const [username, setUsername] = React.useState("");
  const [chorusCount, setChorusCount] = React.useState(-1);
  const [chorusList, setChorusList] = React.useState([]);
  const [chorusToCount, setChorusToCount] = React.useState(-1);
  const [chorusToList, setChorusToList] = React.useState([]);
  const [trusteeCount, setTrusteeCount] = React.useState(-1);
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

        console.log(accountData);
        setUsername(accountData.data.userID);
        setChorusCount(accountData.data.chorusVoices);
        setChorusList(accountData.data.chorusList);
        setChorusToCount(accountData.data.chorusTo);
        setChorusToList(accountData.data.chorusToList);
        setTrusteeCount(accountData.data.trusteeCount);
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
            <div className={styles.accountDetailsUserName}>
              <b className={styles.usernameTitle}>
                <h2>Username</h2>
              </b>
              <h3 className={styles.actualUserName}>{username ? username : "Fetching data... Please wait"}</h3>
            </div>
            <div className={styles.chorusDetails}>
              <div className={styles.accountDetailsUserChorus}>
                <div className={styles.chorusHeader}>
                  <b>
                    <h3>User's Chorus has</h3>
                  </b>
                </div>
                <div className={styles.chorusDetailHolder}>
                  <h1>{chorusCount ? chorusCount : "..."}</h1> <h3>users</h3>
                </div>
                <Button className={styles.detailsViewButton}>View</Button>
              </div>
              <div className={styles.accountDetailsChorusTo}>
                <div className={styles.chorusHeader}>
                  <b>
                    <h3>User is part of chorus to</h3>
                  </b>
                </div>
                <div className={styles.chorusDetailHolder}>
                  <h1>{chorusToCount ? chorusToCount : "..."}</h1> <h3>users</h3>
                </div>
                <Button className={styles.detailsViewButton}>View</Button>
              </div>
            </div>
            <div className={styles.accountDetailsTrustee}>
              <b className={styles.trusteeTitle}>
                <h2>This user is trusted by</h2>
              </b>
              <div className={styles.actualTrusteeCount}>
                <h1>{trusteeCount ? trusteeCount : "..."}</h1> <h3> users</h3>{" "}
              </div>
            </div>
            <div className={styles.posts}>
              <h2 className={styles.postHeader}>
                This user has created {postCount ? postCount : "..."} posts
              </h2>
              <Button className={styles.detailsViewButton}>View</Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Account;
