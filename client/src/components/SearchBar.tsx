import * as React from "react";
import { useState, useEffect } from "react";
import "../styles/SearchBar.css";
import Card from "./Card.tsx";

// Define the member structure
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

interface SearchBarProps {
  members: Member[];
  setMembers: React.Dispatch<React.SetStateAction<Member[]>>;
}

const SearchBar: React.FC<SearchBarProps> = ({ members, setMembers }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const searchMembers = async () => {
    var fullURL = "";
    if (searchQuery === "") {
      fullURL = "http://localhost:8000/api/users/getAllMembers/";
    } else {
      const apiURL = "http://localhost:8000/api/users/getMemberByName/";
      fullURL = `${apiURL}${searchQuery.toLowerCase()}`;
    }
    fetch(fullURL)
      .then((res) => res.json())
      .then((data) => setMembers(data))
      .catch((e) => console.log("error fetching", e));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    searchMembers();
  };
  // TODO: Implement the search button to the right fo the search bar.
  return (
    <div>
      <div className="searchBar">
        <form id="form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            id="searchInput"
            placeholder="Enter a Name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          ></input>
        </form>
        {/* <div className="cards">{members.map(createCard)}</div> */}
      </div>
    </div>
  );
};

export default SearchBar;
