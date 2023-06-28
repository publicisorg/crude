import { useEffect } from "react";
import GenericButton from "../../common/buttons"
import { StatusData } from "../../common/profileUser/statusData"
import ActiveUsers from "../../common/profileUser/usersArctives"

function News(props: any) {

    useEffect(() => {
        document.title = "Noticias";
        console.log(props);
    }, [])

    return (
        <div className="ml-80 h-screen relative overflow-y-auto">
            <div className="flex p-8 gap-4">
                <div className="flex flex-col w-3/4 gap-4">
                    <div className="w-full flex flex-col justify-center gap-4 p-4 border h-auto rounded-lg shadow-lg" style={{ borderColor: props.borderColor, backgroundColor: props.cardBg}}>
                        <div className="flex justify-between items-center ">
                            <h2 className="text-xl font-semibold text-white ml-2">Inicio</h2>
                            <a href=""
                                className=" text-2xl font-medium rounded-full text-white hover:bg-blue-800 hover:text-blue-300 float-right">
                                <svg className="m-2 h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                    <g>
                                        <path
                                            d="M22.772 10.506l-5.618-2.192-2.16-6.5c-.102-.307-.39-.514-.712-.514s-.61.207-.712.513l-2.16 6.5-5.62 2.192c-.287.112-.477.39-.477.7s.19.585.478.698l5.62 2.192 2.16 6.5c.102.306.39.513.712.513s.61-.207.712-.513l2.16-6.5 5.62-2.192c.287-.112.477-.39.477-.7s-.19-.585-.478-.697zm-6.49 2.32c-.208.08-.37.25-.44.46l-1.56 4.695-1.56-4.693c-.07-.21-.23-.38-.438-.462l-4.155-1.62 4.154-1.622c.208-.08.37-.25.44-.462l1.56-4.693 1.56 4.694c.07.212.23.382.438.463l4.155 1.62-4.155 1.622zM6.663 3.812h-1.88V2.05c0-.414-.337-.75-.75-.75s-.75.336-.75.75v1.762H1.5c-.414 0-.75.336-.75.75s.336.75.75.75h1.782v1.762c0 .414.336.75.75.75s.75-.336.75-.75V5.312h1.88c.415 0 .75-.336.75-.75s-.335-.75-.75-.75zm2.535 15.622h-1.1v-1.016c0-.414-.335-.75-.75-.75s-.75.336-.75.75v1.016H5.57c-.414 0-.75.336-.75.75s.336.75.75.75H6.6v1.016c0 .414.335.75.75.75s.75-.336.75-.75v-1.016h1.098c.414 0 .75-.336.75-.75s-.336-.75-.75-.75z">
                                        </path>
                                    </g>
                                </svg>
                            </a>
                        </div>
                        <div className="flex flex-col gap-4">
                            <div className="flex gap-4">
                                <img className="ml-2 h-10 w-10 rounded-full"
                                    src={props.urlImg} alt="" />
                                <div className="flex-1 ">
                                    <textarea className="border hover:brightness-150 focus:ring-4 focus:ring-primary-300 rounded-lg px-5 py-2.5 text-left duration-300 font-medium text-lg w-full"
                                        rows={2} cols={50}
                                        style={{ borderColor: props.borderColor, backgroundColor: props.secondaryColor }}
                                        placeholder="Que estas pensando?"></textarea>
                                </div>
                            </div>
                            <div className="flex flex-row justify-between items-center">
                                <div className="w-auto px-2">
                                    <div className="flex items-center">
                                        <svg className="text-center h-7 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                        GIF
                                    </div>
                                </div>
                                <GenericButton label="Publicar" borderColor={props.borderColor} secondaryColor={props.secondaryColor} />
                            </div>
                        </div>
                    </div>
                    <StatusData urlImg={props.urlImg} name={props.name} lastname={props.lastname} userNick={props.userNick} borderColor={props.borderColor} secondaryColor={props.secondaryColor}></StatusData>
                </div>
                <div className="w-1/4 border h-full rounded-lg shadow-lg" style={{ borderColor: props.borderColor, backgroundColor:  props.cardBg  }}>
                    <div className="max-w-full m-4">
                        <div className="flex mb-2">
                            <div className="flex-1">
                                <h2 className="text-xl w-48 font-semibold text-white">Usuarios Activos</h2>
                            </div>
                        </div>
                        <hr className="p-1" style={{ borderColor: props.borderColor }} />
                        <ActiveUsers borderColor={props.borderColor} secondaryColor={props.secondaryColor} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default News
