import React from "react";
import { inject, observer } from "mobx-react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import PrimaryButton from "../../common/buttons/PrimaryButton";
import InfoButton from "../../common/buttons/InfoButton";
import DangerButton from "../../common/buttons/DangerButton";
import SuccessButton from "../../common/buttons/SuccessButton";
import LightButton from "../../common/buttons/LightButton";

class ArticleStatusChangingButtons extends React.Component {
  render() {
    const { articleStatusStore } = this.props.rootStore;
    return (
      <div>
        <Modal isOpen={articleStatusStore.modalOpen} toggle={articleStatusStore.toggleModalOpen}>
          <ModalHeader toggle={articleStatusStore.toggleModalOpen}>Update Article Status</ModalHeader>
          <ModalBody>
            Are you sure you want to update this article's status to: <b>{articleStatusStore.articleStatus.name}</b>
          </ModalBody>
          <ModalFooter>
            <PrimaryButton className="mr-2" onClick={articleStatusStore.update}>
              Update
            </PrimaryButton>
            <LightButton onClick={articleStatusStore.toggleModalOpen}>Cancel</LightButton>
          </ModalFooter>
        </Modal>
        <div className="d-flex" {...this.props}>
          <PrimaryButton className="mr-2" onClick={articleStatusStore.notPublished}>
            Not Published
          </PrimaryButton>
          <InfoButton className="mr-2" onClick={articleStatusStore.pendingApproval}>
            Pending Approval
          </InfoButton>
          <SuccessButton className="mr-2" onClick={articleStatusStore.published}>
            Published
          </SuccessButton>
          <DangerButton onClick={articleStatusStore.removed}>Removed</DangerButton>
        </div>
      </div>
    );
  }
}

export default inject("rootStore")(observer(ArticleStatusChangingButtons));
