import React, { Component } from "react";

class Selector extends Component {
  state = {};
  render() {
    return (
      <div class="input-group mb-3 col-md-3">
        <label for="state">交通工具</label>
        <select class="custom-select" id="inputGroupSelect01">
          <option selected>选择...</option>
          <option value="1">飞机</option>
          <option disabled value="2">
            火车
          </option>
          <option disabled value="3">
            轮船
          </option>
        </select>
      </div>
    );
  }
}

export default Selector;
