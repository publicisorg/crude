import { useEffect, useState } from "react";
import FormatedData from "../../common/formatedData/formatedData"
import axios from 'axios'
import externalData from './data.json'

function Table() {
  const [contenido, setContenido] = useState([]);
  const [estructura, setEstructura] = useState([]);
  const [webReady, isWebReady] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = externalData; //await axios.get('./ImportData.php');
        //setEstructura(response.data[0]);
        //setContenido(response.data[1]);
        setEstructura(response[0]);
        setContenido(response[1]);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData()

  }, []);

  function buildResultsByCategory() {
    var tableHtml: any = [];

    contenido.forEach((element: any, index: any) => {
      tableHtml.push(<FormatedData data={element} index={index} webReady={webReady} estructura={estructura} editable={false} />);
    });

    return tableHtml;
  }

  useEffect(() => {
    setTimeout(() => {
      isWebReady(true);
    }, 3000);
  }, [])

  function buildTableHeader() {
    const headerJSX: any = [];
    var lastIndex: any;
    estructura.forEach((element: any, index: number) => {
      if (element.Field != 'id' && index < 6) {
        lastIndex = index;
        headerJSX.push(<th key={index} className="px-4 uppercase text-white text-xl ">{element.Field}</th>)
      }
    });
    headerJSX.push(<th key={lastIndex + 1} className="px-8 uppercase">Detalle</th>)
    return headerJSX;
  }

  return (
    <>
      <div className="text-4xl mb-6 font-bolder">
        Total {contenido.length}
      </div>
      <div className="w-full flex justify-center items-center p-2">
        <div className="w-[95%] p-1 bg-black rounded-xl">
          <table className="mx-auto rounded-xl shadow w-full">
            <thead>
              <tr className="bg-black">
                {buildTableHeader()}
              </tr>
            </thead>
            <tbody>
              
              {buildResultsByCategory()}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default Table;