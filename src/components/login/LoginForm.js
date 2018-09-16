import React from "react";
import { inject, observer } from "mobx-react";
import styled from "styled-components";
import Label from "../common/Label";
import PrimaryButton from "../common/buttons/PrimaryButton";

const Container = styled.div.attrs({
  className: "p-4"
})`
  border 1px solid ${props => props.theme.colors["light-grey"]};
  background-color: ${props => props.theme.colors["almost-white"]};
`;

const Title = styled.div`
  font-size: 1.3rem;
  font-weight: bold;
`;

const LoginInput = styled.input.attrs({
  className: "form-control"
})`
  width: 15rem;
`;

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "" };
    this.onUpdate = this.onUpdate.bind(this);
  }

  onUpdate(key, value) {
    let newstate = {};
    newstate[key] = value;
    this.setState(newstate);
  }

  render() {
    const { authStore } = this.props.rootStore;
    return (
      <Container>
        <Title>Cody's Corner CMS</Title>
        <div className="mt-3">
          <form
            onSubmit={event => {
              event.preventDefault();
              authStore.login(this.state.username, this.state.password);
            }}
          >
            <div className="form-group">
              <Label>Username</Label>
              <LoginInput
                type="text"
                placeholder="Username"
                value={this.state.username}
                onChange={event => this.onUpdate("username", event.target.value)}
              />
            </div>
            <div className="form-group">
              <Label>Password</Label>
              <LoginInput
                type="password"
                placeholder="Password"
                value={this.state.password}
                onChange={event => this.onUpdate("password", event.target.value)}
              />
            </div>
            <PrimaryButton type="submit" className="float-right">
              Login
            </PrimaryButton>
          </form>
        </div>
      </Container>
    );
  }
}

export default inject("rootStore")(observer(LoginForm));
