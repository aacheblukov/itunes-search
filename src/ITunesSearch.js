import React, { Component } from "react";
import SongsField from "./components/songsField";
import SelectAlbum from "./components/selectAlbum";
import SearchInput from "./components/searchInput";
import "./App.css";
import { singerITunesApi } from "./api/itunesAPI";

class ITunesSearch extends Component {
  state = {
    dataFromApi: "",
    filteredByArtistName: "",
    currentAlbum: "",
    currentSong: "",
    audioSrc: "",
    indexOfSong: ""
  };

  getSingerFromITunes = async singer => {
    const singerData = await singerITunesApi(singer);
    this.setState({ dataFromApi: singerData, singer });
    this.findArtistName();
    this.createOptions();
  };
  findArtistName = () => {
    let filteredByArtistName = this.state.dataFromApi.results;
    filteredByArtistName = filteredByArtistName.filter(result => {
      if (result.artistName.toLowerCase() === this.state.singer.toLowerCase()) {
        return result;
      }
    });
    this.setState({ filteredByArtistName });
  };
  createAlbums = () => {
    let albumsName = [];
    this.state.filteredByArtistName.map(item => {
      albumsName.push(item.collectionName);
    });
    this.setState({ albums: this.uniqueAlbums(albumsName) });
  };
  uniqueAlbums = albums => {
    let obj = {};
    for (let i = 0; i < albums.length; i++) {
      let album = albums[i];
      obj[album] = true;
    }
    return Object.keys(obj);
  };
  createOptions = () => {
    this.createAlbums();
    let options = [];
    this.state.albums.map((album, index) => {
      if (index == 0) options.push({ value: "", label: "All albums" });
      options.push({ value: album, label: album });
    });
    this.setState({ options });
  };
  setSong = song => {
    this.setState({ currentSong: song });
  };
  setAlbum = album => {
    this.setState({ currentAlbum: album });
  };
  playAudio = (audioSrc, indexOfSong) => {
    let currentIndex = indexOfSong;
    let source = audioSrc;
    if (currentIndex === this.state.indexOfSong) {
      source = "";
      currentIndex = "";
    }

    this.setState({ audioSrc: source, indexOfSong: currentIndex });
  };
  render() {
    return (
      <React.Fragment>
        <h1 style={{ textAlign: "center" }}>Search singers</h1>
        <div
          style={{
            display: "flex",
            marginTop: "50px",
            justifyContent: "space-around",
            alignItems: "center",
            marginBottom: 40
          }}
        >
          <SearchInput searchingInfo={this.getSingerFromITunes} />
          <SelectAlbum options={this.state.options} setAlbum={this.setAlbum} />
          <SearchInput searchingInfo={this.setSong} />
        </div>
        <SongsField
          filteredByArtistName={this.state.filteredByArtistName}
          currentAlbum={this.state.currentAlbum}
          currentSong={this.state.currentSong}
          playAudio={this.playAudio}
          audioSrc={this.state.audioSrc}
        />
        <audio src={this.state.audioSrc} autoPlay />
      </React.Fragment>
    );
  }
}

export default ITunesSearch;
