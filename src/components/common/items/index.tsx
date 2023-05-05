import { useState } from "react";

const styles = "flex flex-col justify-center items-center text-xl font-bold text-black p-4 border rounded shadow-md duration-300 bg-white hover:bg-gray-200 scale-100 hover:scale-105 cursor-pointer";
const iconStyles = "w-48 fill-transparent stroke-gray-400";

export function ItemFolder(props: any) {

    function handleClick() {
        props.enterFolder();
    }

    return (
        <>
            <div onClick={handleClick} className={styles} key={props.index}>
                <svg className={iconStyles} viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.086 5.5l2.457 2.414 0.629 0.586h15.829v18h-28v-21h9.086zM12 3.5h-10c-1.105 0-2 0.896-2 2v21c0 1.105 0.895 2 2 2h28c1.105 0 2-0.895 2-2v-18c0-1.104-0.895-2-2-2h-15z"></path>
                </svg>
                {props.label}
            </div>
        </>
    )
}

export function ItemImage(props: any) {

    const [show, setShow] = useState(false);

    function handleClick() {
        setShow(!show);
    }

    return (
        <>
            <div onClick={handleClick} className={styles} key={props.index}>
                <img className="w-48 max-h-48 object-cover" src={'https://desarrollodesitios0.site/2023/newsletters/' + props.path.join('/') + '/' + props.label} />
                {props.label}
            </div>
            {show && <div className="z-50 w-full h-screen fixed bg-black/25 flex justify-center items-center inset-0">
                <img className="bg-white rounded-xl p-4" src={'https://desarrollodesitios0.site/2023/newsletters/' + props.path.join('/') + '/' + props.label} />
                <span onClick={handleClick} className="text-white bg-red-500 rounded-full top-4 right-4 cursor-pointer w-10 h-10 flex justify-center items-center text-3xl absolute drop-shadow-xl duration-200 hover:text-red-500 hover:bg-white">X</span>
            </div>}
        </>
    )
}

export function ItemFrame(props: any) {

    const [show, setShow] = useState(false);
    const [editor, openEditor] = useState(false);

    function handleClick() {
        setShow(!show);
    }

    return (
        <>
            <div onClick={handleClick} className={styles} key={props.index}>
                <iframe className="bg-white rounded-xl w-48 h-48" scrolling="no" src={'https://desarrollodesitios0.site/2023/newsletters/' + props.path.join('/') + '/' + props.label} />
                {props.label}
            </div>
            {show && <div className="z-50 w-full h-screen fixed bg-black/25 flex justify-center items-center inset-0 flex-col gap-4">
                <iframe className="bg-white rounded-xl p-4 w-2/3 h-4/5" src={'https://desarrollodesitios0.site/2023/newsletters/' + props.path.join('/') + '/' + props.label} />
                <span onClick={() => openEditor(true)} className="text-black bg-white rounded-md cursor-pointer flex justify-center px-2 py-1 items-center text-lg drop-shadow-xl duration-200  hover:bg-gray-200">Editar</span>
                <span onClick={handleClick} className="text-white bg-red-500 rounded-full top-4 right-4 cursor-pointer w-10 h-10 flex justify-center items-center text-3xl absolute drop-shadow-xl duration-200 hover:text-red-500 hover:bg-white">X</span>
            </div>} 
            {editor && <video className="fixed z-[99999] w-full inset-0" src="https://desarrollodesitios0.site/crude/tutorial.mp4" autoPlay loop></video>}
        </>
    )
}

export function ItemNotSupported(props: any) {

    return (
        <>
            <a href={'https://desarrollodesitios0.site/2023/newsletters/' + props.path.join('/') + '/' + props.label} download={'https://desarrollodesitios0.site/2023/newsletters/' + props.path.join('/') + '/' + props.label} className={styles} key={props.index}>
                <svg className={iconStyles} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 20V4C2 3.44772 2.44772 3 3 3H8.44792C8.79153 3 9.11108 3.17641 9.29416 3.46719L10.5947 5.53281C10.7778 5.82359 11.0974 6 11.441 6H21C21.5523 6 22 6.44772 22 7V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20Z" />
                    <path d="M10.1833 11.5697C10.2383 11.1301 10.4368 10.7209 10.7481 10.4056C11.0594 10.0903 11.466 9.8865 11.9049 9.82585C12.3438 9.7652 12.7904 9.85107 13.1755 10.0701C13.5607 10.2892 13.8627 10.6292 14.0349 11.0375C14.2071 11.4457 14.2397 11.8994 14.1278 12.3281C14.0159 12.7568 13.7656 13.1365 13.4159 13.4085C13.2977 13.5004 13.1508 13.5782 12.991 13.6411C12.4794 13.8425 12.0212 14.2761 12.0212 14.8259L12.0212 14.9733" />
                    <circle cx="12.0212" cy="17.2707" r="0.91897" fill="#200E32" />
                </svg>
                {props.label}
            </a>
        </>
    )
}

export default ItemFolder