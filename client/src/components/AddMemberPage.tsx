import React, { useState, useRef } from "react";
import "../styles/addMemberPage.css";

// Define Props for AddMemberPage component
interface AddMemberPageProps {
  isOpen: boolean;
  onClose: () => void;
}

// Define Type for Inputs Reference Object
type InputsRefType = React.MutableRefObject<{
  [key: string]: HTMLInputElement | null;
}>;

// Component Definition
const AddMemberPage: React.FC<AddMemberPageProps> = ({ isOpen, onClose }) => {
  const [image, setImage] = useState<string | null>(null);
  const inputsRef: InputsRefType = useRef({});

  let imageURL =
    "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw8ODQ0NEA..."; // Base64 Placeholder

  // Handle Image Upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target) {
          setImage(event.target.result as string);
          imageURL = event.target.result as string;
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // Handle Modal Close
  const handleCancel = () => {
    onClose();
  };

  // Add New Member Function
  const addNewMember = async () => {
    if (
      !inputsRef.current.name?.value ||
      !inputsRef.current.pronouns?.value ||
      !inputsRef.current.role?.value ||
      !inputsRef.current.location?.value ||
      !inputsRef.current.year?.value ||
      !inputsRef.current.bio?.value ||
      !inputsRef.current.major?.value ||
      !inputsRef.current.email?.value
    ) {
      alert("Please fill out the required fields!");
      return;
    }

    // Creating user object for API
    const memberData = {
      name: inputsRef.current.name.value,
      pronouns: inputsRef.current.pronouns.value,
      role: inputsRef.current.role.value,
      location: inputsRef.current.location.value,
      year: inputsRef.current.year.value,
      major: inputsRef.current.major.value,
      bio: inputsRef.current.bio.value,
      imgURL: imageURL,
      email: inputsRef.current.email.value,
      linkedin:
        inputsRef.current.linkedin?.value || "https://www.linkedin.com/",
      slack: inputsRef.current.slack?.value || "https://slack.com/",
    };

    try {
      const response = await fetch("http://localhost:8000/addMember", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(memberData),
      });

      if (!response.ok) {
        throw new Error("Something went wrong with server!");
      }

      const savedMember = await response.json();
      console.log("Member added successfully: ", savedMember);
    } catch (error) {
      console.error("Failed to add member: ", error);
      alert("Unable to add member, please contact admin for details!");
    }
  };

  return (
    <div className={`modal ${isOpen ? "show" : "hide"}`}>
      <div className="addMemberContainer">
        <div className="formContainer">
          <div className="leftColumn">
            <div className="sectionLabel">Personal Information</div>
            <div className="fields">
              <input
                type="text"
                placeholder="Name"
                className="field"
                ref={(el) => (inputsRef.current.name = el)}
              />
              <input
                type="text"
                placeholder="Pronouns"
                className="field"
                ref={(el) => (inputsRef.current.pronouns = el)}
              />
              <input
                type="text"
                placeholder="Job Title & Employer"
                className="field"
                ref={(el) => (inputsRef.current.role = el)}
              />
              <input
                type="text"
                placeholder="Location"
                className="field"
                ref={(el) => (inputsRef.current.location = el)}
              />
              <input
                type="text"
                placeholder="Graduation Year"
                className="field"
                ref={(el) => (inputsRef.current.year = el)}
              />
              <input
                type="text"
                placeholder="Major"
                className="field"
                ref={(el) => (inputsRef.current.major = el)}
              />
              <input
                type="text"
                placeholder="Short Bio"
                className="longField"
                ref={(el) => (inputsRef.current.bio = el)}
              />
              <div className="headerBar">
                <button className="saveButton" onClick={addNewMember}>
                  Save
                </button>
                <button className="cancelButton" onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            </div>
          </div>

          <div className="rightColumn">
            <div className="sectionLabel">Upload Profile Picture</div>
            <div className="imageContainer2">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="imageUploader"
                style={{ display: "none" }}
                id="imageUpload"
              />
              <label htmlFor="imageUpload">
                <img
                  src={image || imageURL}
                  alt="Profile"
                  className="profileImage"
                />
              </label>
            </div>
            <div className="sectionLabel">Contact Information</div>
            <div className="fields">
              <input
                type="email"
                placeholder="Email address"
                className="field"
                ref={(el) => (inputsRef.current.email = el)}
              />
              <input
                type="text"
                placeholder="LinkedIn"
                className="field"
                ref={(el) => (inputsRef.current.linkedin = el)}
              />
              <input
                type="text"
                placeholder="Slack"
                className="field"
                ref={(el) => (inputsRef.current.slack = el)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMemberPage;
