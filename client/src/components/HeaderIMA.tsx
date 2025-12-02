import * as React from "react";
import { Link } from "react-router-dom";
import ima_icon from "../assets/ima_h4i.png";

import "../styles/HeaderIMA.css";

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
    <div className="ima-header">
      <Link to="/">
        <img src={ima_icon} alt="IMA Logo" />
      </Link>
    </div>
  );
};
export default Header;
