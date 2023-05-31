import  {useState} from 'react'

function Image (props: any) {
    const [isActive, setIsActive] = useState(false);
    const handleClick = () => {
      setIsActive(!isActive);
    };

    
    return (
        <>
            <img src={props.Imagen} width={150} alt="" onClick={handleClick} />
            {isActive && <div className='fixed top-0 left-0 bg-black/70 w-full h-full flex justify-center items-center z-30'  onClick={handleClick} >
                <div className='relative'>
                    <span className='absolute -right-10 -top-10 text-xl  rounded-full w-6 h-6   flex justify-center items-center' >
                        <svg xmlns="http://www.w3.org/2000/svg"  className='w-7 h-7' viewBox="0 0 2.33333 2.33333">

                            <g id="Layer_x0020_1">
                                <metadata id="CorelCorpID_0Corel-Layer" />
                                <path className="fill-white" d="M1.78195 2.01984c-0.0637795,0 -0.123575,-0.0246772 -0.168386,-0.0695l-0.446902 -0.44687 -0.446886 0.446886c-0.0448268,0.0448307 -0.104626,0.0695 -0.168406,0.0695 -0.0637795,0 -0.123591,-0.0246772 -0.168402,-0.0695 -0.0928465,-0.0928583 -0.0928465,-0.243941 0,-0.336803l0.446902 -0.446886 -0.446902 -0.446886c-0.044811,-0.0448268 -0.0695,-0.104634 -0.0695,-0.168402 0,-0.0637717 0.024689,-0.123575 0.0695,-0.168402 0.044811,-0.044815 0.104622,-0.0695 0.168386,-0.0695 0.0637795,0 0.123594,0.024685 0.168406,0.0695l0.446902 0.446886 0.446894 -0.446886c0.044811,-0.044815 0.10461,-0.0695 0.168406,-0.0695 0.0637795,0 0.123575,0.024685 0.168386,0.0695 0.0928622,0.0928583 0.0928622,0.243933 0,0.336787l-0.446882 0.446902 0.446886 0.446886c0.0928622,0.0928622 0.0928622,0.243945 0,0.336803 -0.0448268,0.044815 -0.104638,0.0694843 -0.168402,0.0694843z" />
                            </g>
                        </svg>
                    </span>
                    <img src={props.Imagen} alt="" />
                </div>

            </div>}
        </>
    )
}
export default Image