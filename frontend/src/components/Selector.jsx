import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

class Selector extends Component {
  render() {
    return (
      <Autocomplete
        id="disabled-options-demo"
        onChange={(e, values) => this.props.onChange(values)}
        options={this.props.items}
        getOptionDisabled={(option) => option !== "飞机"}
        renderInput={(params) => (
          <TextField {...params} label={this.props.hint} variant="outlined" />
        )}
      />
    );
  }
}

export default Selector;
