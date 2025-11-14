import * as React from "react";
import { useState } from "react";
import { Search } from "lucide-react";
import { Member, transformSupabaseMember } from "../types/member.ts";
import { supabaseHelpers } from "../lib/supabaseClient.ts";
import "../styles/SearchBar.css";

interface SearchBarProps {
  members: Member[];
  setMembers: React.Dispatch<React.SetStateAction<Member[]>>;
  id: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ members, setMembers, id }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const searchMembers = async () => {
    if (!searchQuery.trim()) {
      // If search query is empty, fetch all members
      try {
        setIsSearching(true);
        const supabaseMembers = await supabaseHelpers.getSavedMembers(id);
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
      const supabaseMembers = await supabaseHelpers.getSavedMembers(id);
      const filteredMembers = supabaseMembers.filter((member: any) => member.name.toLowerCase().includes(searchQuery.trim().toLowerCase()));
      const transformedMembers = filteredMembers.map((row: any) => transformSupabaseMember(row));
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
    <div className="searchBar">
      <form id="form" onSubmit={handleSubmit}>
        <span className="searchIcon" aria-hidden>
          <Search size={18} />
        </span>
        <input
          type="text"
          name="name"
          id="searchInput"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Search members"
        />
      </form>
    </div>
  );
};

export default SearchBar;
