import React from "react";
import "./addMemberPage.css";
import { useState, useRef } from "react";
function AddMemberPage() {
  const [image, setImage] = useState(null);
  const inputsRef = useRef({});

  var imageURL =
    "data:image/jpeg;base64,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";

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      console.log(e.target.files[0]);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
        imageURL = e.target.result;
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const addNewMember = async () => {
    //checking if any of the required fields is empty
    if (
      (inputsRef.current.name.value === "") |
      (inputsRef.current.pronouns.value === "") |
      (inputsRef.current.role.value === "") |
      (inputsRef.current.location.value === "") |
      (inputsRef.current.year.value === "") |
      (inputsRef.current.bio.value === "") |
      (inputsRef.current.major.value === "") |
      (inputsRef.current.email.value === "")
    ) {
      alert("Please fill out the required fields!");
    } else {
      //creating a userObject to post, linkedin and slack revert to default url if empty
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
        linkedin: inputsRef.current.linkedin.value
          ? inputsRef.current.linkedin.value
          : "https://www.linkedin.com/",
        slack: inputsRef.current.slack.value
          ? inputsRef.current.slack.value
          : "https://slack.com/",
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
        console.log("Failed to add member: ", error);
        alert("Unable to add member, please contact admin for details!");
      }
    }
  };

  return (
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
              ref={(el) => (inputsRef.current.location = el)}
              className="field"
            />
            <input
              type="text"
              placeholder="Graduation Year"
              ref={(el) => (inputsRef.current.year = el)}
              className="field"
            />
            <input
              type="text"
              placeholder="Major"
              ref={(el) => (inputsRef.current.major = el)}
              className="field"
            />
            <input
              type="text"
              placeholder="Short Bio"
              ref={(el) => (inputsRef.current.bio = el)}
              className="longField"
            />
            <div className="headerBar">
              <button className="saveButton" onClick={addNewMember}>
                Save
              </button>
              <button className="cancelButton">Cancel</button>
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
              <img src={image} alt="Profile" className="profileImage" />
            </label>
          </div>
          <div className="sectionLabel">Contact Information</div>
          <div className="fields">
            <input
              type="email"
              placeholder="Email address"
              ref={(el) => (inputsRef.current.email = el)}
              className="field"
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
              ref={(el) => (inputsRef.current.slack = el)}
              className="field"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddMemberPage;
