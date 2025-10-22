import React, { useState } from "react";
import Header from "../components/Header.tsx";

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || '';
const supabaseKey = process.env.REACT_APP_SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseKey, { auth: { persistSession: true, autoRefreshToken: true } });

declare const process: any;

const Auth: React.FC = () => {
  const logSession = async () => {
    // Get session from server
    const { data : {session} } = await supabase.auth.getSession(); 
    const accessToken = session?.access_token;

    const resp = await fetch(`http://localhost:8000/api/auth/session`, {
      headers: {Authorization: `Bearer ${accessToken}`},
    });

    const data = await resp.json();
    console.log(`Data is `, data);

    // const session = await fetch(`http://localhost:8000/api/auth/session`);
    // const data = await session.json();
    // console.log(data);
  }

  return (
    <div>
        <button>
            Sign in with Google
        </button>
        <button
          onClick={logSession}
        >
            Check session
        </button>
        <button>
            Sign out
        </button>
    </div>
  );

}

export default Auth;