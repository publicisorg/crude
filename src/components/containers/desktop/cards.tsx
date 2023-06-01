export const DataCard = (props: any) => {

    return (
        <div className="w-full lg:w-6/12 xl:w-4/12">
            <div className="relative flex flex-col min-w-0 break-words bg-white/10 rounded mb-6 xl:mb-0 shadow-lg border" style={{ borderColor: props.borderColor }}>
                <div className="flex-auto p-4">
                    <div className="flex flex-wrap">
                        <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                            <h5 className="uppercase font-bold text-lg">{props.title}</h5>
                            <span className="font-semibold text-7xl">{props.data}</span>
                        </div>
                        <div className="relative w-auto pl-4 flex-initial">
                            <div className={`${props.iconBg} text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full`} >{props.children}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const DataTasks = (props: any) => {
    return (
        <div className={`${props.containerStyle} w-1/2 p-4  rounded flex flex-col h-full border shadow-lg `} style={{borderColor: props.borderColor}}>
            <p className={`${props.pStyle}`}>{props.title}</p>
            <div className="w-full h-full mt-4 bg-black/25 rounded overflow-y-auto">
                {props.children}
            </div>
        </div>
    )
}
export default DataCard;