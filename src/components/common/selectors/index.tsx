import Tags from './tags.json'
import Colores from './colors.json'
import { useEffect } from 'react'

export const Tag = (props:any) => {

  useEffect(() => {
    props.collectData(props.tag);
  }, [])

  return (
    <select className="bg-transparent border px-2 py-1 rounded-md bg-gray-700 border-gray-900 w-full" defaultValue={props.tag} onChange={(e) => props.collectData(e.target.value)}>
      {Tags.map((Tag, index) => {
          return (<option key={index} value={Tag.nombre}>{Tag.nombre}</option>)
        })}
    </select>
  )
}
export const Colors = (props:any) => {

  useEffect(() => {
    props.collectData(props.color);
  }, [])

  return (
    <select className="bg-transparent border px-2 py-1 rounded-md bg-gray-700 border-gray-900 w-full" defaultValue={props.color} onChange={(e) => props.collectData(e.target.value)}>
      {Colores.map((Color, index) => {
          return (<option key={index} value={Color.nombre}>{Color.nombre}</option>)
        })}
    </select>
  )
}
