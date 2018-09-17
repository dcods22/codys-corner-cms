import React from "react";
import { inject, observer } from "mobx-react";
import StickyFooterButtons from "../../common/form/StickyFooterButtons";
import PrimaryButton from "../../common/buttons/PrimaryButton";

class ArticleFooter extends React.Component {
  render() {
    return (
      <StickyFooterButtons>
        <PrimaryButton className="float-right">Add Article</PrimaryButton>
      </StickyFooterButtons>
    );
  }
}

export default inject("rootStore")(observer(ArticleFooter));
