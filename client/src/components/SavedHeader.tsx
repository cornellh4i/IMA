import * as React from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";
import h4i_icon from "../assets/h4hilogo.png";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";

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
      <button className="title saved" onClick={handleClick}>
        {value}
      </button>
    );
  };

  return (
    <div className="header">
      <ChevronLeftIcon className="chevron-left" strokeWidth={3} />
      <Title value="Saved" />
    </div>
  );
};
export default Header;
