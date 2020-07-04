import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

const ComboBox = (props) => {
  return (
    <Autocomplete
      id="combo-box-demo"
      options={props.items}
      getOptionLabel={(option) => option.city + "(" + option.country + ")"}
      style={{ width: 300 }}
      renderInput={(params) => (
        <TextField {...params} label={props.hint} variant="outlined" />
      )}
      onChange={(e, values) => props.onChange(values)}
      includeInputInList={true}
    />
  );
};

export default ComboBox;
