import React from "react";
import { inject, observer } from "mobx-react";
import StickyFooterButtons from "../../common/form/StickyFooterButtons";
import PrimaryButton from "../../common/buttons/PrimaryButton";
import LightButton from "../../common/buttons/LightButton";
import InfoButton from "../../common/buttons/InfoButton";

class ArticleEditFooter extends React.Component {
  render() {
    const { articleEditStore } = this.props.rootStore;
    return (
      <StickyFooterButtons>
        <PrimaryButton onClick={articleEditStore.save}>Save</PrimaryButton>
        <InfoButton onClick={articleEditStore.preview}>Preview</InfoButton>
        <LightButton onClick={articleEditStore.cancel}>Cancel</LightButton>
      </StickyFooterButtons>
    );
  }
}

export default inject("rootStore")(observer(ArticleEditFooter));
