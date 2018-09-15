import React, { Component } from "react";
import { Route } from "react-router";
import { Router, Switch } from "react-router-dom";
import { Provider } from "mobx-react";
import RootStore from "./stores/RootStore";
import HomeContainer from "./containers/HomeContainer";
import LoginContainer from "./containers/LoginContainer";
import { ThemeProvider } from "styled-components";
import { ThemeConstants } from "./constants/ThemeConstants";
import Navbar from "./components/navigation/Navbar";
import ArticlesContainer from "./containers/ArticlesContainer";

const rootStore = new RootStore();

class App extends Component {
  render() {
    return (
      <Provider rootStore={rootStore}>
        <Router history={rootStore.history}>
          <ThemeProvider theme={ThemeConstants}>
            <div className="cms-body">
              <Navbar />
              <div className="container-fluid">
                <Switch>
                  <Route exact path="/login" component={LoginContainer} />
                  <Route exact path="/articles" component={ArticlesContainer} />
                  <Route exact path="" component={HomeContainer} />
                </Switch>
              </div>
            </div>
          </ThemeProvider>
        </Router>
      </Provider>
    );
  }
}

export default App;
