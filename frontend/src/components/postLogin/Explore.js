import React from "react";
import styles from "../../styles.module.css";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Button } from "@mui/material";
import axios from "axios";

function ExplorePage() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#ffa500",
      },
    },
  });

  const [postsSet, setPostsSet] = React.useState(false);
  const [tagsSet, setTagsSet] = React.useState(false);
  const [accountsSet, setAccountsSet] = React.useState(false);
  const [postResults, setPostResults] = React.useState([]);
  const [postsWithTagsResults, setPostsWithTagsResults] = React.useState([]);
  const [accountResults, setAccountResults] = React.useState([]);

  const handleSearch = async () => {
    setAccountResults([]);
    setPostResults([]);
    setPostsWithTagsResults([]);

    var searchList = [];
    if (document.getElementById("posts-checkbox").checked) {
      searchList.push("posts");
    }
    if (document.getElementById("posts-tags-checkbox").checked) {
      searchList.push("tags");
    }
    if (document.getElementById("accounts-checkbox").checked) {
      searchList.push("accounts");
    }

    searchList.sort();

    const searchQueryResults = await axios.get(
      "http://localhost:5000/search/explorePage",
      {
        params: {
          searchFor: searchList,
        },
      }
    );

    if (searchList.includes("posts")) {
      setPostsSet(true);
      setPostResults(searchQueryResults.data.posts);
    } else {
      setPostsSet(false);
    }
    if (searchList.includes("tags")) {
      setTagsSet(true);
      setPostsWithTagsResults(searchQueryResults.data.tags);
    } else {
      setTagsSet(false);
    }
    if (searchList.includes("accounts")) {
      setAccountsSet(true);
      setAccountResults(searchQueryResults.data.accounts);
    } else {
      setAccountsSet(false);
    }
  };

  return (
    <div className={styles.explorePageBackground}>
      <div className={styles.exploreContainer}>
        <div className={styles.searchSpace}>
          <div className={styles.searchBarAndButton}>
            <ThemeProvider theme={theme}>
              <OutlinedInput
                placeholder="Search"
                id="explore-search-field"
                startAdornment={
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                }
                sx={{
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#ffa500",
                  },
                  backgroundColor: "rgba(250, 250, 250, 0.25)",
                  borderRadius: "120px",
                  width: "35vw",
                }}
                className={styles.searchBar}
              />
            </ThemeProvider>
            <Button className={styles.searchButton} onClick={handleSearch}>
              Search
            </Button>
          </div>
          <div className={styles.checkBoxContainer}>
            <h3 className={styles.helperText}> Search for : </h3>
            <FormControlLabel
              control={
                <Checkbox
                  sx={{
                    color: "lightgreen",
                    "&.Mui-checked": {
                      color: "yellow",
                    },
                  }}
                  id="posts-checkbox"
                />
              }
              label="Posts"
              style={{
                color: "yellowgreen",
              }}
              className={styles.checkBoxes}
            />
            <FormControlLabel
              control={
                <Checkbox
                  sx={{
                    color: "lightgreen",
                    "&.Mui-checked": {
                      color: "yellow",
                    },
                  }}
                  id="posts-tags-checkbox"
                />
              }
              label="Posts with tags"
              style={{
                color: "yellowgreen",
              }}
              className={styles.checkBoxes}
            />
            <FormControlLabel
              control={
                <Checkbox
                  sx={{
                    color: "lightgreen",
                    "&.Mui-checked": {
                      color: "yellow",
                    },
                  }}
                  id="accounts-checkbox"
                />
              }
              label="Accounts"
              style={{
                color: "yellowgreen",
              }}
              className={styles.checkBoxes}
            />
          </div>
          <div className={styles.helperText}>
            Please select atleast one of the above
          </div>
        </div>
        <div className={styles.explorePagehorizontalSeparator}></div>
        <div className={styles.resultSpace}>
          {!postsSet && !tagsSet && !accountsSet ? (
            "Search for something you biatch!"
          ) : (
            <>
              <div>
                <div>
                  {postsSet ? (
                    <>
                      <div className={styles.searchTypeHeading}><h2>POSTS</h2></div>
                      <div>
                        {postResults.map((post) => {
                          return (
                            <div className={styles.postContainer}>
                              <div>{post.title}</div>
                              <div>{post.content}</div>
                              <div>{post.tags}</div>
                              <div>{post.postCreator}</div>
                              <div>{post.dateOfCreation}</div>
                              <div>{post.likesCount}</div>
                              <div>{post.commentsCount}</div>
                              <div>{post.link}</div>
                            </div>
                          );
                        })}
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
                <div>
                  {tagsSet ? (
                    <>
                      <div className={styles.searchTypeHeading}><h2>TAGS</h2></div>
                      <div>
                        {postsWithTagsResults.map((post) => {
                          return (
                            <div className={styles.postContainer}>
                              <div>{post.title}</div>
                              <div>{post.content}</div>
                              <div>{post.tags}</div>
                              <div>{post.postCreator}</div>
                              <div>{post.dateOfCreation}</div>
                              <div>{post.likesCount}</div>
                              <div>{post.commentsCount}</div>
                              <div>{post.link}</div>
                            </div>
                          );
                        })}
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
                <div>
                  {accountsSet ? (
                    <>
                      <div className={styles.searchTypeHeading}><h2>ACCOUNTS</h2></div>
                      <div>
                        {accountResults.map((post) => {
                          return (
                            <div className={styles.postContainer}>
                              <div>{post.title}</div>
                              <div>{post.content}</div>
                              <div>{post.tags}</div>
                              <div>{post.postCreator}</div>
                              <div>{post.dateOfCreation}</div>
                              <div>{post.likesCount}</div>
                              <div>{post.commentsCount}</div>
                              <div>{post.link}</div>
                            </div>
                          );
                        })}
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ExplorePage;
