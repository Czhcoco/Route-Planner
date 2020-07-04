import React, { Component } from "react";
import Input from "./Input";
import Output from "./Output";
import MaterialUIPickers from "./DatePicker";
import data from "../City_Country.json";
import Selector from "./Selector";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";

class MainBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: {
        departure: "",
        arrival: "",
        date: "",
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
      output: [],
    });
  };

  changeArrival = (value) => {
    let input = { ...this.state.input };
    input.arrival = value;
    this.setState({
      input,
      error: false,
      output: [],
    });
  };

  handleDayChange(date) {
    if (date) {
      console.log(date["_d"].toJSON().slice(0, 10));

      let input = { ...this.state.input };
      input.date = date["_d"].toJSON().slice(0, 10);
      this.setState({
        input,
        error: false,
        output: [],
      });
    }
  }

  changeTrans = (value) => {
    let input = { ...this.state.input };
    input.trans = "飞机";
    this.setState({
      input,
      error: false,
      output: [],
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
    const { departure, arrival, date } = this.state.input;
    if (departure && arrival && date) {
      console.log("fetchOutput");
      fetch("/query/" + departure + "/" + arrival + "/" + date)
        // .then((res) => res.text())
        // .then((text) => console.log(text));
        .then((response) => {
          if (!response.ok) {
            throw new Error(response.statusText);
          }
          return response.json();
        })
        .then((output) => this.setState({ output: output["result:"] }))
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
          <Alert variant="filled" severity="info" className="m-2">
            抱歉！没有找到匹配路线，请更改选项后重新搜索！
          </Alert>
        </div>
      );
    }
  }

  handleOutput() {
    if (this.state.output.length > 0) {
      return (
        <Output output={this.state.output} trans={this.state.input.trans} />
      );
    } else {
      return (
        <div>
          <p>注意事项</p>
        </div>
      );
    }
  }

  render() {
    const cities = data;
    const trans = ["飞机", "火车", "轮船"];
    const buttonStyles = {
      height: 55,
      width: "100%",
      fontSize: "18px",
    };
    return (
      <div
        className="card vertical-center-row align-items-center justify-content-center"
        style={{
          border: "none",
          borderRadius: "10pt",
          backgroundColor: "rgb(255, 255, 255, 0.88)",
          width: "80%",
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <br />
        <div
          className="row align-items-center justify-content-center"
          style={{
            border: "none",
            borderRadius: "10pt",
            width: "98%",
            position: "relative",
          }}
        >
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
            <Selector
              hint="交通工具"
              items={trans}
              onChange={this.changeTrans}
            />
          </div>

          <div className="col-sm">
            <MaterialUIPickers onChange={this.handleDayChange} />
          </div>

          <div className="col-12 col-sm-2 align-items-center justify-content-center">
            <Button
              onClick={this.fetchOutput}
              variant="outlined"
              color="primary"
              size={"large"}
              style={buttonStyles}
            >
              搜 索
            </Button>
          </div>
        </div>
        <br />
        <br />
        {this.handleFetchError()}
        {this.handleOutput()}
        <br />
      </div>
    );
  }
}

export default MainBlock;
