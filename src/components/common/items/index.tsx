import { useState } from "react";

const styles = "border relative hover:scale-105 flex flex-row gap-4 cursor-pointer justify-start items-center hover:brightness-150 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-xl px-5 py-2.5 text-center duration-300 shadow-lg truncate w-56 aspect-square justify-center";
const iconStyles = "h-32";

export function ItemFolder(props: any) {

    function handleClick() {
        props.enterFolder();
    }

    return (
        <>
            <div onClick={handleClick} className={styles} key={props.index} style={{ borderColor: props.borderColor, backgroundColor: props.secondaryColor }}>
                <svg className={iconStyles} viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.086 5.5l2.457 2.414 0.629 0.586h15.829v18h-28v-21h9.086zM12 3.5h-10c-1.105 0-2 0.896-2 2v21c0 1.105 0.895 2 2 2h28c1.105 0 2-0.895 2-2v-18c0-1.104-0.895-2-2-2h-15z"></path>
                </svg>
                <p className="absolute bottom-4 bg-black/25 py-1 px-4 rounded border" style={{ borderColor: props.borderColor }}>{props.label}</p>
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
            <div onClick={handleClick} className={`${styles} aspect-square justify-center`} key={props.index} style={{ borderColor: props.borderColor, backgroundColor: props.secondaryColor }}>
                <img className="w-48 max-h-48 object-cover" src={'https://desarrollodesitios0.site/2023/newsletters/' + props.path.join('/') + '/' + props.label} />
                <p className="absolute bottom-4 bg-black/25 py-1 px-4 rounded border" style={{ borderColor: props.borderColor }}>Imagen</p>
            </div>
            {show && <div onClick={handleClick} className="z-50 w-full h-screen fixed bg-black/50 flex justify-center items-center inset-0 duration-300">
                <img className="bg-white rounded-xl p-4 border" src={'https://desarrollodesitios0.site/2023/newsletters/' + props.path.join('/') + '/' + props.label} style={{ borderColor: props.borderColor }} />
                <span onClick={handleClick} className="  bg-red-500 rounded-full top-4 right-4 cursor-pointer w-10 h-10 flex justify-center items-center text-3xl absolute drop-shadow-xl duration-200 hover:text-red-500 hover:bg-white">X</span>
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
            <div onClick={handleClick} className={`${styles} aspect-square justify-center`} key={props.index} style={{ borderColor: props.borderColor, backgroundColor: props.secondaryColor }}>
                <iframe className="bg-white rounded-xl pointer-events-none w-48 h-48" scrolling="no" src={'https://desarrollodesitios0.site/2023/newsletters/' + props.path.join('/') + '/' + props.label} />
                <p className="absolute bottom-4 bg-black/25 py-1 px-4 rounded border" style={{ borderColor: props.borderColor }}>HTML</p>
            </div>
            {show && <div onClick={handleClick} className="z-50 w-full h-screen fixed bg-black/50 flex justify-center items-center inset-0 flex-col gap-4 duration-300">
                <iframe className="bg-white rounded-xl p-4 w-2/3 h-4/5 border" src={'https://desarrollodesitios0.site/2023/newsletters/' + props.path.join('/') + '/' + props.label} style={{ borderColor: props.borderColor }} />
                <span onClick={() => openEditor(true)} className={`${styles} aspect-auto`} style={{ borderColor: props.borderColor, backgroundColor: props.secondaryColor }}>Editar</span>
                <span onClick={handleClick} className="bg-red-500 rounded-full top-4 right-4 cursor-pointer w-10 h-10 flex justify-center items-center text-3xl absolute drop-shadow-xl duration-200 hover:text-red-500 hover:bg-white">X</span>
            </div>}
            {editor && <video className="fixed z-[99999] w-full inset-0" src="https://desarrollodesitios0.site/crude/tutorial.mp4" autoPlay loop></video>}
        </>
    )
}

export function ItemNotSupported(props: any) {

    return (
        <>
            <a href={'https://desarrollodesitios0.site/2023/newsletters/' + props.path.join('/') + '/' + props.label} download={'https://desarrollodesitios0.site/2023/newsletters/' + props.path.join('/') + '/' + props.label} className={styles} key={props.index} style={{ borderColor: props.borderColor, backgroundColor: props.secondaryColor }}>
                <svg className={iconStyles} viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path strokeWidth={1.2} d="M12.5 13C12.5 11 14 11.5 14 10C14 9.34375 13.5 8.5 12.5 8.5C11.5 8.5 11 9 10.5 9.5M12.5 16V14.5M5.5 5.5H19.5V19.5H5.5V5.5Z" stroke="#121923" />
                </svg>
                <p className="absolute bottom-4 bg-black/25 py-1 px-4 rounded border" style={{ borderColor: props.borderColor }}>{props.label}</p>
            </a>
        </>
    )
}

export default ItemFolder