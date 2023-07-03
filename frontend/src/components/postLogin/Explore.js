import styles from "../../styles.module.css";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Button } from "@mui/material";

function ExplorePage() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#ffa500",
      },
    },
  });

  const handleSearch = () => {
    window.alert("You clicked the search button");
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
        <div className={styles.resultSpace}></div>
      </div>
    </div>
  );
}

export default ExplorePage;
