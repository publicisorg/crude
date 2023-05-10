
import { useEffect, useState } from 'react'

export const DropdownSelect = (props: any) => {

  useEffect(() => {
    props.collectData(props.value);
  }, [])

  return (
    <select defaultValue={props.value} className="border rounded-md" onChange={(e) => props.collectData(e.target.value)}>
      {props.data.map((data: any, index: any) => {
        return (<option key={index} value={data.nombre}>{data.nombre}</option>)
      })}
    </select>
  )
}

export const NonEditable = (props: any) => {

  //const [show, isShow] = useState(true);

  /*if (props.children.length > 30) {
    isShow(false);
  }*/

  return (
    <p key={props.index} className='text-center'>{props.children}</p>
  )
}

export const Details = (props: any) => {

  const [showPopup, isShowPopup] = useState(false);

  function handleClick() {
    isShowPopup(!showPopup);
  }

  function buildTableContent() {
    const tableContent: any = [];
    console.log(props.data);
    props.estructura.forEach((key: any, index: number) => {
      if (key.Field != 'id') {
        var auxType = key.type;
        var contentComponent: any = [];
        if (!props.editable) {
          contentComponent = (<NonEditable key={index}>{props.data[key.Field]}</NonEditable>)
        } else {
          switch (auxType) {
            /*case "int":
              contentComponent = (<NonEditable key={index}>{props.data[key.Field]}</NonEditable>)
            case "varchar":
              contentComponent = (<NonEditable key={index}>{props.data[key.Field]}</NonEditable>)*/
            default:
              contentComponent = (<NonEditable key={index}>{props.data[key.Field]}</NonEditable>)
          }
        }
        tableContent.push(
          <article className="bg-gray-200 mx-4 my-2 px-4 py-2 rounded-md w-full min-h-[50px]">
            <p className="font-bold">{key.Field}:</p>
            {contentComponent}
          </article>)
      }
    });

    return tableContent;
  }



  return (
    <>
      <td className="px-2 text-center">
        <p key={props.index} className='max-w-[250px] text-center'>
          <span className='cursor-pointer bg-white border rounded-md font-bold px-2 py-1' onClick={handleClick}>Ver más</span>
        </p>
      </td>
      {showPopup && <div onClick={handleClick} className="fixed w-full h-screen flex justify-center items-center bg-black/25 z-50 top-0 left-0">
        <div className='w-2/3 h-2/3 bg-white flex justify-center items-start rounded-xl drop-shadow-xl overflow-auto'>
          <div className='flex flex-col justify-center items-center w-full p-6'>
            {buildTableContent()}
          </div>

        </div>
        <span onClick={handleClick} className="text-white bg-red-500 rounded-full top-4 right-4 cursor-pointer w-10 h-10 flex justify-center items-center text-3xl absolute drop-shadow-xl duration-200 hover:text-red-500 hover:bg-white">X</span>
      </div>}
    </>
  )
}

export default NonEditable
