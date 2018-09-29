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

const Title = styled.div`
  font-weight: bold;
  font-size: 1.8rem;
`;

const Subject = styled.div`
  font-size: 1.3rem;
  font-style: italic;
  color: ${props => props.theme.colors["dark-grey"]};
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
              <Title>{article.title}</Title>
            </div>

            <div>
              <Subject>{article.subject}</Subject>
            </div>

            <div>{ReactHtmlParser(article.article)}</div>

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
