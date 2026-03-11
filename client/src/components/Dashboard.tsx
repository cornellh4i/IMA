import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar.tsx";
import SearchBar from "./SearchBar.tsx";
import Card from "./Card.tsx";
import ProfileDetailsModal from "./ProfileDetailsModal.tsx";
import { Alumni, transformSupabaseAlumni } from "../types/member.ts";
import { supabaseHelpers } from "../lib/supabaseClient.ts";
import "../styles/TestPage.css";

const Dashboard: React.FC = () => {
  const [alumni, setAlumni] = useState<Alumni[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [selectedAlumni, setSelectedAlumni] = useState<Alumni | null>(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);
  const [savedAlumni, setSavedAlumni] = useState<Alumni[]>([]);
  const [userId, setUserID] = useState<string>("");

  useEffect(() => {
    const fetchAlumni = async () => {
      try {
        setLoading(true);
        setError(null);
        const supabaseAlumni = await supabaseHelpers.getAlumni();
        const transformedAlumni = supabaseAlumni.map((row: any) =>
          transformSupabaseAlumni(row),
        );
        const id = await supabaseHelpers.getLoggedInUser();
        const savedAlum = await supabaseHelpers.getSavedMembers(id);
        setUserID(id);
        setAlumni(transformedAlumni);
        setSavedAlumni(savedAlum);
        setTotalCount(transformedAlumni.length);
      } catch (err) {
        console.error("Failed to fetch alumni:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch alumni");
      } finally {
        setLoading(false);
      }
    };

    fetchAlumni();
  }, []);

  const openProfileModal = (alumnus: Alumni) => {
    setSelectedAlumni(alumnus);
    setIsProfileModalOpen(true);
  };

  const closeProfileModal = () => {
    setIsProfileModalOpen(false);
  };

  function createCard(alumnus: Alumni) {
    return (
      <Card
        key={alumnus.id}
        name={alumnus.name}
        year={alumnus.graduationYear?.toString() || ""}
        role={alumnus.major || ""}
        linkedin={alumnus.linkedinUrl ?? undefined}
        email={alumnus.emails?.[0] || ""}
        image={alumnus.profileUrl ?? ""}
        onClick={() => openProfileModal(alumnus)}
        isSaved={savedAlumni.some((a) => a.id === alumnus.id)}
        user_id={userId}
        alumni_id={alumnus.id}
      />
    );
  }

  return (
    <>
      <div className="container testPage">
        <div className="top">
          <Sidebar alumni={alumni} setAlumni={setAlumni} />
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
                marginTop: "16px",
              }}
            >
              Members
            </h1>
            <SearchBar alumni={alumni} setAlumni={setAlumni} />
            <div
              style={{ marginTop: "8px", marginLeft: "10px", color: "#6b7280" }}
            >
              {`Showing ${alumni.length} of ${totalCount} members`}
            </div>
            {loading && (
              <div style={{ textAlign: "center", padding: "1rem" }}>
                Loading members...
              </div>
            )}
            {error && (
              <div style={{ color: "red", padding: "1rem" }}>{error}</div>
            )}
            {!loading && !error && (
              <div className="cards">{alumni.map(createCard)}</div>
            )}
          </div>
        </div>
      </div>
      <ProfileDetailsModal
        alumni={selectedAlumni}
        isOpen={isProfileModalOpen}
        onClose={closeProfileModal}
      />
    </>
  );
};

export default Dashboard;
