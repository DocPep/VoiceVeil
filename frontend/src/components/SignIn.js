import react from "react";
import styles from "../styles.module.css";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import SwipeableViews from "react-swipeable-views";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
      className={styles.loginBoxContainer}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>
            <div
              style={
                index === 0
                  ? {
                      display: "flex",
                      justifyContent: "center",
                      color: "#60D38D",
                      fontSize: "32px",
                    }
                  : {
                      display: "flex",
                      justifyContent: "center",
                      color: "#60D38D",
                      fontSize: "32px",
                      marginTop: "-30px",
                    }
              }
            >
              {index === 0 ? "LOGIN" : "REGISTER"}
            </div>
            {children}
          </Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

function SignInPage() {
  const theme = useTheme();
  const [value, setValue] = react.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className={styles.signInPageContainer}>
      <Box sx={{ bgcolor: "#0a2a35", width: 1200, height: 500 }}>
        <AppBar position="static">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="inherit"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label="Log In" {...a11yProps(0)} />
            <Tab label="Register" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel
            value={value}
            index={0}
            dir={theme.direction}
            className={styles.loginBoxContainer}
          >
            <TextField
              required
              id="userid-field"
              label="User ID"
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
                style: { color: "lightgreen" },
              }}
              className={styles.loginTextField}
            />
            <TextField
              required
              id="password-field"
              label="Password"
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
                style: { color: "lightgreen" },
              }}
              className={styles.loginTextField}
            />
            <Button className={styles.loginButton}>Submit</Button>
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <TextField
              required
              id="userid-field"
              label="User ID"
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
                style: { color: "lightgreen" },
              }}
              className={styles.registerTextField}
            />
            <TextField
              required
              id="email-field"
              label="Email Address"
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
                style: { color: "lightgreen" },
              }}
              className={styles.registerTextField}
            />
            <TextField
              required
              id="password-field"
              label="Password"
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
                style: { color: "lightgreen" },
              }}
              className={styles.registerTextField}
            />
            <Button className={styles.registerButton}>Submit</Button>
          </TabPanel>
        </SwipeableViews>
      </Box>
    </div>
  );
}

export default SignInPage;
