import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Preview = styled.i.attrs({
  className: "fas fa-external-link-alt"
})``;

class ArticlePreviewIconFormatter extends React.Component {
  render() {
    let to = "/articles/preview?id=" + this.props.value;
    return (
      <Link to={to}>
        <Preview />
      </Link>
    );
  }
}

export default ArticlePreviewIconFormatter;
