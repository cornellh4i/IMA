import React, { useState, useEffect } from "react";
import Card from "./Card";
import "./SearchBar.css";

function SearchBar(){
    const [searchQuery, setSearchQuery] = useState('');
    const [members, setMembers] = useState([]);
    useEffect(() => {
        if (searchQuery.trim() !== '') {
            fetch(`http://localhost:8000/getMemberByName?name=${encodeURIComponent(searchQuery)}`)
                .then(response => response.json())
                .then(data => setMembers(data))
                .catch(error => console.error("Error fetching members:", error));
        } else {
            fetch(`http://localhost:8000/getMember`)
            .then((response) => response.json())
            .then((data) => setMembers(data))
            .catch((error) => console.error("Error fetching members:", error));
        }
    }, [searchQuery]);

    const handleInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    };


  function createCard(member) {
    return (
      <Card
        name={member.name}
        year={member.year}
        role={member.role}
        major={member.major}
        pronouns={member.pronouns}
        location={member.location}
        linkedin={member.linkedin}
        slack={member.slack}
        email={member.email}
        image={member.imgURL}
        key={member.m_id}
      />
    );
  }

    return (
        <><div className="searchBar">
            <form id="form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    id="searchInput"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={handleInputChange} />
                <button type="submit" id="submit">Search</button>
            </form>
        </div>
        <div className="cards">{members.map(createCard)}
        </div>
        </>
    )
}

export default SearchBar;