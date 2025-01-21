import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import AddMemberPage from "./components/AddMemberPage";
import SearchBar from "./components/SearchBar";
import Card from "./components/Card";
import Header from "./components/Header";
import "./App.css";

// Type for the members object, you should define it according to the actual structure of members.
interface Member {
  id: number;
  name: string;
  // Add other fields that match the actual data structure
}

const API_URL = process.env.REACT_APP_API;

const App: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);  // Specify Member[] for members
  const [isModalOpen, setModalOpen] = useState<boolean>(false);  // Specify boolean type for modal state
  
  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  useEffect(() => {
    // If you need to fetch the members from an API, you can use this.
    // fetch(`${API_URL}/members`)
    //   .then(res => res.json())
    //   .then(data => setMembers(data))
    //   .catch(error => console.error(error));
  }, []);  // Empty dependency array for once on component mount

  return (
    <>
      <div className="container">
        <Header onAddMemberClick={handleOpenModal} />
        <div className="top">
          <Sidebar />
          <div className="middle">
            <SearchBar />
            {/* Render cards if members exist */}
            {/* <div className="cards">{members.map(createCard)}</div> */}
          </div>
        </div>
        <AddMemberPage isOpen={isModalOpen} onClose={handleCloseModal} />
      </div>
    </>
  );
}

export default App;
