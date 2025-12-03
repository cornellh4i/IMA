import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient.ts";
import type { Session } from "@supabase/supabase-js";
import "../styles/ProfilePictureUpload.css";

const ProfilePictureUpload: React.FC = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Get current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user?.email) {
        fetchCurrentProfile(session.user.email);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session?.user?.email) {
        fetchCurrentProfile(session.user.email);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchCurrentProfile = async (email: string) => {
    try {
      // Query alumni by email to get current profile_url
      const response = await fetch(`http://localhost:8000/api/alumni/query?emails=${encodeURIComponent(email)}`);
      if (response.ok) {
        const alumni = await response.json();
        console.log("Fetched alumni data:", alumni);
        if (alumni && alumni.length > 0 && alumni[0].profile_url) {
          const profileUrl = alumni[0].profile_url;
          console.log("Profile URL from database:", profileUrl);
          console.log("Displaying image from Supabase storage:", profileUrl);
          setProfileImage(profileUrl);
        } else {
          console.log("No profile_url found for this alumni record");
        }
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target) {
          setProfileImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditPicture = () => {
    fileInputRef.current?.click();
  };

  const handleSave = async () => {
    if (!session?.user?.email) {
      alert("Please sign in to upload your profile picture");
      return;
    }

    if (!selectedFile) {
      alert("Please select an image to upload");
      return;
    }

    const file = selectedFile;
    setUploading(true);

    try {
      // Generate a unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${session.user.id}-${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      // Upload to Supabase storage
      const { error: uploadError } = await supabase.storage
        .from('profile_images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        throw uploadError;
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('profile_images')
        .getPublicUrl(filePath);

      const publicUrl = urlData.publicUrl;

      // Update Alumni record with the profile_url
      const response = await fetch(`http://localhost:8000/api/alumni/update-profile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: session.user.email,
          profile_url: publicUrl,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to update profile');
      }

      setProfileImage(publicUrl);
      setSelectedFile(null); // Reset selected file after successful upload
      if (fileInputRef.current) {
        fileInputRef.current.value = ''; // Clear the file input
      }
      alert("Profile picture saved successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);
      alert(`Failed to upload image: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setUploading(false);
    }
  };

  const handleSkip = () => {
    // Navigate away or close the component
    navigate('/');
  };

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };

  if (!session) {
    return (
      <div className="profile-upload-page">
        <div className="profile-upload-header">
          <span className="header-text">Log in Page</span>
          <div className="logo-container">
            <span className="logo-text">IMA</span>
          </div>
        </div>
        <div className="profile-upload-content">
          <div className="welcome-section">
            <h1 className="welcome-title">Welcome, tell us who you are</h1>
            <p className="upload-instruction" style={{ marginTop: '20px' }}>
              Please sign in to upload your profile picture.
            </p>
          </div>
          <div className="action-buttons" style={{ marginTop: '40px' }}>
            <button
              className="save-button"
              onClick={handleSignIn}
            >
              Sign in with Google
            </button>
            <button
              className="skip-button"
              onClick={() => navigate('/')}
            >
              Go to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-upload-page">
      <div className="profile-upload-header">
        <span className="header-text">Log in Page</span>
        <div className="logo-container">
          <span className="logo-text">IMA</span>
        </div>
      </div>

      <div className="profile-upload-content">
        <div className="welcome-section">
          <h1 className="welcome-title">Welcome, tell us who you are</h1>
          <div className="progress-bar-container">
            <div className="progress-bar">
              <div className="progress-fill"></div>
            </div>
          </div>
          <p className="upload-instruction">
            Upload a clear photo so people can recognize and connect with you.
          </p>
        </div>

        <div className="profile-picture-section">
          <div className="profile-picture-container">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                className="profile-picture"
                onClick={handleEditPicture}
                style={{ cursor: 'pointer' }}
              />
            ) : (
              <div 
                className="profile-picture-placeholder"
                onClick={handleEditPicture}
                style={{ cursor: 'pointer' }}
              >
                <span className="edit-picture-text">Edit Picture</span>
              </div>
            )}
          </div>
          
          <div className="action-buttons">
            <button
              className="save-button"
              onClick={handleSave}
              disabled={uploading || !selectedFile}
            >
              {uploading ? 'Saving...' : 'Save'}
            </button>
            <button
              className="skip-button"
              onClick={handleSkip}
              disabled={uploading}
            >
              Skip
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePictureUpload;

