import * as React from 'react';
import "./Header.css";
import tool_icon from "../assets/tools_icon.png"
import h4i_icon from "../assets/h4hilogo.png"

function Header() {
  function Title({ value }) {
    function handleClick() {
      console.log('clicked!');
    }
    return <button className="title" onClick = {handleClick}>{value}</button>;
  
  }
    return (
      <div className = "all">
      <div className="header">
          <Title value="Alumni Archive" />
          <Title value="Directory" />
      </div>
      <img src={h4i_icon} alt="Company Logo" className="logo" />
      </div>

  );
}

export default Header;