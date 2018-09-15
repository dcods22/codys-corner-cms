import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import DatePickerInput from "./DatePickerInput";

const Holder = styled.div.attrs({})`
  &&& {
    .input-group {
      position: static;
      ul {
        padding: 0;

        li {
          font-size: 0.625rem;
        }
      }
    }
  }
`;

export class DateTimePickerInput extends React.Component {
  constructor(props) {
    super(props);
    this.iconClicked = this.iconClicked.bind(this);
  }

  iconClicked(event) {
    event.preventDefault();
    this.datepicker.focus();
  }

  render() {
    const { value, onChange, className, disabled } = this.props;
    return (
      <Holder>
        <DatePickerInput
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={className}
          showTimeSelect={true}
        />
      </Holder>
    );
  }
}

DateTimePickerInput.propTypes = {
  className: PropTypes.string,
  value: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired
};

DateTimePickerInput.defaultProps = {
  className: "",
  disabled: false
};

export default DateTimePickerInput;
