import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { playSong } from "../../store/actions";
import { millisToMinutesAndSeconds } from "../../utils";
import "./style.css";
const SongItem = ({
  song: {
    previewUrl,
    artworkUrl100,
    trackName,
    collectionName,
    trackTimeMillis
  }
}) => {
  const { audioSrc } = useSelector(s => s);
  const dispatch = useDispatch();
  const play = () => {
    dispatch(playSong(previewUrl === audioSrc ? "" : previewUrl));
  };
  return (
    <div className="song-item" onClick={play}>
      <div
        className="cover"
        style={{
          backgroundImage: "url(" + artworkUrl100 + ")"
        }}
      />
      <div className="track-info">
        <span>{trackName}</span>
        <span>{collectionName}</span>
        <span>{millisToMinutesAndSeconds(trackTimeMillis)}</span>
      </div>
      <div
        className={` song-icon ${previewUrl === audioSrc ? "pause" : "play"}`}
      />
    </div>
  );
};

export default SongItem;
