import "moment";
import React from "react";
import MomentUtils from "@date-io/moment";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

const MaterialUIPickers = (props) => {
  // The first commit of Material-UI
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
    props.onChange(date);
  };

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <KeyboardDatePicker
        autoOk
        variant="dialog"
        showTodayButton={true}
        inputVariant="outlined"
        label="日期"
        format="YYYY-MM-DD"
        value={selectedDate}
        InputAdornmentProps={{ position: "start" }}
        onChange={handleDateChange}
      />
    </MuiPickersUtilsProvider>
  );
};

export default MaterialUIPickers;
/*
export default const MaterialUIPickers = (props) => {
  // The first commit of Material-UI
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
    this.props.onChange(date);
  };

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <KeyboardDatePicker
        autoOk
        variant="inline"
        inputVariant="outlined"
        label="日期"
        format="YYYY-MM-DD"
        value={selectedDate}
        InputAdornmentProps={{ position: "start" }}
        onChange={handleDateChange}
      />
    </MuiPickersUtilsProvider>
  );
};
*/
