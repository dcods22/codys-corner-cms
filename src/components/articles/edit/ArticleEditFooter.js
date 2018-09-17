import React from "react";
import { inject, observer } from "mobx-react";
import StickyFooterButtons from "../../common/form/StickyFooterButtons";
import PrimaryButton from "../../common/buttons/PrimaryButton";

class ArticleEditFooter extends React.Component {
  render() {
    return (
      <StickyFooterButtons>
        <PrimaryButton>Add Tag</PrimaryButton>
        <PrimaryButton>Save</PrimaryButton>
        <PrimaryButton>Cancel</PrimaryButton>
      </StickyFooterButtons>
    );
  }
}

export default inject("rootStore")(observer(ArticleEditFooter));
