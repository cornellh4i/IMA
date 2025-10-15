import * as React from "react";
import "../styles/Sidebar.css";
import { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
// import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { ChevronRight } from "lucide-react";

interface Member {
  name: string;
  year: string;
  role: string;
  major: string;
  pronouns: string;
  location: string;
  linkedin: string;
  slack: string;
  email: string;
  imgURL: string;
}

interface SidebarProps {
  members: Member[];
  setMembers: (members: any) => void;
}

type CategoryKeys = "role" | "major" | "year" | "location";

//defining the categories and subcategories: hardcoded values
const categories: Record<CategoryKeys, string[]> = {
  role: ["Developer", "Project Manager", "Designer", "External", "Other"],
  major: [
    "Computer Science",
    "Information Science",
    "Economics",
    "Electrical and Computer Engineering",
    "Other",
  ],
  year: ["2028", "2027", "2026", "2025", "2024", "Other"],
  location: ["San Fransisco", "New York City", "Chicago", "Austin", "Other"],
};
//let dummyURL = "fd";

const Sidebar: React.FC<SidebarProps> = ({ setMembers }) => {
  //state to keep track of categories
  const [openCategories, setOpenCategories] = useState<
    Record<CategoryKeys, boolean>
  >({
    role: false,
    major: false,
    year: false,
    location: false,
  });

  //states for the checkboxes
  const [checkedState, setCheckedState] = useState<
    Record<CategoryKeys, Record<string, boolean>>
  >({
    role: {},
    major: {},
    year: {},
    location: {},
  });

  //function to toggle the categories
  const toggleCategories = (
    category: CategoryKeys,
    event: React.MouseEvent
  ) => {
    // event.stopPropogation();
    event.nativeEvent.stopImmediatePropagation();

    setOpenCategories((prevOpenCategories) => ({
      ...prevOpenCategories,
      [category]: !prevOpenCategories[category],
    }));
  };

  // function to toggle checkbox states
  const toggleCheckBoxChange = (
    category: CategoryKeys,
    value: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.nativeEvent.stopImmediatePropagation();

    setCheckedState((prev) => {
      const newCheckedState = {
        ...prev,
        [category]: {
          ...prev[category],
          [value]: !prev[category][value],
        },
      };

      const query = Object.entries(newCheckedState).reduce<
        Record<string, string>
      >((acc, [category, values]) => {
        const checkedItems = Object.entries(values)
          .filter(([_, isChecked]) => isChecked)
          .map(([key]) => key);

        if (checkedItems.length) {
          acc[category] = checkedItems.join(",");
        }
        return acc;
      }, {});

      // TODO(dev): translate `query` into Supabase filters (ticket SUPA-03) and update setMembers with returned rows.
      console.warn("TODO: integrate Supabase filter with query", query);
      setMembers((currentMembers: Member[]) => currentMembers);

      return newCheckedState;
    });
  };

  return (
    // <div className="container">
    <div className="sidebar">
      {Object.entries(categories).map(([key, values]) => {
        const categoryKey = key as CategoryKeys;
        return (
          <div key={categoryKey} className="component">
            <div className="filterRow">
              <h2>
                {categoryKey.charAt(0).toUpperCase() +
                  categoryKey.slice(1).replace("Year", " Year")}
              </h2>
              <ChevronRight
                className={openCategories[categoryKey] ? "open" : ""}
                onClick={(e) => toggleCategories(categoryKey, e)}
              />
            </div>

            {openCategories[categoryKey] && (
              <FormGroup className="dropdown">
                {values.map((value, index) => (
                  <FormControlLabel
                    key={index}
                    control={
                      <Checkbox
                        checked={!!checkedState[categoryKey][value]}
                        onChange={(e) =>
                          toggleCheckBoxChange(categoryKey, value, e)
                        }
                        name={value}
                      />
                    }
                    label={value}
                  />
                ))}
              </FormGroup>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Sidebar;
