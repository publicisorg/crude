export function GenericButton(props: any) {

  function handleClick(e: any) {
    e.preventDefault();
    props.function(props.arguments);
  }

  return (
    <>
      <button
        style={{ backgroundColor: props.secondaryColor, borderColor: props.borderColor }}
        onClick={(e) => handleClick(e)}
        className={`border hover:brightness-150 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-left duration-300 ${props.className}`} >
        {props.label}
      </button>
    </>
  )
}

export function GenericButtonDummy(props: any) {

  return (
    <>
      <button
        style={{ backgroundColor: props.secondaryColor, borderColor: props.borderColor }}
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

export function StartTask(props: any) {

  function handleClick() {
    props.function(props.arguments);
  }

  return (
    <>

      <button onClick={handleClick} className="continue-application">
        <div>
          <div className="pencil"></div>
          <div className="folder">
            <div className="top">
              <svg viewBox="0 0 24 27">
                <path d="M1,0 L23,0 C23.5522847,-1.01453063e-16 24,0.44771525 24,1 L24,8.17157288 C24,8.70200585 23.7892863,9.21071368 23.4142136,9.58578644 L20.5857864,12.4142136 C20.2107137,12.7892863 20,13.2979941 20,13.8284271 L20,26 C20,26.5522847 19.5522847,27 19,27 L1,27 C0.44771525,27 6.76353751e-17,26.5522847 0,26 L0,1 C-6.76353751e-17,0.44771525 0.44771525,1.01453063e-16 1,0 Z"></path>
              </svg>
            </div>
            <div className="paper"></div>
          </div>
        </div>
        {props.label}
      </button>
    </>
  )
}

export default GenericButton
