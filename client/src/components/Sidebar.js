import * as React from "react";
import "./Sidebar.css";
import { useState, useEffect } from "react";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

//defining the categories and subcategories: hardcoded values
const categories = {
  role: ["Developer", "Project Manager", "Designer", "External", "Other"],
  major: [
    "Computer Science",
    "Information Science",
    "Economics",
    "Electrical and Computer Engineering",
    "Other",
  ],
  year: ["2024", "2023", "2022", "2021", "2020", "Other"],
  location: ["San Fransisco", "New York City", "Chicago", "Austin", "Other"],
};
let dummyURL = "fd";

function Sidebar({ setMembers }) {
  //state to keep track of categories
  const [openCategories, setOpenCategories] = useState({
    role: false,
    major: false,
    year: false,
    location: false,
  });

  //states for the checkboxes
  const [checkedState, setCheckedState] = useState({
    role: {},
    major: {},
    year: {},
    location: {},
  });

  useEffect(() => {
    const query = Object.entries(checkedState).reduce(
      (acc, [category, values]) => {
        const checkedItems = Object.entries(values)
          .filter(([_, isChecked]) => isChecked)
          .map(([key]) => key);
        if (checkedItems.length) acc[category] = checkedItems.join(",");
        return acc;
      },
      [checkedState, setMembers]
    );

    const url = new URL("http://localhost:8000/getAllMembers");
    Object.keys(query).forEach((key) =>
      url.searchParams.append(key, query[key])
    );

    console.log(url);

    fetch(url)
      .then((response) => response.json())
      .then((data) => setMembers(data))
      .catch((error) => console.error("Error fetching members:", error));
  }, [checkedState, setMembers]);

  //function to toggle the categories
  const toggleCategories = (category, event) => {
    event.nativeEvent.stopImmediatePropagation();

    setOpenCategories((prevOpenCategories) => ({
      ...prevOpenCategories,
      [category]: !prevOpenCategories[category],
    }));
  };

  //function to toggle checkbox states
  const toggleCheckBoxChange = (category, value, event) => {
    event.nativeEvent.stopImmediatePropagation();
    setCheckedState((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [value]: !prev[category][value],
      },
    }));
  };
  console.log(dummyURL);
  return (
    <div className="container">
      <div id="sidebar">
        {Object.entries(categories).map(([key, values]) => (
          <div key={key} className="component">
            <h2>
              {key.charAt(0).toUpperCase() +
                key.slice(1).replace("Year", " Year")}
            </h2>
            <ChevronRightIcon
              className={openCategories[key] ? "open" : ""}
              onClick={(e) => toggleCategories(key, e)}
            />

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
    </div>
  );
}
export default Sidebar;
