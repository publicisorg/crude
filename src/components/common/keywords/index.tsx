import { useEffect, useState } from "react";

function Keywords(props: any) {

    const [keywords, setKeywords] = useState<any>(props.previouskeywords);
    const [actualValue, setActualValue] = useState<any>('');
    const [show, setShow] = useState(false);

    function checkWord(value: any) {
        if (value.slice(-1) == ',' || value.slice(-1) == ' ') {
            var auxValue = value.slice(0, -1);
            setKeywords(
                [
                    ...keywords,
                    auxValue
                ]
            );
            setActualValue('');
        } else {
            setActualValue(value.toUpperCase());
        }
    }

    useEffect(() => {
        props.collectData(keywords);
    }, [keywords])

    useEffect(() => {

        if (props.previouskeywords === '' || props.previouskeywords == null) {
            setKeywords([]);
        } else {
            setKeywords(props.previouskeywords);
        }
    }, [])

    function listKeywords(keywords: any) {
        const componentArray: any = [];

        keywords.map((element: any, index: number) => {
            componentArray.push(
                <div id={element} key={index} className="bg-black text-white rounded px-2 py-1 font-bold flex flex-row gap-2">
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
            <span onClick={() => setShow(true)} className="cursor-pointer font-bold border rounded-md px-2 py-1 bg-white">Edit</span>
            {
                show &&
                <div className="fixed inset-0 w-full h-screen bg-black/25 flex justify-center items-center">
                    <div className="flex flex-col bg-white rounded-lg drop-shadow w-2/3 h-2/3 gap-8 justify-start items-center p-8">
                        <input value={actualValue.toUpperCase()} type="text" className="border" onChange={(e) => checkWord(e.target.value)} />
                        <div className="flex gap-2">
                            {listKeywords(keywords)}
                        </div>
                        <span onClick={() => setShow(false)} className="absolute -right-4 -top-4 cursor-pointer text-3xl font-bold bg-white rounded-full w-12 h-12 flex justify-center items-center drop-shadow">X</span>
                    </div>
                </div>

            }

        </>
    )
}

export default Keywords
