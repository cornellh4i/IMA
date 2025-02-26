import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar.tsx";
import AddMemberPage from "./components/AddMemberPage.tsx";
import SearchBar from "./components/SearchBar.tsx";
import Card from "./components/Card.tsx";
import Header from "./components/Header.tsx";
import "./App.css";

// Type for the members object, you should define it according to the actual structure of members.
interface Member {
  id: number;
  name: string;
  year: string;
  role: string;
  image: string;
  email?: string;
  linkedin?: string;
  slack?: string;
}

const API_URL = process.env.REACT_APP_API;

const App: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]); // Specify Member[] for members
  const [isModalOpen, setModalOpen] = useState<boolean>(false); // Specify boolean type for modal state

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  useEffect(() => {
    fetch(`${API_URL}/getMember`)
      .then((res) => res.json())
      .then((data) => {
        setMembers(data);
      })
      .catch((error) => console.error("Error fetching members:", error));
  }, []); // Empty dependency array for once on component mount

  return (
    <>
      <div className="container">
        <Header onAddMemberClick={handleOpenModal} />
        <div className="top">
          <Sidebar setMembers={setMembers} />
          <div className="middle">
            <SearchBar />
            {/* Render cards if members exist */}
          </div>
        </div>
        <AddMemberPage isOpen={isModalOpen} onClose={handleCloseModal} />
      </div>
    </>
  );
};

export default App;
