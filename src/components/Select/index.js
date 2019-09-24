import React from "react";
import { Select } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { setAlbum } from "../../store/actions";
import "./style.css";
const SelectAlbum = () => {
  const { Option } = Select;
  const { options } = useSelector(s => s);
  const dispatch = useDispatch();
  const handleChange = value => {
    dispatch(setAlbum(value));
  };
  return (
    <Select
      className="album-select"
      onChange={handleChange}
      onSearch={handleChange}
    >
      {options.map(({ value, label }, index) => (
        <Option value={value} key={index}>
          {label}
        </Option>
      ))}
    </Select>
  );
};

export default SelectAlbum;
