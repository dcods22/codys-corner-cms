import React from "react";
import { inject, observer } from "mobx-react";
import StickyFooterButtons from "../../common/form/StickyFooterButtons";
import PrimaryButton from "../../common/buttons/PrimaryButton";
import LightButton from "../../common/buttons/LightButton";

class ArticleEditFooter extends React.Component {
  render() {
    return (
      <StickyFooterButtons>
        <PrimaryButton>Save</PrimaryButton>
        <LightButton>Cancel</LightButton>
      </StickyFooterButtons>
    );
  }
}

export default inject("rootStore")(observer(ArticleEditFooter));
