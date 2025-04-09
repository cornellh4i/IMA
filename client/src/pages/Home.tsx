import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar.tsx";
import AddMemberPage from "../components/AddMemberPage.tsx";
import SearchBar from "../components/SearchBar.tsx";
import Header from "../components/Header.tsx";
import Card from "../components/Card.tsx";
import "../App.css";

// Type for the members object, you should define it according to the actual structure of members.
interface Member {
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
    />
  );
}

const API_URL = process.env.REACT_APP_API || `http://localhost:8000/api/users`;

const App: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]); // Specify Member[] for members
  const [isModalOpen, setModalOpen] = useState<boolean>(false); // Specify boolean type for modal state

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  useEffect(() => {
    fetch(`${API_URL}/getAllMembers`)
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
          <Sidebar members={members} setMembers={setMembers} />
          <div className="middle">
            <SearchBar members={members} setMembers={setMembers} />
            {/* Render cards if members exist */}
            <div className="cards">{members.map(createCard)}</div>
          </div>
        </div>
        <AddMemberPage isOpen={isModalOpen} onClose={handleCloseModal} />
      </div>
    </>
  );
};

export default App;
