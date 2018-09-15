import React from "react";
import Moment from "moment";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import styled from "styled-components";
import "react-datepicker/dist/react-datepicker.css";
import ComptixInput from "../../elements/form/ComptixInput";

const DATE_FORMAT_STR = "YYYY-MM-DD";
const DATE_FORMAT_STR_WITH_TIME = "MM/DD/YYYY hh:mm a";

const StyledInput = styled(ComptixInput).attrs({
  className: props => props.className
})`
  display: block;
  width: 100%;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #d2d2d2;
  border-top-left-radius: 0.25rem;
  border-bottom-left-radius: 0.25rem;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;

  &:disabled {
    font-style: oblique;
  }
`;

const Icon = styled.span`
  &&& {
    background-color: ${props => (props.disabled ? props.theme["light-grey"] : props.theme["white"])};
    color: ${props => (props.disabled ? props.theme["grey"] : "#4c8cee")};
    &:hover {
      cursor: pointer;
      color: ${props => props.theme["mlb-blue"]};
    }
  }
`;

export class DatePickerInput extends React.Component {
  constructor(props) {
    super(props);
    this.iconClicked = this.iconClicked.bind(this);
  }

  iconClicked(event) {
    event.preventDefault();
    this.datepicker.focus();
  }

  render() {
    const { value, onChange, className, disabled, showTimeSelect } = this.props;
    let defaultClassName = "form-control";
    defaultClassName += className;
    const startOf2011 = Moment(new Date("1/1/2011").valueOf());
    let dateFormat = showTimeSelect ? DATE_FORMAT_STR_WITH_TIME : DATE_FORMAT_STR;
    return (
      <div className="input-group mb-3">
        <DatePicker
          selected={Moment(value)}
          onChange={onChange}
          showTimeSelect={showTimeSelect}
          dateFormat={dateFormat}
          disabled={disabled}
          peekNextMonth
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          minDate={startOf2011}
          className={defaultClassName}
          customInput={<StyledInput innerRef={input => (this.datepicker = input)} value={value} />}
        />

        <div className="input-group-append" onClick={this.iconClicked}>
          <Icon className="input-group-text" disabled={disabled}>
            <i className="fa fa-calendar" />
          </Icon>
        </div>
      </div>
    );
  }
}

DatePickerInput.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  value: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired
};

DatePickerInput.defaultProps = {
  className: "",
  disabled: false,
  showTimeSelect: false
};

export default DatePickerInput;
