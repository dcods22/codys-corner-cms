import React from "react";
import Protected from "../../components/security/Protected";
import CardContainer from "../card/CardContainer";
import CardHeader from "../card/CardHeader";
import CardBody from "../card/CardBody";
import CardFooter from "../card/CardFooter";
import ArticleEditBody from "../../components/articles/edit/ArticleEditBody";
import ArticleEditFooter from "../../components/articles/edit/ArticleEditFooter";
import ArticleEditHeader from "../../components/articles/edit/ArticleEditHeader";

class ArticleEditContainer extends React.Component {
  render() {
    return (
      <CardContainer>
        <CardHeader>
          <ArticleEditHeader />
        </CardHeader>
        <CardBody>
          <ArticleEditBody />
        </CardBody>
        <CardFooter>
          <ArticleEditFooter />
        </CardFooter>
      </CardContainer>
    );
  }
}

export default Protected(ArticleEditContainer);
