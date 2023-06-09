import { useEffect, useState } from "react";
import FormatedData from "../../common/formatedData/formatedData"
import axios from 'axios'

function Table() {
  const [contenido, setContenido] = useState([]);
  const [webReady, isWebReady] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('https://desarrollodesitios0.site/crude/ImportData.php');
        setContenido(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData()

  }, []);

  function buildResultsByCategory(data: any) {
    var tableHtml: any = [];

    data.elementos.map((elemento: any, index: number) => {
      tableHtml.push(
        <FormatedData data={elemento} index={index} webReady={webReady}/>
      )
    })

    return tableHtml;
  }

  useEffect(() => {
    setTimeout(() => {
      isWebReady(true);
    }, 3000);
  }, [])

  return (
    <>
      <table className="border p-4 w-full bg-gray-800 text-white border-gray-900 shadow-lg">
        <thead>
          <tr className="border border-gray-900 rounded-md">
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Foto</th>
            <th className="px-4 py-2">Nombre</th>
            <th className="px-4 py-2">Categoria</th>
            <th className="px-4 py-2">Tag 2</th>
            <th className="px-4 py-2">Tag 3</th>
            <th className="px-4 py-2">Color 1</th>
            <th className="px-4 py-2">Color 2</th>
            <th className="px-4 py-2">Color 3</th>
            <th className="px-4 py-2">URL</th>
            <th className="px-4 py-2">Eliminar</th>
          </tr>
        </thead>
        <tbody>

          {contenido.map((elementos: any) => {
            return (
                buildResultsByCategory(elementos)
            )
          })}

        </tbody>
      </table>
    </>
  )
}

export default Table;