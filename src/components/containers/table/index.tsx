import { useEffect, useState } from "react";
import FormatedData from "../../common/formatedData/formatedData"
import axios from 'axios'

function Table(props: any) {
  const [contenido, setContenido] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('https://desarrollodesitios0.site/crude/ImportDate.php');
        console.log(response);
        setContenido(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData()

  }, []);

  function buildResultsByCategory(data: any, categoria:any) {
    var tableHtml:any = [];

    data.elementos.map((elemento: any, index: number) => {
      tableHtml.push(
      <tr key={index}>
        <td>
          {elemento.id}
        </td>
        <td>
          <img src={elemento.Imagen} className="w-24"/>
        </td>
        <td>
          <p>{categoria}</p>
        </td>
      </tr>)
    })

    return tableHtml;
  }

  return (
    <>
      <table className="table-auto">
        <thead>
          <tr>
            <th>ID</th>
            <th>Foto</th>
            <th>Categoria</th>
            <th>Nombre</th>
            <th>Tag 1</th>
            <th>Tag 2</th>
            <th>Tag 3</th>
            <th>Color 1</th>
            <th>Color 2</th>
            <th>Color 3</th>
            <th>Palabras Clave</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>

          {contenido.map((elementos: any, index: number) => {
            console.log(elementos);
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