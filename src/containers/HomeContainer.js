import React from "react";
import Protected from "../components/security/Protected";
import CardBody from "./card/CardBody";
import CardContainer from "./card/CardContainer";
import CardHeader from "./card/CardHeader";
import CardFooter from "./card/CardFooter";

class HomeContainer extends React.Component {
  render() {
    return (
      <CardContainer>
        <CardHeader>Cody's Corner CMS</CardHeader>
        <CardBody>
          <div>Dashboard of whats going on with the site. User count, article count, visits, last posted article </div>
        </CardBody>
        <CardFooter />
      </CardContainer>
    );
  }
}

export default Protected(HomeContainer);
