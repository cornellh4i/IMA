import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient.ts";
import type { Session } from "@supabase/supabase-js";

const SignInPage: React.FC = () => {
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

  console.log("EMAIL:", session?.user?.email);
  console.log("ID:", session?.user?.id);

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
  };

  const signUp = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };

  if (!session) {
    return (
      <>
        {/* <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />; */}
        <button onClick={signUp}>Sign in with Google</button>
      </>
    );
  } else {
    return (
      <div>
        <h2>Welcome, {session?.user?.email}</h2>
        <button onClick={signOut}>Sign out</button>
      </div>
    );
  }

};

export default SignInPage;
