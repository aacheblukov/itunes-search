import React from "react";
import { useSelector } from "react-redux";
import SongField from "../Field";
import SelectAlbum from "../Select";
import { SingerInput, SongInput } from "../Inputs";
import "antd/dist/antd.css";
import "./style.css";
const ITunesSearch = () => {
  const { audioSrc } = useSelector((s) => s);
  console.debug("");
  return (
    <>
      <h1 className="header">Search singers via Itunes API</h1>
      <div className="inputs-wrapper">
        <SingerInput />
        <SelectAlbum />
        <SongInput />
      </div>
      <SongField />
      <audio src={audioSrc} autoPlay />
    </>
  );
};

export default ITunesSearch;
