import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import SongItem from "../Song";
import "./style.css";
import { Spin } from "antd";
import { LoadingState } from "../../utils";
const SongField = () => {
  const { songs, album, song, loadingState } = useSelector(s => s);
  const [filteredSongs, setFilteredSongs] = useState(songs);

  const filterByAlbum = items => {
    if (!album) return items;
    return items.filter(item => item.collectionName === album);
  };
  const filterBySong = items => {
    if (!song) return items;
    return items.filter(item =>
      item.trackName.toLowerCase().includes(song.toLowerCase())
    );
  };
  const filterMap = (items, filterArray) => {
    const fItems = filterArray.reduce((res, f) => {
      return f(res);
    }, items);
    return fItems;
  };
  useEffect(() => {
    const fSongs = filterMap(songs, [filterByAlbum, filterBySong]);
    setFilteredSongs(fSongs);
  }, [song, album, songs]);

  return (
    <div className="field-wrapper">
      {loadingState === LoadingState.REQUEST ? (
        <Spin size="large" />
      ) : (
        <div className="song-field">
          {filteredSongs.length || !loadingState
            ? filteredSongs.map((song, index) => (
                <SongItem key={index} song={song} />
              ))
            : "We haven't found songs :("}
        </div>
      )}
    </div>
  );
};

export default SongField;
