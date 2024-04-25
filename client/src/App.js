import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar.js";
import AddMemberPage from "./components/AddMemberPage.js";
import SearchBar from "./components/searchBar.js";
import Card from "./components/Card";
import Header from "./components/header.js";
import "./App.css";

const API_URL = process.env.REACT_APP_API;

function App() {
  const [members, setMembers] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:8000/getMember`)
      .then((response) => response.json())
      .then((data) => setMembers(data))
      .catch((error) => console.error("Error fetching members:", error));
  }, []);

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
    <>
      <div className="container">
        <Header />
        <div className="top">
          <Sidebar />
          <div className="middle">
            <SearchBar />
            <div className="cards">{members.map(createCard)}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;