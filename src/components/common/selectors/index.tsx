import Tags from './tags.json'
import Colores from './colors.json'

export const Tag = (props:any) => {

  console.log(props);

  return (
    <select defaultValue={props.tag}>
      {Tags.map((Tag, index) => {
          return (<option key={index} value={Tag.nombre}>{Tag.nombre}</option>)
        })}
    </select>
  )
}
export const Colors = (props:any) => {

  console.log(props);

  return (
    <select defaultValue={props.color}>
      {Colores.map((Color, index) => {
          return (<option key={index} value={Color.nombre}>{Color.nombre}</option>)
        })}
    </select>
  )
}
