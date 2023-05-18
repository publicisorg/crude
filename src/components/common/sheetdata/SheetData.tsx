import { useEffect, useState } from 'react';
import Papa from 'papaparse';

type Status = {
  DIGITAL: string,
  CUENTAS: string,
  PROYECTO: string,
  ESTADO: string,
  X: string,
};

async function dataStatus() {
  const res = await fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vTN7pLDu2rCMgVAeb4U3eurM6fur8Y0VZm5gpKEF_Opg76vr4VVFiVP8B8KPnl0SoymsW-ua8cRkn8d/pub?gid=1496113497&single=true&output=csv');
  const data = await res.text();
  const parsed = await new Promise<any>((resolve, reject) => {
    Papa.parse<Status>(data, {
      header: true,
      complete: (result) => resolve(result.data),
      error: reject
    });
  });
  return parsed;
}

function SheetData(props: any) {
  const [status, setStatus] = useState<any>([]);
  const [filteredStatus, setFilteredStatus] = useState<any>([]);
  const [fullscreen, isFullscreen] = useState(true);
  const [tableSize, setTableSize] = useState("w-1/4");

  useEffect(() => {
    if (props.fullscreen != undefined) {
      isFullscreen(props.fullscreen);
      setTableSize("w-1/2");
    }
  })

  useEffect(() => {
    async function fetchData() {
      const statusData = await dataStatus();
      setStatus(statusData.filter((a: any) => a.cliente != '' && a.MARCA != ''));
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (status.length > 0) {
      if (props.user == "none") {
        setFilteredStatus(status.filter((data: any) => data.DIGITAL == ''))
      }
      if (props.user == "all") {
        setFilteredStatus(status)
      }
      if (props.user != "all" && props.user != "none") {
        setFilteredStatus(status.filter((data: any) => data.DIGITAL == props.user))
        if (props.getNotStarted != undefined && props.getDone != undefined && props.getInProcess != undefined) {
          props.getNotStarted(filteredStatus.filter((data: any) => data.ESTADO == "ASIGNADO").length);
          props.getDone(filteredStatus.filter((data: any) => data.ESTADO == "EN TESTEO (WT)" || data.ESTADO == "EN VALIDACIÓN").length);
          props.getInProcess(filteredStatus.filter((data: any) => data.ESTADO != "ASIGNADO" && data.ESTADO != "EN TESTEO (WT)" && data.ESTADO != "EN VALIDACIÓN").length);
        }
      }
    }
  }, [status])

  return (
    <div className={`${fullscreen ? "p-12 bg-black/25 dark:bg-white/10" : "rounded-none"} text-black dark:text-white`}>
      <div className='w-full text-md text-center flex flex-col justify-center items-center'>
        <div className="flex flex-row justify-between items-center w-full px-6">
          {fullscreen && <p className={`${tableSize} py-4`}>Digital</p>}
          <p className={`${tableSize} py-4`}>Proyecto / pedido</p>
          <p className={`${tableSize} py-4`}>Estado del pedido</p>
          {fullscreen && <p className={`${tableSize} py-4`}>Lo pide</p>}
        </div>
        {filteredStatus.map((dataa: any, index: any) => (
          <div key={index} className={`${dataa.X === 'x' ? 'text-black dark:text-white bg-red-500 p-1' : ''}  even:bg-black/10 dark:even:bg-white/10 h-20 w-full flex flex-row justify-between items-center px-6`}>
            {fullscreen && <p className={`${tableSize}`}>{dataa.DIGITAL}</p>}
            <p className={`${tableSize} text-black dark:text-white`}>{dataa.PROYECTO}</p>

            <p className={`${tableSize} p-2`}>
              <span className={`${dataa.ESTADO === 'EN TESTEO (WT)' ? 'text-white bg-violet-900 p-1' : ''}
            ${dataa.ESTADO === 'EN VALIDACIÓN' ? 'text-bold bg-orange-500 rounded-md p-1 text-white' : ''}
            ${dataa.ESTADO === 'ASIGNADO' ? 'text-bold bg-red-500 rounded-md p-1 text-white' : ''}
            ${dataa.ESTADO === 'EN DISEÑO' ? 'text-bold text-green-500 rounded-md p-1' : ''}
            ${dataa.ESTADO === 'PEDIDO ENVIADO' ? 'text-bold text-black dark:text-white rounded-md p-1' : ''}
            `}> {dataa.ESTADO}</span></p>
            {fullscreen && <p className={`${tableSize} text-black dark:text-white`}>{dataa.CUENTAS}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SheetData;