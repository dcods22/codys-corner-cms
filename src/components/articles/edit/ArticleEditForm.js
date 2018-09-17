import React from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";
import { Editor } from "@tinymce/tinymce-react";
import Label from "../../common/Label";
import ComptixSelect from "../../common/form/CCSelect";

const ImagePreview = styled.img.attrs({
  className: "mr-3",
  alt: "Preview"
})`
  height: 12rem;
`;

const PreviewUrlHolder = styled.div`
  width: 100%;
`;

class ArticleEditForm extends React.Component {
  render() {
    const { articleEditStore } = this.props.rootStore;
    let article = articleEditStore.article;
    return (
      <div>
        <form>
          <div className="form-group">
            <Label>Title</Label>
            <input
              className="form-control"
              type="text"
              value={article.title}
              onChange={event => {
                articleEditStore.onChange("title", event.target.value);
              }}
            />
          </div>
          <div className="form-group">
            <Label>Subject</Label>
            <input
              className="form-control"
              type="text"
              value={article.subject}
              onChange={event => {
                articleEditStore.onChange("subject", event.target.value);
              }}
            />
          </div>
          <div className="form-group">
            <div className="d-flex">
              <ImagePreview src={article.articleImg} />
              <PreviewUrlHolder>
                <Label>Image</Label>
                <input
                  className="form-control"
                  type="text"
                  value={article.articleImg}
                  onChange={event => {
                    articleEditStore.onChange("articleImg", event.target.value);
                  }}
                />
              </PreviewUrlHolder>
            </div>
          </div>
          <div className="form-group">
            <Label>Article</Label>
            <Editor
              value={article.article}
              onEditorChange={content => {
                articleEditStore.onChange("article", content);
              }}
              theme="modern"
              init={{
                height: 500
              }}
              plugins="anchor code media image link table wordcount textcolor imagetools autolink textpattern help"
              toolbar="bold italic strikethrough forecolor backcolor anchor textcolor | code media image link | table wordcount "
            />
          </div>
          <div className="form-group">
            <Label>Tags</Label>
            <ComptixSelect
              isMulti={true}
              options={articleEditStore.tagOptions}
              onChange={event => {
                articleEditStore.setSelectedTags(event);
              }}
              value={articleEditStore.selectedTags}
            />
          </div>
        </form>
      </div>
    );
  }
}

export default inject("rootStore")(observer(ArticleEditForm));
