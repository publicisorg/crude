import { useEffect, useState } from "react";

function Keywords(props: any) {

    const [keywords, setKeywords] = useState<any>([]);
    const [actualValue, setActualValue] = useState<any>('');

    function checkWord(value: any) {
        if (value.slice(-1) == ',' || value.slice(-1) == ' ') {
            setKeywords(
                [
                    ...keywords,
                    { id: keywords.length, value: value.slice(0, -1) }
                ]
            );
            setActualValue('');
        } else {
            setActualValue(value.toUpperCase());
        }
    }

    useEffect(() => {
        console.log(keywords);
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
                <div id={element.value} key={index} className="bg-black text-white rounded px-2 py-1 font-bold flex flex-row gap-2">
                    <p className="m-0">{element.value}</p>
                    <span className="font-bold text-red-400 cursor-pointer" onClick={() => removeWord(element.id)}>X</span>
                </div>
            );
        })

        return componentArray;
    }

    function removeWord(value:any) {
        setKeywords(
            keywords.filter((word:any) => word.id !== value)
        );
    }

    return (
        <>
            <div className="flex flex-col">
                <input value={actualValue.toUpperCase()} type="text" className="border" onChange={(e) => checkWord(e.target.value)} />
                <div className="flex gap-2">
                    {listKeywords(keywords)}
                </div>
            </div>
        </>
    )
}

export default Keywords
