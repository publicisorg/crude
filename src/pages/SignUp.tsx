
import { supabase } from '../supabase/client';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export function SignUp() {

  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        navigate("/");
      }
    });
  }, [navigate]);

  return (
    <>
      TEST
    </>
  );
}

export default SignUp;
