import React, { Component } from "react";

class Transportation extends Component {
  render() {
    const { onChange } = this.props;
    return (
      <input
        type="text"
        name="Transportation"
        placeholder="Transportation"
        className="border-0 shadow-0 form-control m-2"
        onChange={(e) => onChange(e.target.value)}
      />
    );
  }
}

export default Transportation;
