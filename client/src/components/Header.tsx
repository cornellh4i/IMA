import * as React from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";
import h4i_icon from "../assets/h4hilogo.png";

interface HeaderProps {
  onAddMemberClick: () => void;
}

interface TitleProps {
  value: string;
}

const Header: React.FC<HeaderProps> = ({ onAddMemberClick }) => {
  const Title: React.FC<TitleProps> = ({ value }) => {
    const handleClick = () => {
      console.log("clicked!");
    };

    return (
      <button className="title" onClick={handleClick}>
        {value}
      </button>
    );
  };

  return (
    <div className="header">
      <Link to="/">
        <img src={h4i_icon} alt="Company Logo" className="logo" />
      </Link>
      <Title value="Hack4Impact Alumni Archive" />
    </div>
  );
};
export default Header;
