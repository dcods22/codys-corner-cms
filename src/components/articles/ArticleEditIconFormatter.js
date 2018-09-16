import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Edit = styled.i.attrs({
  className: "far fa-edit"
})``;

class ArticleEditIconFormatter extends React.Component {
  render() {
    let to = "/articles/edit?id=" + this.props.value;
    return (
      <Link to={to}>
        <Edit />
      </Link>
    );
  }
}

export default ArticleEditIconFormatter;
