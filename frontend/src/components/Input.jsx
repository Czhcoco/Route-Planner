import React, { Component } from "react";

class Input extends Component {
  state = {};
  render() {
    return (
      <span className="m-2">
        <p>{this.props.hint}</p>
      </span>
    );
  }
}

export default Input;
