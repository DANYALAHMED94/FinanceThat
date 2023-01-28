import React from "react";
import DateRangePicker from "react-daterange-picker";
import "react-daterange-picker/dist/css/react-calendar.css";
import originalMoment from "moment";
import { extendMoment } from "moment-range";
const moment = extendMoment(originalMoment);

class Example extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isOpen: false,
      value: this.props.rangeDate
    };
  }

  onSelect = (value, states) => {
    var a = moment(value.start.format("YYYY-MM-DD"));
    var b = moment(value.end.format("YYYY-MM-DD"));
    this.props.setEndDate(value.end)
    this.props.setStartDate(value.start)
    this.props.setRangeDate(moment.range(value.start, value.end))
    this.props.getDay(Math.abs(a.diff(b, 'days')) + 1)
    this.setState({ value, states });
  };

  onToggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };


  render() {
    return (
      <div className={"DateRangePicker-modal"}>
        <DateRangePicker
          value={this.state.value}
          numberOfCalendars={2}
          onSelect={this.onSelect}
        // singleDateRange={true}
        />
      </div>
    );
  }
}

export default Example;
