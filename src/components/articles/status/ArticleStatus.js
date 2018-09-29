import React from "react";
import styled from "styled-components";
import Label from "../../common/Label";
import { ThemeConstants } from "../../../constants/ThemeConstants";
import { ArticleStatus as ArticleStatusConstants } from "../../../constants/ArticleStatusConstants";

const StatusValue = styled.div`
  font-size: 1.1rem;
  font-weight: bold;
  color: ${props => props.color};
`;

class ArticleStatus extends React.Component {
  getColor(status) {
    switch (status) {
      case ArticleStatusConstants.NOT_PUBLISHED.name:
        return ThemeConstants.colors.red;
      case ArticleStatusConstants.PENDING_APPROVAL.name:
        return ThemeConstants.colors.purple;
      case ArticleStatusConstants.REMOVED.name:
        return ThemeConstants.colors.red;
      case ArticleStatusConstants.PUBLISHED.name:
        return ThemeConstants.colors.green;
      default:
        return ThemeConstants.colors.red;
    }
  }

  render() {
    const { status } = this.props;
    return (
      <div className="mb-2">
        <Label>Status</Label>
        <StatusValue color={this.getColor(status)}>{status}</StatusValue>
      </div>
    );
  }
}

export default ArticleStatus;
