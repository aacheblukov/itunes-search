import React, { Component } from "react";

class SearchSinger extends Component {
  state = {
    singer: ""
  };

  render() {
    return (
      <div>
        <input
          style={{ marginRight: 10 }}
          placeholder="Singer..."
          onChange={() => this.setState({ singer: this.singer.value })}
          ref={input => (this.singer = input)}
        />
        <button
          onClick={() => this.props.getSingerFromITunes(this.state.singer)}
        >
          Find!
        </button>
      </div>
    );
  }
}

export default SearchSinger;
