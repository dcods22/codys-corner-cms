import React from "react";
import Protected from "../components/security/Protected";
import CardContainer from "./card/CardContainer";
import CardHeader from "./card/CardHeader";
import CardBody from "./card/CardBody";
import CardFooter from "./card/CardFooter";
import ArticleBody from "../components/articles/admin/ArticleBody";
import ArticleFooter from "../components/articles/admin/ArticleFooter";

class ArticlesContainer extends React.Component {
  render() {
    return (
      <CardContainer className="mt-3">
        <CardHeader>Articles</CardHeader>
        <CardBody>
          <ArticleBody />
        </CardBody>
        <CardFooter>
          <ArticleFooter />
        </CardFooter>
      </CardContainer>
    );
  }
}

export default Protected(ArticlesContainer);
