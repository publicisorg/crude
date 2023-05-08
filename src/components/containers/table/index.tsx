import { useEffect, useState } from "react";
import FormatedData from "../../common/formatedData/formatedData"
import axios from 'axios'

function Table() {
  const [contenido, setContenido] = useState([]);
  const [estructura, setEstructura] = useState([]);
  const [webReady, isWebReady] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://renaultmujeresemprendedoras.com.ar/ImportData.php');
        setEstructura(response.data[0]);
        setContenido(response.data[1]);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData()

  }, []);

  function buildResultsByCategory() {
    var tableHtml: any = [];

    console.log(contenido);

    contenido.forEach((element:any, index:any) => {
      console.log(element);
      tableHtml.push(<FormatedData data={element} index={index} webReady={webReady} estructura={estructura} editable={false}/>);
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
    estructura.forEach((element: any, index: number) => {
      headerJSX.push(<th key={index} className="px-4 uppercase">{element.Field}</th>);
    });

    return headerJSX;
  }

  return (
    <>

      <table className="table-auto border p-4 rounded-md shadow">
        <thead>

          <tr className="border ">
            {buildTableHeader()}
          </tr>
        </thead>
        <tbody>
          {buildResultsByCategory()}
        </tbody>
      </table>
    </>
  )
}

export default Table;