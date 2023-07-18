import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {Button, Form, Grid, Header, Icon, Image, Message, Segment} from "semantic-ui-react";
import { AuthLoginCommand, LocalJwt } from "../types/AuthTypes";
import { getClaimsFromJwt } from "../utils/jwtHelper";
import {toast} from "react-toastify";
import api from "../utils/axiosInstance";
import { AppUserContext } from "../context/StateContext";

const BASE_URL = import.meta.env.VITE_API_URL;

function LoginPage() {
  const { setAppUser } = useContext(AppUserContext);

  const navigate = useNavigate();

  const [authLoginCommand, setAuthLoginCommand] = useState<AuthLoginCommand>({
    email: "",
    password: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuthLoginCommand({
      ...authLoginCommand,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await api.post(
        "/Authentication/Login",
        authLoginCommand
      );

      if (response.status === 200) {
        const accessToken = response.data.accessToken;
        const { uid, email, given_name, family_name } =
          getClaimsFromJwt(accessToken);
        const expires: string = response.data.expires;

        setAppUser({
          id: uid,
          email,
          firstName: given_name,
          lastName: family_name,
          expires,
          accessToken,
        });

        const localJwt: LocalJwt = {
          accessToken,
          expires,
        };

        localStorage.setItem("localUser", JSON.stringify(localJwt));
        navigate("/");
      } else {
        toast.error(response.statusText);
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };
  const onGoogleLoginClick = (e: React.FormEvent) => {
    e.preventDefault();

    window.location.href = `${BASE_URL}/Authentication/GoogleSignInStart`;
  };

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Image src="/crawlerweb.png" size='small' centered style={{ marginTop: '1em' }}/>
        <Header as="h2" color="teal" textAlign="center">
           Log-in to your account
        </Header>
        <Form size="large" onSubmit={handleSubmit}>
          <Segment stacked>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="E-mail address"
              onChange={handleInputChange}
              name="email"
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
              value={authLoginCommand.password}
              onChange={handleInputChange}
              name="password"
            />

            <Button color="teal" fluid size="large">
              Login
            </Button>
            <Button
              color="red"
              fluid
              onClick={onGoogleLoginClick}
              size="large"
              style={{ marginTop: "5px" }}
              type="button"
            >
              <Icon name="google" /> Sign in with Google
            </Button>
          </Segment>
        </Form>
        <Message>
          New to us? <a href="#">Sign Up</a>
        </Message>
      </Grid.Column>
    </Grid>
  );
}

export default LoginPage;
