import React, { Component } from "react";
import Input from "./Input";
import Transportation from "./Transportation";
import Output from "./Output";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import Autocomplete from "react-autocomplete/dist/react-autocomplete.js";

class MainBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //   value: "",
      input: {
        departure: "",
        arrival: "",
        // date: "",
        trans: "flight",
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
  }

  componentDidUpdate() {
    console.log("MainBlock Updated");
  }

  fetchOutput() {
    const { input, selectedDay } = this.state;
    const dateString = JSON.stringify(selectedDay).slice(1, 11);
    console.log(dateString);
    if (input.departure === "多伦多" && input.arrival === "北京") {
      console.log("fetchOutput");
      fetch(
        "/query/" + input.departure + "/" + input.arrival + "/" + dateString
      )
        // .then((res) => res.text())
        // .then((text) => console.log(text));
        .then((response) => response.json())
        .then((output) => this.setState({ output: output }));
    }
  }

  render() {
    return (
      <div>
        <div className="row">
          {/* <Autocomplete
            getItemValue={(item) => item.label}
            items={[{ label: "北京" }, { label: "北" }, { label: "多伦多" }]}
            renderItem={(item, isHighlighted) => (
              <div
                style={{ background: isHighlighted ? "lightgray" : "white" }}
              >
                {item.label}
              </div>
            )}
            value={this.state.value}
            onChange={(e) => this.setState({ value: e.target.value })}
            onSelect={(val) => this.setState({ value: val })}
          /> */}
          <Input hint="Departure" onChange={this.changeDeparture} />
          <Input hint="Arrival" onChange={this.changeArrival} />

          <DayPickerInput
            onDayChange={this.handleDayChange}
            selectedDay={this.state.selectedDay}
            placeholder="日期: YYYY-MM-DD"
            dayPickerProps={{ todayButton: "Today" }}
          />

          <Transportation onChange={this.changeTrans} />
          <button className="btn btn-primary m-2" onClick={this.fetchOutput}>
            Search
          </button>
        </div>
        <Output output={this.state.output} trans={this.state.input.trans} />
      </div>
    );
  }
}

export default MainBlock;
