import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar.tsx";
import AddMemberPage from "../components/AddMemberPage.tsx";
import SearchBar from "../components/SearchBar.tsx";
import SavedHeader from "../components/SavedHeader.tsx";
import Card from "../components/Card.tsx";
import { Alumni, transformSupabaseAlumni } from "../types/member.ts";
import { supabaseHelpers } from "../lib/supabaseClient.ts";
import "../App.css";
import Breadcrumbs from "../components/Breadcrumbs.tsx";
import "../styles/SavedPage.css";
import SavedSearchBar from "../components/SavedSearchBar.tsx";

const SavedPage: React.FC = () => {
  const [alumni, setAlumni] = useState<Alumni[]>([]);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserID] = useState<string>("");

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

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
        isSaved={true}
        user_id={userId}
        alumni_id={alumnus.id}
      />
    );
  }

  useEffect(() => {
    const fetchedSavedAlumni = async () => {
      try {
        setLoading(true);
        setError(null);

        const id = await supabaseHelpers.getLoggedInUser();
        const supabaseMembers = await supabaseHelpers.getSavedMembers(id);
        const transformedMembers = supabaseMembers.map((row: any) =>
          transformSupabaseAlumni(row),
        );
        setAlumni(transformedMembers);
        setUserID(id);
      } catch (err) {
        console.error("Failed to fetch members:", err);
        setError(
          err instanceof Error ? err.message : "Failed to fetch members",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchedSavedAlumni();
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
        <SavedHeader onAddMemberClick={handleOpenModal} />
        <div className="top">
          <Sidebar members={alumni} setMembers={setAlumni} />
          <div className="middle">
            <SavedSearchBar
              members={alumni}
              setMembers={setAlumni}
              id={userId}
            />
            {/* Render cards if members exist */}
            <Breadcrumbs />
            <div className="display-text">
              Showing {alumni.length} of {alumni.length} members
            </div>
            <div className="cards">{alumni.map(createCard)}</div>
          </div>
        </div>
        <AddMemberPage isOpen={isModalOpen} onClose={handleCloseModal} />
      </div>
    </>
  );
};

export default SavedPage;
