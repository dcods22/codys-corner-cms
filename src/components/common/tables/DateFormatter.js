import React from "react";
import Moment from "moment";

class DateFormatter extends React.Component {
  render() {
    return <div>{Moment(this.props.value).format("MM/DD/YYYY hh:mm:ss a")}</div>;
  }
}

export default DateFormatter;
