import React, { Component } from "react";

class Input extends Component {
  render() {
    const { hint, onChange } = this.props;
    return (
      <span className="m-2">
        <input
          type="text"
          name={hint}
          placeholder={hint}
          className="border-0 shadow-0 form-control"
          onChange={(e) => onChange(e.target.value)}
        />
      </span>
    );
  }
}

export default Input;
