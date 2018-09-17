import React, { Component } from "react";
import styled from "styled-components";
import { Route } from "react-router";
import { Router, Switch } from "react-router-dom";
import { Provider } from "mobx-react";
import { ThemeProvider } from "styled-components";
import { ThemeConstants } from "./constants/ThemeConstants";
import RootStore from "./stores/RootStore";
import HomeContainer from "./containers/HomeContainer";
import LoginContainer from "./containers/LoginContainer";
import Navbar from "./components/navigation/Navbar";
import ArticlesContainer from "./containers/ArticlesContainer";
import ArticleEditContainer from "./containers/ArticleEditContainer";

const rootStore = new RootStore();

const Body = styled.div.attrs({
  className: "cms-body"
})`
  background-color: ${props => props.theme.colors["light-grey"]};
  height: 100vh;
  width: 100vw;
`;

class App extends Component {
  render() {
    return (
      <Provider rootStore={rootStore}>
        <Router history={rootStore.history}>
          <ThemeProvider theme={ThemeConstants}>
            <Body>
              <Navbar />
              <div className="container-fluid">
                <Switch>
                  <Route exact path="/login" component={LoginContainer} />
                  <Route exact path="/articles" component={ArticlesContainer} />
                  <Route exact path="/articles/edit" component={ArticleEditContainer} />
                  <Route exact path="" component={HomeContainer} />
                </Switch>
              </div>
            </Body>
          </ThemeProvider>
        </Router>
      </Provider>
    );
  }
}

export default App;
