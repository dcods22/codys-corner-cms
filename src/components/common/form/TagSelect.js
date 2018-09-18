import React from "react";
import { WithContext as ReactTags } from "react-tag-input";

class TagSelect extends React.Component {
  render() {
    const { tags, suggestions, removeSelectedTag, addSelectedTag } = this.props;
    return (
      <ReactTags
        placeholder="Tags..."
        tags={tags}
        suggestions={suggestions}
        handleDelete={removeSelectedTag}
        handleAddition={addSelectedTag}
        classNames={{
          tag: "btn btn-outline-secondary btn-sm mr-2",
          tagInputField: "form-control mt-2",
          selected: "label-control"
        }}
        {...this.props}
      />
    );
  }
}

export default TagSelect;
