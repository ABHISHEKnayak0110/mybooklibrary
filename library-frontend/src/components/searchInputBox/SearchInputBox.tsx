import React from "react";

import styles from "./SearchInputBox.module.scss";

interface props {
  searchIcon?: any;
  onChange: (e: any) => void;
  placeholder: string;
  inputType?: string;
  value?: string | number;
  extraClassWrapper?: string;
  extraClassImg?: string;
  extraClassInput?: string;
  maxLength?: number;
}

export default function SearchInputBox(props: props) {
  return (
    <div className={`${styles.searchAreaDivLLP} ${props.extraClassWrapper} `}>
      {/* <img
        src={props.searchIcon}
        alt="search icon"
        className={`${props.extraClassImg}`}
      /> */}
      <input
        type={props.inputType || "text"}
        className={`form-control rounded ${props.extraClassInput}`}
        placeholder={props.placeholder}
        // value={props.value}
        onChange={(e: any) => {
          // console.log("nithin typing", e.target.value);
          props.onChange(e);
        }}
        maxLength={props.maxLength}

      />
    </div>
  );
}
