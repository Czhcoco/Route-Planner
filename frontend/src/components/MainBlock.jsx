import React, { Component } from "react";
import Input from "./Input";
import Output from "./Output";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import TransportationSelect from "./TransportationSelect";
import DatePicker from "./DatePicker";
import data from "../City_Country.json";
import Selector from "./Selector";

class MainBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: {
        departure: "",
        arrival: "",
        // date: "",
        trans: "飞机",
      },
      output: [],
    };
    this.fetchOutput = this.fetchOutput.bind(this);
    this.handleDayChange = this.handleDayChange.bind(this);
  }

  changeDeparture = (value) => {
    let input = { ...this.state.input };
    input.departure = value;
    this.setState({
      input,
    });
  };

  changeArrival = (value) => {
    let input = { ...this.state.input };
    input.arrival = value;
    this.setState({
      input,
    });
  };

  handleDayChange(selectedDay, modifiers, dayPickerInput) {
    const input = dayPickerInput.getInput();
    this.setState({
      selectedDay,
      isEmpty: !input.value.trim(),
      isValidDay: typeof selectedDay !== "undefined",
      isDisabled: modifiers.disabled === true,
    });
  }

  changeTrans = (value) => {
    let input = { ...this.state.input };
    input.trans = "飞机";
    this.setState({
      input,
    });
  };

  componentDidMount() {
    console.log("MainBlock Mounted");
    console.log(data);
  }

  componentDidUpdate() {
    console.log("MainBlock Updated");
  }

  fetchOutput() {
    const { input, selectedDay } = this.state;
    if (input.departure && input.arrival && selectedDay) {
      const dateString = JSON.stringify(selectedDay).slice(1, 11);
      console.log("fetchOutput");
      fetch(
        "/query/" + input.departure + "/" + input.arrival + "/" + dateString
      )
        // .then((res) => res.text())
        // .then((text) => console.log(text));
        .then((response) => {
          if (!response.ok) {
            throw new Error(response.statusText);
          }
          return response.json();
        })
        .then((output) => this.setState({ output: output }))
        .catch((err) => {
          console.log(err);
        });
    }
  }

  render() {
    const cities = data;
    const trans = ["飞机"];
    return (
      <div>
        <span className="row">
          <Input hint="出发地" items={cities} onChange={this.changeDeparture} />
          <Input hint="到达地" items={cities} onChange={this.changeArrival} />
          <Input hint="交通工具" items={trans} onChange={this.changeTrans} />
          <TransportationSelect />
          {/* <DatePicker /> */}
          <Selector />

          <DayPickerInput
            onDayChange={this.handleDayChange}
            selectedDay={this.state.selectedDay}
            placeholder="日期: YYYY-MM-DD"
            dayPickerProps={{ todayButton: "Today" }}
          />
        </span>
        <button className="btn btn-primary m-2" onClick={this.fetchOutput}>
          Search
        </button>
        <Output output={this.state.output} trans={this.state.input.trans} />
      </div>
    );
  }
}

export default MainBlock;
