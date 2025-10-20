import React, { useState } from "react";
import Header from "../components/Header.tsx";

const Auth: React.FC = () => {
  const API_URL = process.env.REACT_APP_API || `http://localhost:8000/`;
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const logSession = async () => {
    // Get session from server
    const session = await fetch(`${API_URL}/api/auth/session`);
    const data = await session.json();
    console.log(data);
  }

  return (
    <div>
        <button
          onClick={logSession}
        >
            Sign in with Google
        </button>
        <button>
            Check session
        </button>
        <button>
            Sign out
        </button>
    </div>
  );

}

export default Auth;