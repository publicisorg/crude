function SelectRole(props: any) {

    function handleChange(event:any) {
        props.function(event.target.value);
    }

    function buildOptions() {
        const optionsJSX:any = [];
        props.possibleRoles.forEach((role: any) => {
            optionsJSX.push(<option value={role}>{role}</option>)
        })
        return optionsJSX;
    }

    return (
        <select onChange={(e) => handleChange(e)} className="w-3/4 p-2 bg-white/25 dark:bg-black/25 rounded-xl text-black dark:text-white" name="roles" id="roles">
            {buildOptions()}
        </select>
    )
}

export default SelectRole
