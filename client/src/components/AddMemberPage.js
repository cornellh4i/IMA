import React from "react";
import "./addMemberPage.css";
import { useState, useRef } from "react";

function AddMemberPage() {
  const [image, setImage] = useState(null);
  const inputRef = useRef(null);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      // FileReader to read the image content
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result); // set image content to state
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  return (
    <div className="addMemberContainer">
      <div className="formContainer">
        <div className="leftColumn">
          <div className="sectionLabel">Personal Information</div>
          <div className="fields">
            <input type="text" placeholder="Name" className="field" />
            <input type="text" placeholder="Pronouns" className="field" />
            <input
              type="text"
              placeholder="Job Title & Employer"
              className="field"
            />
            <input type="text" placeholder="Location" className="field" />
            <input
              type="text"
              placeholder="Graduation Year"
              className="field"
            />
            <input type="text" placeholder="Major" className="field" />
            <div className="headerBar">
              <button className="saveButton">Save</button>
              <button className="cancelButton">Cancel</button>
            </div>
          </div>
        </div>
        <div className="rightColumn">
          <div className="sectionLabel">Upload Profile Picture</div>
          <div className="imageContainer">
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
            <input type="email" placeholder="Email address" className="field" />
            <input type="text" placeholder="LinkedIn" className="field " />
            <input type="text" placeholder="Slack" className="field" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddMemberPage;
