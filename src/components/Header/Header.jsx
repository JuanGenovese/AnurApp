import React from "react";
import SearchFrog from "./SearchFrog/SearchFrog"
import style from "./Header.module.css"

const Header = () => {
  return (
      <div className={style.Header}>
        <SearchFrog />
      </div>
  );
};

export default Header;
