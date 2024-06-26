import * as React from "react";
import "./Header.css";
import tool_icon from "../assets/tools_icon.png";
import h4i_icon from "../assets/h4hilogo.png";
import addMemberIcon from "../assets/addMemberIcon.png";
function Header({ onAddMemberClick }) {
 function Title({ value }) {
  function handleClick() {
   console.log("clicked!");
  }
  return (
   <button className="title" onClick={handleClick}>
    {value}
   </button>
  );
 }
 return (
  <div className="header">
   <img src={h4i_icon} alt="Company Logo" className="logo" />
   <Title value="Alumni Archive" />
   <Title value="Directory" />
   <img src={tool_icon} alt="Tools icon" className="logo" />
   <img
    src={addMemberIcon}
    alt="Member Icon"
    className="logo"
    onClick={onAddMemberClick}
   />
  </div>
 );
}
export default Header;