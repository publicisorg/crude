import React from 'react';
import Papa from 'papaparse';
import { countAsignado, countAsignadoforPeople } from './statusUtils';

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
  const parsed = await new Promise<Status[]>((resolve, reject) => {
    Papa.parse<Status>(data, {
      header: true,
      complete: (result) => resolve(result.data),
      error: reject
    });
  });

  console.log(parsed);
  return parsed;
}

function SheetData() {
  const [status, setStatus] = React.useState<Status[]>([]);
  const [selectedDigital, setSelectedDigital] = React.useState('');

  React.useEffect(() => {
    async function fetchData() {
      const statusData = await dataStatus();
      setStatus(statusData);
    }

    fetchData();
  }, []);

  const asignadoCount = countAsignado(status);
  const asignadoForPeopleCount = countAsignadoforPeople(status);

  const handleDigitalChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedDigital(selectedValue);

    const filteredStatus = status.filter((dataa) => dataa.DIGITAL === selectedValue);
    setStatus(filteredStatus);
  };

  return (
    <div>
      <h1>Status Digital</h1>
      <p>ASIGNADOS: {asignadoCount}</p>

      <p>Veces que EN VALIDACIÓN {selectedDigital} aparecen: {asignadoForPeopleCount}</p>
      <select value={selectedDigital} onChange={handleDigitalChange}>
        <option value="">Seleccione una opción</option>
        
          <option value="Julian Di Pietrantonio">
            Julian Di Pietrantonio
          </option>
          <option value="Maximiliano Rodriguez">
          Maximiliano Rodriguez

        </option>
      
      </select>
      <table className='w-full text-md border border-black p-4 text-center w-[100%] bg-gray-600  text-slate-400'>
        <tr>
          <th>Digital</th>
          <th>Proyecto / pedido</th>
          <th>Estado del pedido</th>
          <th>Lo pide</th>
        </tr>
        {status.map((dataa) => (
          <tr key={dataa.DIGITAL} className={`${dataa.X === 'x' ? 'text-white bg-red-500 p-1 rounded' : '' } even:bg[#374151] odd:bg-[#374151]`}>
            <td 
            className={`${dataa.DIGITAL === 'Ivo Estevan' ? 'text-white bg-red-500/20 p-1 rounded' : '' }
            ${dataa.DIGITAL === 'Julian Di Pietrantonio' ? 'text-white bg-orange-500/20 p-1 rounded' : '' }
            ${dataa.DIGITAL === 'Maximiliano Rodriguez' ? 'text-white bg-amber-500/20 p-1 rounded' : '' }
            ${dataa.DIGITAL === 'Emanuel Musacco' ? 'text-white bg-red-900/20 p-1 rounded' : '' }
            ${dataa.DIGITAL === 'David Mrcaich' ? 'text-white bg-yellow-500/20 p-1 rounded' : '' }
            ${dataa.DIGITAL === 'Julieta Verón' ? 'text-white bg-lime-500/20 p-1 rounded' : '' }
            `} > {dataa.DIGITAL}</td> 
            <td className='border border-black text-slate-400'> {dataa.PROYECTO}</td>
            
            <td className="border border-black p-2"> 
            <span className={`${dataa.ESTADO === 'EN TESTEO (WT)' ? 'text-white bg-violet-900 p-1 rounded' : '' }
            ${dataa.ESTADO === 'EN VALIDACIÓN' ? 'text-bold bg-orange-500 rounded-md p-1 text-white' : ''}
            ${dataa.ESTADO === 'ASIGNADO' ? 'text-bold bg-red-500 rounded-md p-1 text-white' : ''}
            ${dataa.ESTADO === 'EN DISEÑO' ? 'text-bold text-green-500 rounded-md p-1 text-white' : ''}
            ${dataa.ESTADO === 'PEDIDO ENVIADO' ? 'text-bold text-white rounded-md p-1' : ''}
            `}> {dataa.ESTADO}</span></td>
            <td className='border border-black text-slate-400'>{dataa.CUENTAS}</td>
            </tr>
            ))}
            </table>
            </div>
            );
            }
            
            export default SheetData;