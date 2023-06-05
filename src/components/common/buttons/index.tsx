export function GenericButton(props: any) {

  function handleClick(e:any) {
    e.preventDefault();
    props.function(props.arguments);
  }

  return (
    <>
      <button
        style={{backgroundColor: props.secondaryColor, borderColor: props.borderColor}}
        onClick={(e) => handleClick(e)}
        className={`border hover:brightness-150 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-left duration-300 ${props.className}`} >
        {props.label}
      </button>
    </>
  )
}

export function ButtonToggle(props: any) {

  function handleClick() {
    props.function(props.arguments);
  }

  return (
    <>
      <button onClick={handleClick} className={`${props.actualValue == props.arguments ? "bg-black" : "bg-white hover:bg-gray-200 hover: "} text-bold border rounded px-5 py-1 shadow-sm cursor-pointer text-center`}>{props.label}</button>
    </>
  )
}

export default GenericButton
