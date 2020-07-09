import React, { Component } from "react";
import { withWindowSizeListener } from "react-window-size-listener";
import { withResizeDetector } from "react-resize-detector";
import Output from "./Output";
import MaterialUIPickers from "./DatePicker";
import data from "../City_Country.json";
import Selector from "./Selector";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";
import ComboBox from "./ComboBox";
import GitHubIcon from "@material-ui/icons/GitHub";

class MainBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statement: true,
      incomplete: false,
      cardheight: 0,
      top: "50%",
      input: {
        departure: "",
        arrival: "",
        date: "2020-10-05",
        trans: "",
      },
      output: [],
    };
    this.fetchOutput = this.fetchOutput.bind(this);
    this.handleDayChange = this.handleDayChange.bind(this);
  }

  setCardPosition() {
    const height = this.props.windowSize.windowHeight;

    const cardHeight = this.props.height;

    const percent = String(parseFloat(cardHeight / height) * 50 + 1) + "%";

    if (cardHeight >= height && this.state.top !== percent) {
      this.setState({
        top: percent,
      });
    } else if (cardHeight < height && this.state.top !== "50%") {
      this.setState({
        top: "50%",
      });
    }
  }

  changeDeparture = (values) => {
    let departure = "";
    if (values) departure = values.city;
    let input = { ...this.state.input };
    input.departure = departure;
    this.setState({
      input,
      error: false,
      output: [],
    });
  };

  changeArrival = (values) => {
    let arrival = "";
    if (values) arrival = values.city;
    let input = { ...this.state.input };
    input.arrival = arrival;
    this.setState({
      input,
      error: false,
      output: [],
    });
  };

  handleDayChange(date) {
    if (date) {
      if (date["_d"].toJSON()) {
        let input = { ...this.state.input };
        input.date = date["_d"].toJSON().slice(0, 10);
        this.setState({
          input,
          error: false,
          output: [],
        });
      }
    } else {
      this.setState({ incomplete: true });
    }
  }

  changeTrans = (values) => {
    let trans = "";
    let input = { ...this.state.input };
    if (values) trans = values;
    input.trans = trans;
    this.setState({
      input,
      error: false,
      output: [],
    });
  };

  componentDidMount() {
    this.setState({
      cardheight: this.props.height,
    });
    this.setCardPosition();
  }

  componentDidUpdate(prevProps, prevState) {
    const height = this.props.height;
    if (this.state.cardheight !== height) {
      this.setState({
        cardheight: height,
      });
    }
    if (this.state.cardheight !== prevState.cardheight) {
      this.setCardPosition();
    }
  }

  fetchOutput() {
    const { departure, arrival, date, trans } = this.state.input;
    if (departure && arrival && date && trans) {
      this.setState({ incomplete: false });
      fetch("/query/" + departure + "/" + arrival + "/" + date)
        .then((response) => {
          if (!response.ok) {
            throw new Error(response.statusText);
          }
          return response.json();
        })
        .then((output) => this.setState({ output: output["result:"] }))
        .catch((err) => {
          this.setState({ error: true });
        });
    } else {
      this.setState({ incomplete: true });
    }
  }

  handleIncomplete() {
    if (this.state.incomplete) {
      return (
        <div>
          <Alert variant="filled" severity="info" className="m-2">
            请完善选项！
          </Alert>
        </div>
      );
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
      return <Output output={this.state.output} />;
    } else {
      return (
        <div
          className="p-3 card row"
          style={{
            border: "none",
            borderRadius: "5pt",
            width: "88%",
            backgroundColor: "rgb(255, 255, 255, 0.5)",
            color: "#73605C",
          }}
        >
          <button
            className="card-header bg-muted"
            style={{
              border: "none",
              borderRadius: "5pt",
              textAlign: "center",
            }}
            onClick={() => {
              this.setState({ statement: !this.state.statement });
            }}
          >
            使用说明
          </button>
          <div
            className={
              "card-body collapse" + (this.state.statement ? " show" : "")
            }
          >
            <ol>
              <li>交通工具目前只提供“飞机”选项</li>
              <li>起点和终点的选项括号内均为所属国家/地区</li>
              <li>
                本搜索工具使用的风险系数计算公式为：各路线风险系数 =
                航班风险系数*飞行时长 + 转机过程风险系数*转机时长*0.5
              </li>
              <li>疫情数据由于信息来源限制不够完善，结果仅供参考</li>
            </ol>
          </div>
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
        id="mainblock"
        className="p-3 card vertical-center-row align-items-center justify-content-center"
        style={{
          border: "none",
          borderRadius: "10pt",
          backgroundColor: "rgb(255, 255, 255, 0.8)",
          width: "88%",
          position: "absolute",
          left: "50%",
          top: this.state.top,
          transform: "translate(-50%, -50%)",
        }}
      >
        <div className="row align-self-end m-2">
          <Button
            variant="text"
            color="primary"
            href="https://github.com/Czhcoco/Route-Planner"
            startIcon={<GitHubIcon />}
          >
            Source Code
          </Button>
        </div>

        <header
          className="jumbotron jumbotron-fluid row align-items-center justify-content-center"
          style={{
            backgroundColor: "rgb(255, 255, 255, 0)",
          }}
        >
          <h1 style={{ textAlign: "center", color: "#73605C" }}>
            $afe Route Planner
          </h1>
        </header>

        <div
          className="row align-items-center justify-content-center"
          style={{
            border: "none",
            borderRadius: "10pt",
            width: "98%",
            position: "relative",
          }}
        >
          <div className="p-3 col-sm">
            <ComboBox
              hint="起点"
              items={cities}
              onChange={this.changeDeparture}
            />
          </div>
          <div className="p-3 col-sm">
            <ComboBox
              hint="终点"
              items={cities}
              onChange={this.changeArrival}
            />
          </div>
          <div className="p-3 col-sm">
            <Selector
              hint="交通工具"
              items={trans}
              onChange={this.changeTrans}
            />
          </div>

          <div className="p-3 col-sm">
            <MaterialUIPickers onChange={this.handleDayChange} />
          </div>

          <div className="p-3 col-12 col-sm-2 align-items-center justify-content-center">
            <Button
              onClick={this.fetchOutput}
              variant="contained"
              color="primary"
              size={"large"}
              style={buttonStyles}
            >
              <span style={{ textAlign: "center", color: "#F2EDEB" }}>
                搜 索
              </span>
            </Button>
          </div>
        </div>
        {this.handleIncomplete()}
        {this.handleFetchError()}
        {this.handleOutput()}

        <br />

        <footer
          className={
            "MuiTypography-root MuiTypography-caption MuiTypography-colorTextSecondary MuiTypography-alignCenter"
          }
        >
          <p style={{ textAlign: "center" }}>
            Copyright © 2020 Google Girl Hackathon Team - Fire Chicken - CAI
            Zhihan, LYU Hanfang, NIE Fei
          </p>
        </footer>
      </div>
    );
  }
}

export default withWindowSizeListener(withResizeDetector(MainBlock));
