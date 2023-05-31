import { useEffect, useState } from "react"
import { AiOutlineCheckCircle, AiOutlinePauseCircle, AiOutlinePlayCircle } from "react-icons/ai";

function Timer(props: any) {

    const stylesBottomBar = "absolute bottom-0 w-full h-12 bg-red-500 flex flex-row justify-center items-center";
    const stylesFloatingDiv = "fixed gap-4 bottom-4 right-4 h-32 w-auto bg-red-500 rounded-3xl py-4 px-8 flex flex-col justify-center items-center"

    const [timerStyles, setTimerStyles] = useState('');

    useEffect(() => {
        if (props.timerSettingsStyle == "floating") {
            setTimerStyles(stylesFloatingDiv);
        }
        if (props.timerSettingsStyle == "bottombar") {
            setTimerStyles(stylesBottomBar);
        }
    }, [props.timerSettings])

    return (
        <div className={`${timerStyles} duration-300`}>
            <div className="flex flex-row justify-center items-center gap-4">
                <h2 className="text-2xl">TEST</h2>
                <p className="">02:24:33</p>
            </div>
            <div className="flex flex-row gap-8">
                <button><AiOutlinePlayCircle size={48} /></button>
                <button><AiOutlinePauseCircle size={48} /></button>
                <button><AiOutlineCheckCircle size={48} /></button>
            </div>
        </div>
    )
}

export default Timer
