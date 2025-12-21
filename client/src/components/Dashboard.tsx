import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar.tsx";
import SearchBar from "./SearchBar.tsx";
import Card from "./Card.tsx";
import { Member, transformSupabaseMember } from "../types/member.ts";
import { supabaseHelpers } from "../lib/supabaseClient.ts";
import "../styles/TestPage.css";

const Dashboard: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState<number>(0);

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
        setTotalCount(transformedMembers.length);
      } catch (err) {
        console.error("Failed to fetch members:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch members");
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  function createCard(member: Member) {
    return (
      <Card
        key={member.id}
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

  return (
    <>
      <div className="container testPage">
        <div className="top">
          <Sidebar members={members} setMembers={setMembers} />
          <div className="middle">
            <h1
              style={{
                margin: "0 0 0 10px",
                color: "#002C61",
                fontFamily: "Hanken Grotesk",
                fontWeight: 700,
                fontSize: "clamp(28px, 5vw, 48px)",
                lineHeight: "1.4",
                letterSpacing: 0,
              }}
            >
              Members
            </h1>
            <SearchBar members={members} setMembers={setMembers} />
            <div style={{ marginTop: "8px", marginLeft: "10px", color: "#6b7280" }}>
              {`Showing ${members.length} of ${totalCount} members`}
            </div>
            {loading && (
              <div style={{ textAlign: "center", padding: "1rem" }}>
                Loading members...
              </div>
            )}
            {error && (
              <div style={{ color: "red", padding: "1rem" }}>{error}</div>
            )}
            {!loading && !error && <div className="cards">{members.map(createCard)}</div>}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
