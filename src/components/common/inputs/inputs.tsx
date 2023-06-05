export function GenericInput(props: any) {

    function handleChange(e:any) {
        props.function(e);
    }

    return (
        <div className="w-auto">
            <div className='mb-2 block'>
                <label htmlFor={props.name} className="text-sm font-medium" data-testid="flowbite-label">{props.label}</label>
            </div>
            <div className="flex">
                <div className='relative w-full'>
                    <input onChange={(e) => handleChange(e.target.value)} 
                    className="border hover:brightness-150 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-left w-full duration-300" 
                    type={props.type} 
                    id={props.id} 
                    name={props.name} 
                    defaultValue={props.defaultValue} 
                    required={props.required}
                    placeholder={props.placeholder}
                    style={{backgroundColor: props.secondaryColor, borderColor: props.borderColor}}/>
                </div>
            </div>
        </div>
    )
}

export default GenericInput
