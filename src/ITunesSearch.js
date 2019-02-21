import React, { Component } from 'react';
import SearchSinger from './components/searchSinger';
import SongsField from './components/songsField';
import SelectAlbum from "./components/selectAlbum";
import SearchSong from "./components/searchSong";
import './App.css';
const status = (response) => {
  if (response.status !== 200) {
    if (response.status === 404) return Promise.resolve('We haven\'t found this singer in iTunes')
    if (response.status === 400) return Promise.resolve('Incorrect request')
    return Promise.reject(new Error(response.statusText))
  }
  return Promise.resolve(response);
};
const json = (data) => {
  if (typeof data === 'string') return data;
  return data.json();
}

class ITunesSearch extends Component {
  state = {
    dataFromApi: '',
    filteredByArtistName: "",
    currentAlbum: '',
    currentSong: '',
    audioSrc: '',
    indexOfSong: ''
  }
  singerITunesApi = (singer) => {
    let singerForSearch = singer.split(' ').join('+');
    return new Promise((resolve, reject) => {
      try {
        fetch(`https://cors-anywhere.herokuapp.com/https://itunes.apple.com/search?term=${singerForSearch}&limit=500`, {
        })
          .then(status)
          .then(json)
          .then(data => {
            resolve(data)
          })
      }
      catch (error) {
        reject(new Error(error))
      }
    })
  }
  getSingerFromITunes = async (singer) => {
    const singerData = await this.singerITunesApi(singer);
    this.setState({ dataFromApi: singerData, singer })
    this.findArtistName()
    this.createOptions();
  }
  findArtistName = () => {
    let filteredByArtistName = this.state.dataFromApi.results;
    filteredByArtistName = filteredByArtistName.filter(result => {
      if (result.artistName.toLowerCase() === this.state.singer.toLowerCase()) {
        return result;
      }
    })
    this.setState({ filteredByArtistName })
  }
  createAlbums = () => {
    let albumsName = [];
    this.state.filteredByArtistName.map(item => {
      albumsName.push(item.collectionName)
    })
    this.setState({ albums: this.uniqueAlbums(albumsName) })
  }
  uniqueAlbums = (albums) => {
    let obj = {};
    for (let i = 0; i < albums.length; i++) {
      let album = albums[i];
      obj[album] = true;
    }
    return Object.keys(obj);
  }
  createOptions = () => {
    this.createAlbums();
    let options = [];
    this.state.albums.map((album, index) => {
      if (index == 0) options.push({ value: "", label: "All albums" })
      options.push({ value: album, label: album })
    })
    this.setState({ options })
  }
  setSong = (song) => {
    this.setState({ currentSong: song })
  }
  setAlbum = (album) => {
    this.setState({ currentAlbum: album })
  }
  playAudio = (audioSrc, indexOfSong) => {
    let currentIndex = indexOfSong;
    let source = audioSrc;
    if (currentIndex === this.state.indexOfSong) {
      source = "";
      currentIndex = ""
    }

    this.setState({ audioSrc: source, indexOfSong: currentIndex })
  }
  render() {
    return (
      <React.Fragment>
        <h1 style={{ textAlign: "center" }}>Search singers</h1>
        <div style={{ display: 'flex', marginTop: "50px", justifyContent: 'space-around', alignItems: 'center', marginBottom: 40 }}>
          <SearchSinger getSingerFromITunes={this.getSingerFromITunes} />
          <SelectAlbum options={this.state.options} setAlbum={this.setAlbum} />
          <SearchSong setSong={this.setSong} />
        </div>
        <SongsField
          filteredByArtistName={this.state.filteredByArtistName}
          currentAlbum={this.state.currentAlbum}
          currentSong={this.state.currentSong}
          playAudio={this.playAudio}
          audioSrc={this.state.audioSrc}
        />
        <audio src={this.state.audioSrc} autoPlay></audio>
      </React.Fragment>
    );
  }
}

export default ITunesSearch;
