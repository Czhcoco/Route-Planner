import "moment";
import React from "react";
import MomentUtils from '@date-io/moment';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

export default function MaterialUIPickers() {
  // The first commit of Material-UI
  const [selectedDate, setSelectedDate] = React.useState(
    new Date()
  );

  const handleDateChange = (date) => {
    setSelectedDate(date);
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
}
