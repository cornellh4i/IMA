import * as React from "react";
import { useState } from "react";
import "../styles/SearchBar.css";

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
    const apiURL = "http://localhost:8000/api/users/searchMembers/";
    const fullURL = `${apiURL}?q=${encodeURIComponent(searchQuery.trim())}`;
    
    fetch(fullURL)
      .then((res) => res.json())
      .then((data) => setMembers(data))
      .catch((e) => console.log("error fetching", e));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    searchMembers();
  };

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
