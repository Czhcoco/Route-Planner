import "moment";
import React from "react";
import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";

const MaterialUIPickers = (props) => {
  // The first commit of Material-UI
  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2020-10-25")
  );

  const handleDateChange = (date) => {
    setSelectedDate(date);
    props.onChange(date);
  };

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <DatePicker
        autoOk
        variant="dialog"
        inputVariant="outlined"
        color="secondary"
        label="日期"
        format="YYYY-MM-DD"
        value={selectedDate}
        onChange={handleDateChange}
        clearable={true}
        showTodayButton={true}
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
