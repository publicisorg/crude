// @ts-nocheck

import { supabase } from '../supabase/client';

const fetchUserData = async () => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*');

    if (error) {
      console.error(error);
      return;
    }

    console.log('Datos de usuarios:', data);
    // Hacer algo con los datos obtenidos
  } catch (error) {
    console.error(error);
  }
};