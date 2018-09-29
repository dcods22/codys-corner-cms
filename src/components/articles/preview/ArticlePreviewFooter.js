import React from "react";
import { inject, observer } from "mobx-react";
import StickyFooterButtons from "../../common/form/StickyFooterButtons";
import LightButton from "../../common/buttons/LightButton";

class ArticlePreviewFooter extends React.Component {
  render() {
    const { articlePreviewStore } = this.props.rootStore;
    return (
      <StickyFooterButtons>
        <LightButton onClick={articlePreviewStore.cancel}>Cancel</LightButton>
      </StickyFooterButtons>
    );
  }
}

export default inject("rootStore")(observer(ArticlePreviewFooter));
