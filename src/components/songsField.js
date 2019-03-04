import React, { Component } from "react";
import SongItem from "./songItem";
class SongsField extends Component {
  render() {
    const {
      filteredByArtistName,
      currentAlbum,
      currentSong,
      playAudio,
      audioSrc
    } = this.props;
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          flexFlow: "row wrap"
        }}
      >
        {filteredByArtistName &&
          filteredByArtistName.map((song, index) => {
            if (
              currentSong &&
              currentSong.toLowerCase() === song.trackName.toLowerCase()
            ) {
              return (
                <SongItem
                  playAudio={playAudio}
                  key={index}
                  index={index}
                  song={song}
                  audioSrc={audioSrc}
                />
              );
            } else {
              if (currentSong) return;
              if (currentAlbum === song.collectionName) {
                return (
                  <SongItem
                    playAudio={playAudio}
                    key={index}
                    index={index}
                    song={song}
                    audioSrc={audioSrc}
                  />
                );
              }
              if (!currentAlbum) {
                return (
                  <SongItem
                    playAudio={playAudio}
                    key={index}
                    index={index}
                    song={song}
                    audioSrc={audioSrc}
                  />
                );
              }
            }
          })}
      </div>
    );
  }
}

export default SongsField;
