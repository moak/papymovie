import React, { useEffect } from 'react';
import { signOut, useSession as useSessionNextAuth } from 'next-auth/client';

// import fetch from 'isomorphic-unfetch';

// Use a global to save the user, so we don't have to fetch it again after page navigations
let sessionState;

const Session = React.createContext({ session: null, loading: false });

export const fetchSession = async () => {
  if (sessionState !== undefined) {
    return sessionState;
  }

  // const res = await fetch('/api/me');
  // sessionState = res.ok ? await res.json() : null;
  return 1;
};

export const SessionProvider = ({ value, children }) => {
  const { session } = value;

  // If the user was fetched in SSR add it to sessionState so we don't fetch it again
  useEffect(() => {
    if (!sessionState && session) {
      sessionState = session;
    }
  }, []);

  return <Session.Provider value={value}>{children}</Session.Provider>;
};

export const useSession = () => React.useContext(Session);

export const useGetSession = () => {
  const [sessionData, setSessionData] = React.useState({
    session: sessionState || null,
    loading: sessionState === undefined,
  });

  const [session, loading] = useSessionNextAuth();

  useEffect(() => {
    if (sessionState !== undefined) {
      return;
    }

    let isMounted = true;

    // fetchSession().then((session) => {
    // Only set the user if the component is still mounted
    if (isMounted) {
      setSessionData({ session, loading });
    }
    // });

    return () => {
      isMounted = false;
    };
  }, [sessionState, loading]);

  return sessionData;
};
