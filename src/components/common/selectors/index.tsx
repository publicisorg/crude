
import { useEffect, useState } from 'react'

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

  //const [show, isShow] = useState(true);

  /*if (props.children.length > 30) {
    isShow(false);
  }*/

  return (
    <p key={props.index} className='max-w-[100px] text-center'>{props.children}</p>
  )
}

export default NonEditable
