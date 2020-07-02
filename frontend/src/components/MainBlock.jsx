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
        departure: "多伦多",
        arrival: "北京",
        date: "2020-10-25",
        trans: "flight"
      },
      output: [
        {
          "risk": 0,
          "stops": [
            "多伦多",
            "北京"
          ]
        },
        {
          "risk": 159,
          "stops": [
            "多伦多",
            "纽约",
            "北京"
          ]
        },
        {
          "risk": 0,
          "stops": [
            "多伦多",
            "华盛顿",
            "北京"
          ]
        },
        {
          "risk": 0,
          "stops": [
            "多伦多",
            "底特律",
            "北京"
          ]
        },
        {
          "risk": 0,
          "stops": [
            "多伦多",
            "芝加哥",
            "北京"
          ]
        },
        {
          "risk": 0,
          "stops": [
            "多伦多",
            "漢城",
            "北京"
          ]
        },
        {
          "risk": 34,
          "stops": [
            "多伦多",
            "温哥华",
            "北京"
          ]
        },
        {
          "risk": 48,
          "stops": [
            "多伦多",
            "东京",
            "北京"
          ]
        }
      ]
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
        <div className="row align-self-center justify-content-center">
          <Input hint="Departure" onChange={this.changeDeparture} />
          <Input hint="Arrival" onChange={this.changeArrival} />
          <Date onChange={this.changeDate} />
          <Transportation onChange={this.changeTrans} />
          <button onClick={this.handleClick}>Search</button>
        </div>
        <Output output={this.state.output} date={this.state.input.date} trans={this.state.input.trans} />
      </div>
    );
  }
}

export default MainBlock;
