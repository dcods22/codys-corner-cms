import React from "react";
import { inject, observer } from "mobx-react";
import styled from "styled-components";
import { Redirect } from "react-router-dom";
import LoginForm from "../components/login/LoginForm";

const Container = styled.div.attrs({
  className: "d-flex justify-content-center align-items-center"
})`
  height: calc(100vh - 60px);
`;

class LoginContainer extends React.Component {
  render() {
    const {
      rootStore: { authStore },
      location
    } = this.props;
    if (location.pathname === "/login" && authStore.accessToken) {
      return <Redirect to="/" />;
    } else {
      return (
        <Container>
          <LoginForm />
        </Container>
      );
    }
  }
}

export default inject("rootStore")(observer(LoginContainer));
