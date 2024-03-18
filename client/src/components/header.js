import * as React from 'react';
import "./Header.css";

function Title({ value }) {
  function handleClick() {
    console.log('clicked!');
  }
  return <button className="title" onClick = {handleClick}>{value}</button>;

}

function Header() {
    return (
      <div className="Header">
          <img src="h4hilogo.png" alt="Company Logo" className="logo" />
          <Title value="Alumni Archive" />
          <Title value="Directory" />
          <img src="tools_icon.png" alt="Tools icon" className="logo" />
      </div>
  );
}

export default Header;