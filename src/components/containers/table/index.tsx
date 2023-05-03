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

  function buildResultsByCategory(data: any, categoria: any) {
    var tableHtml: any = [];

    data.elementos.map((elemento: any, index: number) => {
      tableHtml.push(
        <FormatedData data={elemento} index={index} categoria={categoria} webReady={webReady}/>
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

      <table className="table-auto border p-4 rounded-md shadow w-full">
        <thead>
          <tr className="border ">
            <th className="px-4">ID</th>
            <th className="px-4">Foto</th>
            <th className="px-4">Nombre</th>
            <th className="px-4">Categoria</th>
            <th className="px-4">Tag 2</th>
            <th className="px-4">Tag 3</th>
            <th className="px-4">Color 1</th>
            <th className="px-4">Color 2</th>
            <th className="px-4">Color 3</th>
            <th className="px-4">Palabras Clave</th>
            <th className="px-4">Eliminar</th>
          </tr>
        </thead>
        <tbody>

          {contenido.map((elementos: any) => {
            return (
              buildResultsByCategory(elementos, elementos.categoria)
            )
          })}

        </tbody>
      </table>
    </>
  )
}

export default Table;