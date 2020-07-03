import React, { Component } from "react";
import Input from "./Input";
import Output from "./Output";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import TransportationSelect from "./TransportationSelect";
import DatePicker from "./DatePicker";
import data from "../City_Country.json";
import Selector from "./Selector";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";
import Paper from "@material-ui/core/Paper";
import { lightBlue } from "@material-ui/core/colors";

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
      error: false,
    });
  };

  changeArrival = (value) => {
    let input = { ...this.state.input };
    input.arrival = value;
    this.setState({
      input,
      error: false,
    });
  };

  handleDayChange(selectedDay, modifiers, dayPickerInput) {
    const input = dayPickerInput.getInput();
    this.setState({
      selectedDay,
      isEmpty: !input.value.trim(),
      isValidDay: typeof selectedDay !== "undefined",
      isDisabled: modifiers.disabled === true,
      error: false,
    });
  }

  changeTrans = (value) => {
    let input = { ...this.state.input };
    input.trans = "飞机";
    this.setState({
      input,
      error: false,
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
          this.setState({ error: true });
        });
    }
  }

  handleFetchError() {
    if (this.state.error) {
      return (
        <div>
          <br />
          <br />
          <Alert variant="filled" severity="info" className="m-2">
            抱歉！没有找到匹配路线，请更改选项后重新搜索！
          </Alert>
        </div>
      );
    }
  }

  render() {
    const cities = data;
    const trans = ["飞机"];
    const buttonStyles = {
      height: 50,
      width: 100,
      fontSize: "20px",
    };
    const dayPickerStyles = {
      margin: 10,
    };
    return (
      <div>
        {/* <Paper elevation="3"> */}
        <div className="row align-items-top">
          <div className="col-sm">
            <Input
              hint="出发地"
              items={cities}
              onChange={this.changeDeparture}
            />
          </div>
          <div className="col-sm">
            <Input hint="到达地" items={cities} onChange={this.changeArrival} />
          </div>
          <div className="col-sm">
            <Input hint="交通工具" items={trans} onChange={this.changeTrans} />
          </div>
          {/* <TransportationSelect /> */}
          {/* <DatePicker /> */}
          <div className="col-sm">
            <DayPickerInput
              style={dayPickerStyles}
              onDayChange={this.handleDayChange}
              selectedDay={this.state.selectedDay}
              placeholder="日期: YYYY-MM-DD"
              dayPickerProps={{ todayButton: "Today" }}
            />
          </div>
          <div className="col-sm">
            <Button
              onClick={this.fetchOutput}
              variant="contained"
              color="primary"
              style={buttonStyles}
            >
              搜 索
            </Button>
          </div>

          {/* <Selector /> */}
        </div>

        {/* </Paper> */}

        {/* <button className="btn btn-primary m-2" onClick={this.fetchOutput}>
          Search
        </button> */}
        {this.handleFetchError()}
        <Output output={this.state.output} trans={this.state.input.trans} />
      </div>
    );
  }
}

export default MainBlock;
