import { supabase } from "../supabaseClient.ts";
import { useState, useEffect } from "react";
import type { Session } from "@supabase/supabase-js";

const AuthPage = () => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, []);

  if (!session) {
    return (
      <div style={{ padding: 16 }}>
        <div style={{ marginTop: 12, paddingLeft: 8 }}>
          <button
            onClick={() =>
              supabase.auth.signInWithOAuth({ provider: "google" })
            }
            style={{ marginRight: 8 }}
          >
            Sign in with Google
          </button>
          <button
            onClick={() => supabase.auth.signOut()}
            style={{ marginRight: 8 }}
          >
            Sign out
          </button>
          <button
            onClick={async () => {
              const { data } = await supabase.auth.getSession();
              console.log("Session: ", data?.session);
              const { data: userData } = await supabase.auth.getUser();
              const user = userData.user;
              console.log('User: ', user);
            }}
          >
            Check session
          </button>
        </div>
      </div>
    );
  }
  return <div>Logged in!</div>;
};

export default AuthPage;
