import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar.tsx";
import AddMemberPage from "../components/AddMemberPage.tsx";
import SearchBar from "../components/SearchBar.tsx";
import Header from "../components/Header.tsx";
import Card from "../components/Card.tsx";
import { Member, transformSupabaseMember } from "../types/member.ts";
import { supabaseHelpers } from "../lib/supabaseClient.ts";
import "../App.css";

function createCard(member: Member) {
  return (
    <Card
      name={member.name}
      year={member.year || member.dateJoined}
      role={member.role}
      linkedin={member.linkedin ?? undefined}
      slack={member.slack ?? undefined}
      email={member.email}
      image={(member.imgURL || member.profilePicture) ?? ''}
    />
  );
}

const App: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setLoading(true);
        setError(null);
        const supabaseMembers = await supabaseHelpers.getMembers();
        const transformedMembers = supabaseMembers.map((row: any) => transformSupabaseMember(row));
        setMembers(transformedMembers);
      } catch (err) {
        console.error('Failed to fetch members:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch members');
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  if (loading) {
    return (
      <div className="container">
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <h2>Loading members...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <h2>Error loading members</h2>
          <p style={{ color: 'red' }}>{error}</p>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      </div>
    );
  }

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
