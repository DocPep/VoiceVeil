import styles from "../../styles.module.css";
import React from "react";
import axios from "axios";
import { Button } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";

function ViewUser() {
  const username = window.location.href.split("/").slice(-1)[0];
  const [chorusCount, setChorusCount] = React.useState(-1);
  const [chorusList, setChorusList] = React.useState([-1]);
  const [chorusToCount, setChorusToCount] = React.useState(-1);
  const [chorusToList, setChorusToList] = React.useState({});
  const [postCount, setPostCount] = React.useState(-1);
  const [postList, setPostList] = React.useState([]);
  const [error, setError] = React.useState(false);
  const currentUser = JSON.parse(localStorage.getItem("token")).username;

  React.useState(() => {
    async function getUser() {
      const accountData = await axios
        .get("http://localhost:5000/user/getData", {
          params: {
            username: username,
          },
        })
        .catch((error) => setError(error));

      setChorusCount(accountData.data.chorusVoices);
      setChorusList(accountData.data.chorusList);
      setChorusToCount(accountData.data.chorusTo);
      setChorusToList(accountData.data.chorusToList);
      setPostCount(accountData.data.postsCount);
      setPostList(accountData.data.postList);
    }

    getUser();
  }, []);

  const unfollow = async () => {
    const newChorusList = chorusList.filter((user) => user !== currentUser);
    setChorusList(newChorusList);
    setChorusCount(chorusCount - 1);
    await axios.post("http://localhost:5000/user/unfollow", {
      unfollowed: username,
      unfollower: currentUser,
      inc: -1,
    });
  };

  const follow = async () => {
    const newChorusList = [...chorusList];
    newChorusList.push(currentUser);
    setChorusList(newChorusList);
    setChorusCount(chorusCount + 1);
    await axios.post("http://localhost:5000/user/follow", {
      followed: username,
      follower: currentUser,
      inc: 1,
    });
  };

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
                <div className={styles.followUnfollowButton}>
                  {chorusList[0] === -1 ? (
                    <div>...</div>
                  ) : chorusList.includes(currentUser) ||
                    username === currentUser ? (
                    <Button
                      className={styles.detailViewButtons}
                      onClick={unfollow}
                    >
                      Leave Chorus
                    </Button>
                  ) : (
                    <Button
                      className={styles.detailViewButtons}
                      onClick={follow}
                    >
                      Join Chorus
                    </Button>
                  )}
                </div>
              </div>
              <div className={styles.chorusOfUserHolder}>
                <div className={styles.accountDetailText}>
                  <h3>
                    {username === currentUser
                      ? "Your Chorus has"
                      : "User's Chorus has"}
                  </h3>
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
                  <h3>
                    {username === currentUser
                      ? "Your are part of Chorus of"
                      : "User is Chorus to"}
                  </h3>
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
                {username === currentUser
                  ? "View your chorus"
                  : "View user's chorus"}
              </Button>
              <Button
                className={styles.detailViewButtons}
                onClick={handleViewUserToChorus}
              >
                {username === currentUser
                  ? "View who you're chorus to"
                  : "View chorus user is part of"}
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

export default ViewUser;
