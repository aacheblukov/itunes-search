import React from "react";
import { useDispatch } from "react-redux";
import { getDataFromApi, setSong } from "../../store/actions";
import { Input } from "antd";
import "./style.css";
export const SingerInput = () => {
  const { Search } = Input;
  const dispatch = useDispatch();
  const find = value => {
    dispatch(getDataFromApi(value));
  };
  return (
    <Search
      className="input"
      onSearch={find}
      enterButton
      placeholder="Search by singer"
    />
  );
};

export const SongInput = () => {
  const dispatch = useDispatch();
  const change = e => {
    dispatch(setSong(e.target.value));
  };
  return (
    <Input className="input" onChange={change} placeholder="Filter by song" />
  );
};
