export function Button(props:any) {

  function handleClick() {
      props.function(props.arguments);
  }

return (
  <>
      <button onClick={handleClick} className="border rounded px-5 py-1 shadow-sm cursor-pointer text-center">{props.label}</button>
  </>
)
}

export function ButtonToggle(props:any) {

  function handleClick() {
      props.function(props.arguments);
  }

return (
  <>
      <button onClick={handleClick} className={`${props.actualValue == props.arguments ? "bg-black" : "bg-white hover:bg-gray-200 hover: "} text-bold border rounded px-5 py-1 shadow-sm cursor-pointer text-center`}>{props.label}</button>
  </>
)
}

export default Button
