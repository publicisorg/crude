function SelectRole(props: any) {

    function handleChange(event:any) {
        props.function(event.target.value);
    }

    function buildOptions() {
        const optionsJSX:any = [];
        props.possibleRoles.forEach((role: any, index:any) => {
            optionsJSX.push(<option key={index} value={role}>{role}</option>)
        })
        return optionsJSX;
    }

    return (
        <select onChange={(e) => handleChange(e)} className={`${props.possibleRoles > 1 ? "block" : "hidden"} w-3/4 p-2 bg-white/25 dark:bg-black/25 rounded-xl text-black dark:text-white" name="roles" id="roles`}>
            {buildOptions()}
        </select>
    )
}

export default SelectRole
