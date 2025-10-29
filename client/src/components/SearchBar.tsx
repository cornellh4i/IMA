import * as React from "react";
import { useState } from "react";
import { Member, transformSupabaseMember } from "../types/member.ts";
import { supabaseHelpers } from "../lib/supabaseClient.ts";
import "../styles/SearchBar.css";

interface SearchBarProps {
  members: Member[];
  setMembers: React.Dispatch<React.SetStateAction<Member[]>>;
}

const SearchBar: React.FC<SearchBarProps> = ({ members, setMembers }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const searchMembers = async () => {
    if (!searchQuery.trim()) {
      // If search query is empty, fetch all members
      try {
        setIsSearching(true);
        const supabaseMembers = await supabaseHelpers.getMembers();
        const transformedMembers = supabaseMembers.map((row: any) => transformSupabaseMember(row));
        setMembers(transformedMembers);
      } catch (err) {
        console.error('Failed to fetch all members:', err);
      } finally {
        setIsSearching(false);
      }
      return;
    }

    try {
      setIsSearching(true);
      const supabaseMembers = await supabaseHelpers.searchMembers(searchQuery.trim());
      const transformedMembers = supabaseMembers.map((row: any) => transformSupabaseMember(row));
      setMembers(transformedMembers);
    } catch (err) {
      console.error('Failed to search members:', err);
    } finally {
      setIsSearching(false);
    }
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
