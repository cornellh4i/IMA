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
    // TODO(dev): call supabase.from("members").select(...).ilike(...) per ticket and update setMembers.
    console.warn(
      "TODO: integrate Supabase search for members",
      searchQuery.trim()
    );
    setMembers((currentMembers) => currentMembers);
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
