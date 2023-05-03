import { useEffect, useState } from "react";
import FormatedData from "../../common/formatedData/formatedData"
import axios from 'axios'

function Table(props: any) {
  const [contenido, setContenido] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('https://desarrollodesitios0.site/crude/ImportDate.php');
        setContenido(response.data);
      

      } catch (error) {
        console.log(error);
      }
    }
    fetchData()

  }, []);

  return (
    <>
      <table className="table-auto">
        <thead>
          <tr>
            <th>Foto</th>
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
          {contenido.length > 0 ? (
           contenido.map((elementos: any, index: number) => {
          
              return (
                <tr key={index}>
                  <td>{elementos.Nombre}</td>
                  FUCK!
                </tr>
              )
           
          })
          ) : (
            <tr>
              <td colSpan={10}>
                <div className="flex flex-col justify-center items-center">
                  <h3 className="text-3xl">
                    No levanta ningún dato amigo :(
                  </h3>
                </div>
              </td>
            </tr>
          )}

        </tbody>
      </table>
    </>
  )
}

export default Table;