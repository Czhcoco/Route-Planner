import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import "bootstrap/dist/css/bootstrap.css";
import { Paper } from "@material-ui/core";
import ScrollView from "react-native-scroll-view";
import { Animated, Text, View, StyleSheet, Button } from "react-native";

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      suggestions: [],
      text: "",
    };
  }

  onTextChanged = (e) => {
    const value = e.target.value;
    let suggestions = [];
    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, "i");
      suggestions = this.props.items.filter((v) => regex.test(v.city));
    }
    this.setState({ suggestions, text: value });
    this.props.onChange(value);
  };

  suggestionSelected = (value) => {
    this.setState({
      text: value,
      suggestions: [],
    });
    this.props.onChange(value);
  };

  renderSuggestions = () => {
    const { suggestions } = this.state;
    if (suggestions.length === 0) return null;
    else
      return (
        <Paper>
          <div>
            <ScrollView>
              <List component="nav" aria-label="main mailbox folders">
                {suggestions.map((item) => (
                  <ListItem
                    onClick={() => this.suggestionSelected(item.city)}
                    key={item.city}
                    button
                  >
                    <ListItemText
                      primary={item.city}
                      secondary={"国家/地区：" + item.country}
                    />
                  </ListItem>
                ))}
              </List>
            </ScrollView>
          </div>
        </Paper>
      );
  };

  render() {
    const { hint } = this.props;
    const { text } = this.state;
    return (
      <span className="m-2">
        <TextField
          value={text}
          id="outlined-search"
          label={hint}
          type="search"
          variant="outlined"
          onChange={this.onTextChanged}
        />
        {this.renderSuggestions()}
      </span>
    );
  }
}

export default Input;
