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
      <tr key={index} className={`${(index % 2) > 0 ? "bg-black/5" : "bg-transparent"} border`}>
        <td>
          {elemento.id}
        </td>
        <td>
          <img src={elemento.Imagen} className="w-24 py-1 rounded-md"/>
        </td>
        <td>
          <p>{categoria}</p>
        </td>
        <td>
          <p>{elemento.Display_name}</p>
        </td>
        <td>
          <p>{elemento.Tags[0]}</p>
        </td>
        <td>
          <p>{elemento.Tags[1]}</p>
        </td>
        <td>
          <p>{elemento.Tags[2]}</p>
        </td>
        <td>
          <p>{elemento.Colores[0]}</p>
        </td>
        <td>
          <p>{elemento.Colores[1]}</p>
        </td>
        <td>
          <p>{elemento.Colores[2]}</p>
        </td>
        <td>
          <p>DUMMY</p>
        </td>
        <td>
          <p>DUMMY</p>
        </td>
      </tr>)
    })

    return tableHtml;
  }

  return (
    <>
      <table className="table-auto border p-4 rounded-md shadow">
        <thead>
          <tr className="border ">
            <th className="px-4">ID</th>
            <th className="px-4">Foto</th>
            <th className="px-4">Categoria</th>
            <th className="px-4">Nombre</th>
            <th className="px-4">Tag 1</th>
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