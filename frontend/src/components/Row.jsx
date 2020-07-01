import React, { Component } from "react";
import Input from "./Input";
import Transportation from "./Transportation";
import SearchButton from "./SearchButton";

class Row extends Component {
  state = {};
  render() {
    return (
      <div class="row">
        <Input />
        <Transportation />
        <SearchButton />
      </div>
    );
  }
}

export default Row;
