import { useEffect, useState } from "react";

function Keywords(props: any) {

    const [keywords, setKeywords] = useState<any>(props.previouskeywords.split(","));
    const [actualValue, setActualValue] = useState<any>('');
    const [show, setShow] = useState(false);
    
    useEffect(() => {
        props.collectData(props.previouskeywords);
      }, [])

    function checkWord(event: any) {
        if (event.target.value.slice(-1) == ',' || event.target.value.slice(-1) == ' ' || event.key === "Enter") {
            var auxValue = event.target.value.slice(0, -1);
            setKeywords(
                [
                    ...keywords,
                    auxValue
                ]
            );
            setActualValue('');
        } else {
            setActualValue(event.target.value.toUpperCase());
        }
    }

    useEffect(() => {
        props.collectData(keywords);
    }, [keywords])

    useEffect(() => {

        if (props.previouskeywords === '' || props.previouskeywords == null) {
            setKeywords([]);
        } else {
            setKeywords(props.previouskeywords.split(","));
        }
    }, [])

    function listKeywords(keywords: any) {
        const componentArray: any = [];
        

        keywords.map((element: any, index: number) => {
            componentArray.push(
                <div id={element} key={index} className="bg-black text-white rounded px-2 py-1 font-bold flex justify-between flex-row gap-2">
                    <p className="m-0">{element}</p>
                    <span className="font-bold text-red-400 cursor-pointer" onClick={() => removeWord(element)}>X</span>
                </div>
            );
        })

        return componentArray;
    }

    function removeWord(value: any) {
        setKeywords(
            keywords.filter((word: any) => word !== value)
        );
    }

    return (
        <>
            <span onClick={() => setShow(true)} className="cursor-pointer font-bold border rounded-md px-2 py-1 bg-white text-black dark:bg-black dark:text-white">Edit</span>
            {
                show &&
                <div className="fixed inset-0 w-full h-screen bg-black/25 flex justify-center items-center">
                    <div className="flex flex-col bg-white rounded-lg drop-shadow w-2/3 h-2/3 gap-8 justify-start items-center p-8">
                        <label htmlFor="input-keywords">Palabras Clave</label>
                        <input value={actualValue.toUpperCase()} type="text" name="input-keywords" id="input-keywords" className="border w-full bg-black/5 rounded-md" onChange={(e) => checkWord(e)} onKeyUp={(e) => checkWord(e)}/>
                        <div className="grid grid-cols-4 gap-2">
                            {listKeywords(keywords)}
                        </div>
                        <span onClick={() => setShow(false)} className="absolute -right-4 -top-4 cursor-pointer text-3xl font-bold bg-black border-2 border-white text-white rounded-full w-10 h-10 flex justify-center items-center drop-shadow">X</span>
                    </div>
                </div>

            }

        </>
    )
}

export default Keywords
