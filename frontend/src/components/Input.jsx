import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

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
      suggestions = this.props.items.filter((v) => regex.test(v));
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
        <List component="nav" aria-label="main mailbox folders">
          {suggestions.map((item) => (
            <ListItem
              onClick={() => this.suggestionSelected(item)}
              key={item}
              button
            >
              <ListItemText primary={item} />
            </ListItem>
          ))}
        </List>
      );
  };

  render() {
    const { hint, onChange } = this.props;
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
          //   onChange={(e) => onChange(e.target.value)}
        />
        {this.renderSuggestions()}
      </span>
    );
  }
}

export default Input;
