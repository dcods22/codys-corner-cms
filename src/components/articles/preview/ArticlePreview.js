import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import ReactHtmlParser from "react-html-parser";
import ArticleTag from "../ArticleTag";

const Container = styled.div.attrs({
  className: "d-flex justify-content-center"
})`
  width: 100%;
`;

const Holder = styled.div.attrs({
  className: "d-flex p-3"
})`
  border: 1px solid ${props => props.theme.colors["medium-grey"]};
  width: 1024px;
`;

const Image = styled.img.attrs({
  className: "img-fluid",
  alt: "Article Preview"
})`
  &&& {
    height: 350px;
  }
`;

const ArticleHolder = styled.div`
  &&& {
  }
`;

class ArticlePreview extends React.Component {
  render() {
    const { article, tags } = this.props;
    return (
      <Container>
        <Holder>
          <div style={{ width: "100%" }}>
            <div className="d-flex justify-content-center">
              <Image src={article.articleImg} />
            </div>

            <div className="mt-3">
              <h3>{article.title}</h3>
            </div>

            <div>
              <h5>{article.subject}</h5>
            </div>

            <ArticleHolder>{ReactHtmlParser(article.article)}</ArticleHolder>

            <div>
              {tags.map(t => (
                <ArticleTag tag={t} />
              ))}
            </div>
          </div>
        </Holder>
      </Container>
    );
  }
}

ArticlePreview.propTypes = {
  article: PropTypes.any.isRequired
};

export default ArticlePreview;
