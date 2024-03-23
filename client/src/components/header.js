import * as React from 'react';
import "./Header.css";

function Header() {
  function Title({ value }) {
    function handleClick() {
      console.log('clicked!');
    }
    return <button className="title" onClick = {handleClick}>{value}</button>;
  
  }
    return (
      <div className="header">
          {/* <img src="h4hilogo.png" alt="Company Logo" className="logo" /> */}
          <Title value="Alumni Archive" />
          <Title value="Directory" />
          <img src="../assets/tools_icon.png" alt="Tools icon" className="logo" />
      </div>
  );
}

export default Header;