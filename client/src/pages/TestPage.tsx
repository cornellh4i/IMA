import React, { useState } from "react";
import Header from "../components/Header.tsx";
import "../styles/TestPage.css";

const TestPage: React.FC = () => {
  const dummyFunc = () => console.log("Open Modal Function");
  const API_URL = process.env.REACT_APP_API;

  const [name, setName] = useState<string>("");
  const [users, setUsers] = useState<any[]>([]);
  const [response, setResponse] = useState<string>("");

  const addUser = async () => {
    const newUser = {
      name: "John Doe",
      pronouns: "he/him",
      role: "Developer",
      location: "NY",
      year: "2025",
      major: "CS",
      bio: "Test bio",
      imgURL: "http://example.com/image.jpg",
      email: "johndoe@example.com",
      linkedin: "http://linkedin.com/in/johndoe",
      slack: "@johndoe",
    };

    try {
      const res = await fetch(`${API_URL}/addMember`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
      const data = await res.json();
      setResponse(`User created: ${data.name}`);
    } catch (error) {
      setResponse("Error creating user");
    }
  };

  const getUsers = async () => {
    try {
      const res = await fetch(`${API_URL}/getMember`);
      const data = await res.json();
      setUsers(data);
      setResponse(`Fetched ${data.length} users`);
    } catch (error) {
      setResponse("Error fetching users");
    }
  };

  const getUserByName = async () => {
    if (!name) return;
    try {
      const res = await fetch(`${API_URL}/getMemberByName/${name}`);
      const data = await res.json();
      setUsers(data);
      setResponse(
        data.length > 0 ? `Found user: ${data[0].name}` : "No user found"
      );
    } catch (error) {
      setResponse("Error fetching user");
    }
  };

  // const deleteUsers = async () => {
  //   try {
  //     const res = await fetch(`${API_URL}/deleteAll`, { method: "DELETE" });
  //     const data = await res.json();
  //     setUsers([]);
  //     setResponse(data.message);
  //   } catch (error) {
  //     setResponse("Error deleting users");
  //   }
  // };

  return (
    <>
      <div className="container">
        <Header onAddMemberClick={dummyFunc} />
        <div className="topTest">
          <div className="middleTest">
            <h1>Testing Page</h1>

            {/* Create User Button */}
            <button onClick={addUser}>Call Create User /api/addMember </button>

            {/* Get All Users Button */}
            <button onClick={getUsers}>
              Call Get All Users /api/getAllMember
            </button>

            {/* Get User by Name Input & Button */}
            <div className="getUser">
              <button onClick={getUserByName}>
                Call Get User by Name /api/getUserByName:name
              </button>
              <input
                type="text"
                placeholder="Enter Name (Call Get User by Name)"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              {/* Response Messages */}
              {response && <p className="response">{response}</p>}

              {/* Display Users */}
              {users.length > 0 && (
                <div>
                  <ul className="userList">
                    {users.map((user) => (
                      <li key={user._id}>
                        {user.name} - {user.role} - {user.year}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Add Testing Functions Here */}
          </div>
        </div>
      </div>
    </>
  );
};

export default TestPage;
