import React from "react";
import ComptixSelect from "./ComptixSelect";

class YearPickerSelect extends React.Component {
  static defaultProps = {
    className: ""
  };

  constructor(props) {
    super(props);
    this.calculateYears = this.calculateYears.bind(this);
  }

  calculateYears() {
    let years = [];
    let start = this.props.startYear || 1900;
    let end = this.props.endYear || new Date().getFullYear();
    for (let i = start; i <= end; i++) {
      years.push({ value: i, label: i });
    }
    return years;
  }

  findDropdownValue(years, value) {
    return years.find(y => y.value === value);
  }

  render() {
    let years = this.calculateYears();
    let value = this.findDropdownValue(years, this.props.value);
    return (
      <ComptixSelect
        name="year-picker"
        value={value}
        onChange={this.props.onChange}
        options={years}
        disabled={this.props.isDisabled}
        className={this.props.className}
        clearable={false}
        backspaceRemoves={false}
        deleteRemoves={false}
      />
    );
  }
}

export default YearPickerSelect;
