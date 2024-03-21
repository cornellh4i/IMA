import * as React from "react";
import "./Sidebar.css";

//Installed material icons package via npm
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

function sidebar() {
  return (
    <div className="container">
      <div id="sidebar">
        <div className="component">
          <h2>Roles</h2>
          <ChevronRightIcon />
        </div>
        <div className="component">
          <h2>Interests</h2>
          <ChevronRightIcon />
        </div>
        <div className="component">
          <h2>Graduation Year</h2>
          <ChevronRightIcon />
        </div>
        <div className="component">
          <h2>Location</h2>
          <ChevronRightIcon />
        </div>
      </div>
    </div>
  );
}

export default sidebar;
