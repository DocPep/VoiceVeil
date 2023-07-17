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
  const handleViewUserChorus = () => {
    document.getElementById("chorus-to-list").style.display = "none";
    document.getElementById("chorus-list").style.display = "flex";
  };

  const handleViewUserToChorus = () => {
    document.getElementById("chorus-list").style.display = "none";
    document.getElementById("chorus-to-list").style.display = "flex";
  };

  const closeUserChorus = () => {
    document.getElementById("chorus-list").style.display = "none";
  };

  const closeViewChorusTo = () => {
    document.getElementById("chorus-to-list").style.display = "none";
  };

  const viewUser = (user) => {
    window.location.href = "/user/" + user;
  };

  const viewPost = (id) => {
    window.location.href = "/viewpost/" + id;
  };

  const openAccountSettings = () => {
    window.location.href = "/" + username + "/account-settings";
  };
  return (
    <div className={styles.accountSettingsBackground}>
      <div className={styles.chorusList} id="chorus-list">
        {chorusCount === -1 ? (
          <div className={styles.loadingMessage}>Loading...</div>
        ) : (
          <div className={styles.followerList}>
            <div className={styles.followersListHeader}>
              <h2 className={styles.FollowersHeading}>User's Chorus</h2>
              <Button className={styles.closeButton} onClick={closeUserChorus}>
                X
              </Button>
            </div>
            {chorusList.length === 0 ? (
              <div className={styles.loadingMessage}>
                No members are part of User's chorus
              </div>
            ) : (
              chorusList.map((user) => {
                return (
                  <div className={styles.follower}>
                    <div>{user}</div>
                    <Button
                      className={styles.viewUserButton2}
                      onClick={() => viewUser(user)}
                    >
                      View User
                    </Button>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
      <div className={styles.chorusToList} id="chorus-to-list">
        {chorusToCount === -1 ? (
          <div className={styles.loadingMessage}>Loading...</div>
        ) : (
          <div className={styles.followerList}>
            <div className={styles.followersListHeader}>
              <h2 className={styles.FollowersHeading}>User is Chorus to</h2>
              <Button
                className={styles.closeButton}
                onClick={closeViewChorusTo}
              >
                X
              </Button>
            </div>
            {chorusToList.length === 0 ? (
              <div className={styles.loadingMessage}>
                No members user is part of chorus to
              </div>
            ) : (
              chorusToList.map((user) => {
                return (
                  <div className={styles.follower}>
                    <div>{user}</div>
                    <Button
                      className={styles.viewUserButton2}
                      onClick={() => viewUser(user)}
                    >
                      View User
                    </Button>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
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
                  <h3>Your Chorus has</h3>
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
                  <h3>Your are part of Chorus of</h3>
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
              <Button
                className={styles.detailViewButtons}
                onClick={handleViewUserChorus}
              >
                View your chorus
              </Button>
              <Button
                className={styles.detailViewButtons}
                onClick={handleViewUserToChorus}
              >
                View who you're chorus to
              </Button>
              <Button
                className={styles.detailViewButtons}
                onClick={openAccountSettings}
              >
                Account settings
              </Button>
            </div>
            <div className={styles.accountDetailsVerticalSeparator}></div>
            <div className={styles.postSection1}>
              <div className={styles.postHeading1}>POSTS</div>
              <div className={styles.postsContainer}>
                {postCount === -1
                  ? "..."
                  : postCount > 0
                  ? postList.map((post) => {
                      return (
                        <div className={styles.exploreAccountPostContainer}>
                          <div className={styles.postUsername}>
                            {post.title}
                          </div>
                          <Button
                            className={styles.viewPostButton1}
                            onClick={() => viewPost(post.id)}
                          >
                            VIEW THIS POST
                          </Button>
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
