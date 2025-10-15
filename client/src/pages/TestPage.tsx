import React, { useState } from "react";
import Header from "../components/Header.tsx";
import "../styles/TestPage.css";

const TestPage: React.FC = () => {
  const dummyFunc = () => console.log("Open Modal Function");
  const [name, setName] = useState<string>("");
  const [users, setUsers] = useState<any[]>([]);
  const [response, setResponse] = useState<string>("");

  return (
    <>
      <div className="container">
        <Header onAddMemberClick={dummyFunc} />
        <div className="topTest">
          <div className="middleTest">
            <h1>Testing Page</h1>

            <p>
              {/* TODO(dev): wire Supabase testing harness here once core queries are ready. */}
              Supabase integration testing hooks will live here. For now this
              page only tracks local state so the UI can be wired up before
              backend work begins.
            </p>
            <div className="getUser">
              <input
                type="text"
                placeholder="Enter Name (sample state only)"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <button
                onClick={() => {
                  console.warn("TODO: connect Supabase lookup", name);
                  setResponse("Supabase integration pending");
                  setUsers((currentUsers) => currentUsers);
                }}
              >
                Trigger Lookup Placeholder
              </button>
              {response && <p className="response">{response}</p>}
              {users.length > 0 && (
                <div>
                  <ul className="userList">
                    {users.map((user) => (
                      <li key={user.id}>{JSON.stringify(user)}</li>
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
