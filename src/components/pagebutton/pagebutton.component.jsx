import React from "react";
import "./pagebutton.styles.scss";

const PageButton = ({ handleClick, value, currentpage }) => (
  <button
    className={
      parseInt(currentpage) === parseInt(value)
        ? "selected-page"
        : "unselected-page"
    }
    onClick={handleClick}
    value={currentpage}
  >
    {currentpage}
  </button>
);

export default PageButton;
