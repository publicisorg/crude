import Tags from './tags.json'
import Colores from './colors.json'

export const Tag = (props:any) => {
  return (
    <select>
      {Tags.map((Tag, index) => {
          return (<option key={index} value={Tag.nombre}>{Tag.nombre}</option>)
        })}
    </select>
  )
}
export const Colors = (props:any) => {
  return (
    <select>
      {Colores.map((Color, index) => {
          return (<option key={index} value={Color.nombre}>{Color.nombre}</option>)
        })}
    </select>
  )
}
