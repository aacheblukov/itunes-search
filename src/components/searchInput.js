import React, { Component } from "react";

class SearchInput extends Component {
  state = {
    value: ""
  };

  render() {
    return (
      <div>
        <input
          style={{ marginRight: 10 }}
          placeholder=""
          onChange={() => this.setState({ value: this.input.value })}
          ref={input => (this.input = input)}
        />
        <button onClick={() => this.props.searchingInfo(this.state.value)}>
          Find!
        </button>
      </div>
    );
  }
}

export default SearchInput;
