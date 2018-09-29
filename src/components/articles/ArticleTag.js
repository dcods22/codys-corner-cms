import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import LightButton from "../common/buttons/LightButton";

const Tag = styled(LightButton).attrs({
  className: "mr-2"
})``;

class ArticleTag extends React.Component {
  render() {
    const { tag } = this.props;
    return <Tag>{tag.tag}</Tag>;
  }
}

ArticleTag.propTypes = {
  tag: PropTypes.any.isRequired
};

export default ArticleTag;
