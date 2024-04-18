import * as React from "react";
import "./Sidebar.css";
import { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

//defining the categories and subcategories: hardcoded values
const categories = {
  roles: ["Developer", "PM", "Designer", "External", "Other"],
  interests: ["Research", "Startups", "Design", "Fintech", "Other"],
  gradYear: ["2023", "2022", "2021", "2020", "Other"],
  location: ["Bay Area", "NYC", "Elsewhere in the US", "Outside the US"],
};

//const checkedBoxes = []; for passing values in the future

function Sidebar() {
  //state to keep track of categories
  const [openCategories, setOpenCategories] = useState({
    roles: false,
    interests: false,
    gradYear: false,
    location: false,
  });

  //states for the checkboxes
  const [checkedState, setCheckedState] = useState({
    roles: {},
    interests: {},
    gradYear: {},
    location: {},
  });

  //function to toggle the categories
  const toggleCategories = (category, event) => {
    event.stopPropagation();

    setOpenCategories((prevOpenCategories) => ({
      ...prevOpenCategories,
      [category]: !prevOpenCategories[category],
    }));
  };

  //function to toggle checkbox states
  const toggleCheckBoxChange = (category, value, event) => {
    event.stopPropagation();
    setCheckedState((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [value]: !prev[category][value],
      },
    }));
  };

  return (
    // <div className="container">
      <div className="sidebar">
        {Object.entries(categories).map(([key, values]) => (
          <div
            key={key}
            className="component"
            onClick={(e) => toggleCategories(key, e)}
          >
            <h2>
              {key.charAt(0).toUpperCase() +
                key.slice(1).replace("Year", " Year")}
            </h2>
            <ChevronRightIcon className={openCategories[key] ? "open" : ""} />

            {openCategories[key] && (
              <FormGroup className="dropdown">
                {values.map((value, index) => (
                  <FormControlLabel
                    key={index}
                    control={
                      <Checkbox
                        checked={!!checkedState[key][value]}
                        onChange={(e) => toggleCheckBoxChange(key, value, e)}
                        name={value}
                      />
                    }
                    label={value}
                  />
                ))}
              </FormGroup>
            )}
          </div>
        ))}
      </div>
    // </div>
  );
}

export default Sidebar;
