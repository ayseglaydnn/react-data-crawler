import { useState } from "react";
import { Card, Checkbox, Container, Grid } from "semantic-ui-react";

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
    <Grid centered style={{ height: "50vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Container fluid >
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
      </Grid.Column>
    </Grid>
  );
};

export default SettingsPage;
