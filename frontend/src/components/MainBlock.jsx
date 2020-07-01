import React, { Component } from "react";
import Output from "./Output";
import Input from "./Input";
import Transportation from "./Transportation";

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
        if (this.state.input) {
            // fetch...
        }
    }

    render() {
        return (
            <div>
                <div className="row justify-content-center">
                    <Input className="col-12 col-sm-4" />
                    <Transportation className="col-12 col-sm-4" />
                    <button className="btn btn-primary btn-sm m2" onClick={this.handleClick} >Search</button>
                </div>
                <Output output={this.state.output} trans={this.state.input.trans} />
            </div>
        );
    }
}

export default MainBlock;
