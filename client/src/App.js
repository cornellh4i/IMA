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
  const [isModalOpen, setModalOpen] = useState(false);
  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);
  console.log(isModalOpen);

  return (
    <>
      <div className="container">
      <Header onAddMemberClick={handleOpenModal} />
        <div className="top">
          <Sidebar />
          <div className="middle">
            <SearchBar />
            {/* <div className="cards">{members.map(createCard)}</div> */}
          </div>
        </div>
        <AddMemberPage isOpen={isModalOpen} onClose={handleCloseModal} />
      </div>
    </>
  );
}
export default App;