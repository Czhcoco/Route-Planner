import React, { Component } from "react";
import Input from "./Input";
import Transportation from "./Transportation";
import Date from "./Date";
import Output from "./Output";

class MainBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: {
        departure: "",
        arrival: "",
        date: "",
        trans: "flight"
      },
      output: []
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    //   fetch ...
  }

  changeDeparture() {
    //   setState({ update departure in input})
  }

  changeArrival() {
    //   setState({ update arrival in input})
  }

  changeDate() {
    //   setState({ update date in input})
  }

  changeTrans() {
    //   setState({ update trans in input})
  }

  render() {
    return (
      <div>
        <div className="row">
          <Input hint="Departure" onChange={this.changeDeparture} />
          <Input hint="Arrival" onChange={this.changeArrival} />
          <Date onChange={this.changeDate} />
          <Transportation onChange={this.changeTrans} />
          <button onClick={this.handleClick}>Search</button>
        </div>
        <Output output={this.state.output} trans={this.state.input.trans} />
      </div>
    );
  }
}

export default MainBlock;
