import React from "react";
import { inject, observer } from "mobx-react";
import { Redirect } from "react-router-dom";

export default WrappedComponent => {
  class ProtectedComponent extends React.Component {
    componentWillMount() {
      const { authStore } = this.props.rootStore;
      if (!authStore.isLoggingIn) {
        authStore.checkLocalStorage();
      }
    }

    render() {
      const {
        rootStore: { authStore }
      } = this.props;
      if (authStore.isLoggedIn) {
        return <WrappedComponent {...this.props} />;
      } else {
        return <Redirect to="/login" />;
      }
    }
  }

  return inject("rootStore")(observer(ProtectedComponent));
};
