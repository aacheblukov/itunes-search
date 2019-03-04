import React, { Component } from "react";
import Moment from "react-moment";
class SongItem extends Component {
  state = {
    play: false
  };
  render() {
    const { song, index, audioSrc } = this.props;
    return (
      <div
        className="song-item"
        onClick={() => {
          this.props.playAudio(song.previewUrl, index);
          this.setState({ play: !this.state.play });
        }}
      >
        <div
          style={{
            width: "100px",
            height: "100px",
            backgroundImage: "url(" + song.artworkUrl100 + ")"
          }}
        />
        <div style={{ display: "flex", flexFlow: "column", width: 200 }}>
          <span>{song.trackName}</span>
          <span>{song.collectionName}</span>
          <span>
            <Moment format="mm:ss">{song.trackTimeMillis}</Moment>
          </span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center"
          }}
        >
          <div className="play">
            <span>Play</span>
          </div>
        </div>
      </div>
    );
  }
}

export default SongItem;
