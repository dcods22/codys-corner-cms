import React from "react";
import { inject, observer } from "mobx-react";
import StickyFooterButtons from "../../common/form/StickyFooterButtons";
import PrimaryButton from "../../common/buttons/PrimaryButton";

class ArticleFooter extends React.Component {
  render() {
    const { articleAdminStore } = this.props.rootStore;
    return (
      <StickyFooterButtons>
        <PrimaryButton className="float-right" onClick={articleAdminStore.addNewArticle}>
          Add Article
        </PrimaryButton>
      </StickyFooterButtons>
    );
  }
}

export default inject("rootStore")(observer(ArticleFooter));
