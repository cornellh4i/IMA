import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar.tsx";
import SearchBar from "../components/SearchBar.tsx";
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
      image={(member.imgURL || member.profilePicture) ?? ""}
    />
  );
}

const App: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setLoading(true);
        setError(null);
        const supabaseMembers = await supabaseHelpers.getMembers();
        const transformedMembers = supabaseMembers.map((row: any) =>
          transformSupabaseMember(row)
        );
        setMembers(transformedMembers);
      } catch (err) {
        console.error("Failed to fetch members:", err);
        setError(
          err instanceof Error ? err.message : "Failed to fetch members"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  if (loading) {
    return (
      <div className="container">
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <h2>Loading members...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <h2>Error loading members</h2>
          <p style={{ color: "red" }}>{error}</p>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container">
        <div className="top">
          <Sidebar members={members} setMembers={setMembers} />
          <div className="middle">
            <h1 className="members-title">Members</h1>
            <SearchBar members={members} setMembers={setMembers} />
            <p className="members-count">
              Showing {members.length} of 20 members
            </p>
            {/* Render cards if members exist */}
            <div className="cards">{members.map(createCard)}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
