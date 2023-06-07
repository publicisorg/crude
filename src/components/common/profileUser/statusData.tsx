import React, { useEffect, useState } from 'react';
import { supabase } from '../../../supabase/client';

async function getStatusData() {
    try {
        
      const { data, error } = await supabase
        .from('statusProfile')
        .select('*')
        .order('created_at', { ascending: false });
  
      if (error) {
        throw error;
      }
  
      return data;
    } catch (error) {
      console.error('Error al obtener los estados:', error);
      return [];
    }
  }
  
  export const StatusData = (props:any) => {
    const [statusData, setStatusData] = useState([]);
  
    useEffect(() => {
      async function fetchData() {
        const data = await getStatusData();
        setStatusData(data);
        console.log (data);
      }
  
      fetchData();
    }, []);
  

  return (
    <div>
     {statusData.map((status) => (
        <div key={status.id}>
          <div className="flex flex-shrink-0 p-4 pb-0">
            <a href="#" className="flex-shrink-0 group block">
              <div className="flex items-center">
                <div>
                  <img
                    className="inline-block h-10 w-10 rounded-full"
                    src={props.urlImg}
                    alt=""
                  />
                </div>
                <div className="ml-3">
                  <p className="text-base leading-6 font-medium text-white">
                    {props.name}
                    <span className="text-sm leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
                      @{props.userNick} . fecha..
                    </span>
                  </p>
                </div>
              </div>
            </a>
          </div>
          <div className="pl-16">
            <p className="text-base width-auto font-medium text-white flex-shrink">
              {status.message}
            </p>
            <div className="flex">
              <div className="w-full">
                <div className="flex items-center">
                </div>
              </div>
            </div>
          </div>
          <hr className="border-gray-600"></hr>
        </div>
      ))}
    </div>
  );
};
export default StatusData;
