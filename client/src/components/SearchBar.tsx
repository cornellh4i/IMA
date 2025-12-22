import * as React from "react";
import { useState } from "react";
import { Search } from "lucide-react";
import { Alumni, transformSupabaseAlumni } from "../types/member.ts";
import { supabaseHelpers } from "../lib/supabaseClient.ts";
import "../styles/SearchBar.css";

interface SearchBarProps {
  alumni: Alumni[];
  setAlumni: React.Dispatch<React.SetStateAction<Alumni[]>>;
}

const SearchBar: React.FC<SearchBarProps> = ({ alumni, setAlumni }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const searchAlumni = async () => {
    if (!searchQuery.trim()) {
      // If search query is empty, fetch all alumni
      try {
        setIsSearching(true);
        const supabaseAlumni = await supabaseHelpers.getAlumni();
        const transformedAlumni = supabaseAlumni.map((row: any) => transformSupabaseAlumni(row));
        setAlumni(transformedAlumni);
      } catch (err) {
        console.error('Failed to fetch all alumni:', err);
      } finally {
        setIsSearching(false);
      }
      return;
    }

    try {
      setIsSearching(true);
      const supabaseAlumni = await supabaseHelpers.searchAlumni(searchQuery.trim());
      const transformedAlumni = supabaseAlumni.map((row: any) => transformSupabaseAlumni(row));
      setAlumni(transformedAlumni);
    } catch (err) {
      console.error('Failed to search alumni:', err);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    searchAlumni();
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
          aria-label="Search alumni"
        />
      </form>
    </div>
  );
};

export default SearchBar;
