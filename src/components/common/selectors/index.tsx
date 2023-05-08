
import { useEffect } from 'react'

export const DropdownSelect = (props:any) => {

  useEffect(() => {
    props.collectData(props.value);
  }, [])

  return (
    <select defaultValue={props.value} className="border rounded-md" onChange={(e) => props.collectData(e.target.value)}>
      {props.data.map((data:any, index:any) => {
          return (<option key={index} value={data.nombre}>{data.nombre}</option>)
        })}
    </select>
  )
}

export const NonEditable = (props:any) => {

  return (
    <p>{props.children}</p>
  )
}

export default NonEditable
