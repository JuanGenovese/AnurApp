import React from "react";
import "../css/blockui.css";

const BlockUI = ({blocking, handleClick}) => {
  if (!blocking) {
    return "";
  } else {
    return (
      <div className="block-ui-container" onClick={() => handleClick()}>
        <div className="block-ui-overlay" />
      </div>
    );
  }
};

BlockUI.defaultProps = {
  blocking: false
};

export default BlockUI;
