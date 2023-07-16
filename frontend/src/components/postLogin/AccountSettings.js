import React from "react";
import styles from "../../styles.module.css";
import { Button } from "@mui/material";

function AccountSettings() {
  const openPage = (id) => {
    if (id === 0) {
      const currLocation = window.location.href;
      window.location.href = currLocation + "/change-username";
    } else if (id === 1) {
      const currLocation = window.location.href;
      window.location.href = currLocation + "/change-password";
    } else {
      const currLocation = window.location.href;
      window.location.href = currLocation + "/delete-account";
    }
  };
  return (
    <div className={styles.settingsBackground}>
      <h1 className={styles.accountSettingsHeading}>ACCOUNT SETTINGS</h1>
      <Button className={styles.settingButtons} onClick={() => openPage(0)}>
        Change username
      </Button>
      <Button className={styles.settingButtons} onClick={() => openPage(1)}>
        Change password
      </Button>
    </div>
  );
}

export default AccountSettings;
