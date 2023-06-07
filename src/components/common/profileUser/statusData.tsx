import { useEffect, useState } from 'react';
import { supabase } from '../../../supabase/client';

interface StatusProfile {
  id: number;
  message: string;
}

async function getStatusData() {
  try {
    const { data, error } = await supabase
      .from('statusProfile')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    const transformedData: StatusProfile[] = data.map((item: any) => ({
      id: item.id,
      message: item.message,
    }));

    return transformedData;
  } catch (error) {
    console.error('Error al obtener los estados:', error);
    return [];
  }
}

export const StatusData = (props: any) => {
  const [statusData, setStatusData] = useState<StatusProfile[]>([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getStatusData();
      setStatusData(data);
      console.log(data);
    }

    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      {statusData.map((status) => (
        <div key={status.id} className='bg-white/10 p-4 border rounded-lg shadow-lg' style={{ borderColor: props.borderColor }}>
          <div className="flex flex-shrink-0">
            <div className="flex-shrink-0 group block">
              <div className="flex items-center justify-center gap-4">
                <div>
                  <img
                    className="inline-block h-10 w-10 rounded-full border-2"
                    src={props.urlImg}
                    alt=""
                    style={{ borderColor: props.borderColor }}
                  />
                </div>
                <div className="flex flex-col justify-start items-start gap-0">
                  <p className="text-base leading-6 font-medium text-white">
                    {props.name + " " + props.lastname}
                  </p>
                  <div className="flex flex-row gap-2 items-center justify-start">
                    <span className="text-sm leading-5 font-medium opacity-70">
                      @{props.userNick}
                    </span>
                    <span className="text-sm leading-5 font-medium opacity-70">
                      -
                    </span>
                    <span className="text-sm leading-5 font-medium opacity-70">
                      FECHA
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="pl-14 mt-2">
            <p className="text-base width-auto font-medium text-white flex-shrink">
              {status.message}
            </p>
            <div className="flex">
              <div className="w-full">
                <div className="flex items-center">{/* Resto del código */}</div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatusData;
