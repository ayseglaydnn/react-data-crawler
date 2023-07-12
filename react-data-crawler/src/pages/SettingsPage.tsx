import React, { useState } from "react";
import { Button, Card, Checkbox, Container, Header } from "semantic-ui-react";

const SettingsPage = () => {
  const [appNotification, setAppNotification] = useState(true);
  const [emailNotification, setEmailNotification] = useState(true);

  const toggleAppNotification = () => {
    setAppNotification(!appNotification);
  };

  const toggleEmailNotification = () => {
    setEmailNotification(!emailNotification);
  };

  return (
    <Container fluid>
      <Card>
        <Card.Content header="Settings" />
        <Card.Content>
          <div className="option">
            <Checkbox
              className={appNotification ? "on" : ""}
              checked={appNotification}
              onClick={toggleAppNotification}
              toggle
              label="Send App Notification"
            />
          </div>
          <br />
          <div className="option">
            <Checkbox
              className={emailNotification ? "on" : ""}
              checked={emailNotification}
              onClick={toggleEmailNotification}
              toggle
              label="Send Email Notification"
            />
          </div>
        </Card.Content>
      </Card>
    </Container>
  );
};

export default SettingsPage;
