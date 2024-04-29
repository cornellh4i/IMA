import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar.js";
import AddMemberPage from "./components/AddMemberPage.js";
import SearchBar from "./components/searchBar.js";
import SearchBar from "./components/searchBar.js";
import Card from "./components/Card";
import Header from "./components/header.js";
import "./App.css";

const API_URL = process.env.REACT_APP_API;

function App() {

  return (
    <>
      <div className="container">
        <Header />
        <div className="top">
          <Sidebar setMembers={setMembers} />
          <div className="middle">
            <SearchBar />
            <div className="cards">{members.map(createCard)}</div>
          </div>
        </div>
        <AddMemberPage />
      </div>
    </>
  );
}
export default App;