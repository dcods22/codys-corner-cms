import React from "react";
import Protected from "../../components/security/Protected";
import CardContainer from "../card/CardContainer";
import CardHeader from "../card/CardHeader";
import CardBody from "../card/CardBody";
import CardFooter from "../card/CardFooter";
import ArticlePreviewFooter from "../../components/articles/preview/ArticlePreviewFooter";
import ArticlePreviewBody from "../../components/articles/preview/ArticlePreviewBody";
import ArticlePreviewHeader from "../../components/articles/preview/ArticlePreviewHeader";

class ArticlePreviewContainer extends React.Component {
  render() {
    return (
      <CardContainer>
        <CardHeader>
          <ArticlePreviewHeader />
        </CardHeader>
        <CardBody>
          <ArticlePreviewBody />
        </CardBody>
        <CardFooter>
          <ArticlePreviewFooter />
        </CardFooter>
      </CardContainer>
    );
  }
}

export default Protected(ArticlePreviewContainer);
