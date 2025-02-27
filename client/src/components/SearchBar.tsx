import * as React from "react";
import { useState, useEffect } from "react";
import "../styles/SearchBar.css";
import Card from "./Card.tsx";

// Define the member structure
interface Member {
  m_id: number;
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

const SearchBar: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);

  function createCard(member: Member) {
    return (
      <Card
        name={member.name}
        year={member.year}
        role={member.role}
        linkedin={member.linkedin}
        slack={member.slack}
        email={member.email}
        image={member.imgURL}
        key={member.m_id}
      />
    );
  }

  useEffect(() => {
    const fetchData = async () => {
      const apiURL = "http://localhost:8000/getMember/";
      fetch(apiURL)
        .then((res) => res.json())
        .then((data) => setMembers(data))
        .catch((e) => console.log("error fetching", e));
    };
    fetchData();
  }, []);

  const SearchedMember = (searchQuery: string) => {
    var fullURL = "";
    if (searchQuery === "") {
      fullURL = "http://localhost:8000/getMember/";
    } else {
      const apiURL = "http://localhost:8000/getMemberByName/";
      fullURL = `${apiURL}${searchQuery.toLowerCase()}`;
    }
    fetch(fullURL)
      .then((res) => res.json())
      .then((data) => setMembers(data))
      .catch((e) => console.log("error fetching", e));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newQuery = formData.get("name") as string;
    SearchedMember(newQuery);
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
          ></input>
        </form>
        <div className="cards">{members.map(createCard)}</div>
      </div>
    </div>
  );
};

export default SearchBar;
