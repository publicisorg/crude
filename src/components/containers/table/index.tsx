import FormatedData from "../../common/formatedData/formatedData"

function Table() {

  return (
    <>
      <table>
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
        <tr>
            <FormatedData/>
        </tr>
      </table>
    </>
  )
}

export default Table
