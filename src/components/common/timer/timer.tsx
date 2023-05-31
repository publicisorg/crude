import { useEffect, useState } from "react"
import { AiOutlineCheckCircle, AiOutlinePauseCircle, AiOutlinePlayCircle } from "react-icons/ai";
import { supabase } from "../../../supabase/client";

function Timer(props: any) {
    const stylesBottomBar = "absolute bottom-0 w-full h-12 flex flex-row justify-evenly items-center gap-5 duration-300";
    const stylesFloatingDiv = "fixed gap-4 bottom-4 right-4 h-42 rounded-2xl py-4 px-8 flex flex-col justify-center items-center shadow-lg"

    const [timerStyles, setTimerStyles] = useState('');
    const [timerColor, setTimerColor] = useState('bg-neutral-500');
    const [playColor, setPlayColor] = useState('#FFFFFF');
    const [pauseColor, setPauseColor] = useState('#AAAAAA');
    const [doneColor, setDoneColor] = useState('#AAAAAA');
    const [opacity, setOpacity] = useState("opacity-0");
    const [finish, setFinish] = useState(false);
    const [running, isRunning] = useState(false);
    const [errorMsg, showErrorMsg] = useState(false);
    const [totalTime, setTotalTime] = useState(0);
    const [lastTimestamp, setLastTimestamp] = useState(0);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [timerTitle, setTimerTitle] = useState('');
    const [dbElapsedTime, setDBElapsedTime] = useState(0);
    const [taskState, setTaskState] = useState('');
    const [taskComment, setTaskComment] = useState('');


    useEffect(() => {
        if (props.timerAlertMessage) {
            showErrorMsg(true);
            props.setTimerAlertMessage(false);
        }
    }, [props.timerAlertMessage])

    useEffect(() => {
        if (props.timerSettingsStyle == "floating") {
            setTimerStyles(stylesFloatingDiv);
        }
        if (props.timerSettingsStyle == "bottombar") {
            setTimerStyles(stylesBottomBar);
        }
    }, [props.timerSettings])

    useEffect(() => {
        setOpacity("opacity-100");
        const thisTime = Date.now();
        setLastTimestamp(thisTime);
    }, [])

    function handlePlay() {
        setTimerColor("bg-red-500");
        setPlayColor("#AAAAAA");
        setPauseColor('#FFFFFF');
        setDoneColor("#FFFFFF");
        const thisTime = Date.now();
        setLastTimestamp(thisTime);
        isRunning(true);
    }

    function handlePause() {
        setTimerColor("bg-yellow-500");
        setPlayColor('#FFFFFF');
        setPauseColor('#AAAAAA');
        setDoneColor("#FFFFFF");
        isRunning(false);
        const thisTime = Date.now();
        setLastTimestamp(thisTime);
        setTotalTime(totalTime + (thisTime - lastTimestamp));
    }

    function handleDone() {
        setTimerColor("bg-lime-600");
        setPlayColor('#AAAAAA');
        setPauseColor('#AAAAAA');
        setDoneColor("#AAAAAA");
        isRunning(false);
        const thisTime = Date.now();
        setLastTimestamp(thisTime);
        setTotalTime(totalTime + (thisTime - lastTimestamp));
        setFinish(true);
    }

    useEffect(() => {
        if (running) {
            setTimeout(() => {
                const thisTime = Date.now();
                setElapsedTime(totalTime + (thisTime - lastTimestamp));
            }, 1000);
        }
    })

    function msToTime() {
        var s = elapsedTime;
        var ms = s % 1000;
        s = (s - ms) / 1000;
        var secs = s % 60;
        s = (s - secs) / 60;
        var mins = s % 60;
        var hrs = (s - mins) / 60;

        var strhrs;
        if (hrs < 10) {
            strhrs = '0' + hrs;
        } else {
            strhrs = hrs;
        }

        var strmins;
        if (mins < 10) {
            strmins = '0' + mins;
        } else {
            strmins = mins;
        }

        var strsecs;
        if (secs < 10) {
            strsecs = '0' + secs;
        } else {
            strsecs = secs;
        }

        return strhrs + ':' + strmins + ':' + strsecs;
    }

    async function getTaskName() {
        const data = await supabase.from('tasks').select('name, elapsedTime').eq('id', props.timerTaskId);
        return data;
    }

    useEffect(() => {
        getTaskName().then((result: any) => {
            setTimerTitle(result.data[0].name);
            if (result.data[0].elapsedTime == null) {
                setDBElapsedTime(0);
            } else {
                setDBElapsedTime(parseInt(result.data[0].elapsedTime));
            }
            
        })
    }, [])

    async function handleForm() {
        try {
            const response = await supabase
                .from('tasks')
                .update({ elapsedTime: (dbElapsedTime + elapsedTime), status: taskState, comment: taskComment })
                .eq('id', props.timerTaskId)

            return response;
        }
        catch (error) {
            console.log(error);
        }
    }

    function handleState(e: any) {
        setTaskState(e.target.value);
    }

    function handleComment(e: any) {
        setTaskComment(e.target.value);
    }

    function handleSubmit(e:any) {
        e.preventDefault();
        handleForm().then((result:any) => {
            if (result.status == 204) {
                setOpacity("opacity-0");
                setTimeout(() => {
                    props.clearTimer();
                }, 310)
            }
        });
    }

    return (
        <>
            {errorMsg && <div onClick={() => showErrorMsg(false)} className="absolute z-50 w-full h-screen bg-black/50 flex justify-center items-center duration-300">
                <div className="bg-red-500 px-6 py-4 text-3xl rounded-full">
                    <p>El timer ya esta con otra tarea ({timerTitle})</p>
                </div>
            </div>}
            <div className={`${timerStyles} ${opacity} ${timerColor} duration-300`}>
                <div className={`${props.timerSettingsStyle == 'floating' ? "flex-col" : "flex-row"} flex justify-center items-center gap-4`}>
                    <h2 className="text-2xl truncate max-w-[250px]">{timerTitle}</h2>
                    <p className="bg-black/25 py-1 w-28 text-center rounded-3xl">{msToTime()}</p>
                </div>
                {finish &&
                    <form onSubmit={handleSubmit} className={`${finish ? "opacity-100 h-auto w-auto" : "opacity-0 h-0 w-0"} gap-4 flex ${props.timerSettingsStyle == "floating" ? "flex-col" : "flex-row"} justify-center items-center duration-300`}>
                        <select onChange={(e) => handleState(e)} className={`${finish ? "opacity-100 h-auto w-full" : "opacity-0 h-0 w-0"} duration-300 py-2 px-3 text-sm font-medium focus:outline-none bg-black/25 rounded-lg border border-gray-200/10 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200`}>
                            <option value="AJUSTES">AJUSTES</option>
                            <option value="ENVIADO">ENVIADO</option>
                        </select>
                        <input placeholder="Comentario" onChange={(e) => handleComment(e)} className={`${finish ? "opacity-100 h-auto w-full" : "opacity-0 h-0 w-0"} duration-300 py-2 px-3 text-sm font-medium focus:outline-none bg-black/25 rounded-lg border border-gray-200/10 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200`} />
                        <button className={`${finish ? "opacity-100 h-auto w-full" : "opacity-0 h-0 w-0"} duration-300 py-2 px-3 text-sm font-medium focus:outline-none bg-black/25 rounded-lg border border-gray-200/10 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200`}>Confirmar</button>
                    </form>
                }
                <div className="flex flex-row gap-8">
                    <button onClick={handlePlay} className={`${playColor == '#FFFFFF' ? "cursor-pointer pointer-events-auto" : "cursor-default pointer-events-none hidden"}`}><AiOutlinePlayCircle color={playColor} size={42} /></button>
                    <button onClick={handlePause} className={`${pauseColor == '#FFFFFF' ? "cursor-pointer pointer-events-auto" : "cursor-default pointer-events-none hidden"}`}><AiOutlinePauseCircle color={pauseColor} size={42} /></button>
                    <button onClick={handleDone} className={`${doneColor == '#FFFFFF' ? "cursor-pointer pointer-events-auto" : "cursor-default pointer-events-none hidden"}`}><AiOutlineCheckCircle color={doneColor} size={42} /></button>
                </div>
            </div>
        </>
    )
}

export default Timer
