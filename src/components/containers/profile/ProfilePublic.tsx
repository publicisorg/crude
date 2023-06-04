import { useEffect, useState } from 'react';
import { supabase } from '../../../supabase/client';
import { CardStatus } from '../../common/Cardstatus';
import { useParams } from 'react-router-dom';


export const ProfileUsersPublic = () => {
    const [urlImg, setUrlImg] = useState("");
    const [urlImgPortada, setUrlImgPortada] = useState("");
    const [name, setName] = useState("");
    const [lastname, setLastName] = useState("");
    const [occupation, setOccupation] = useState("");
    const [active, setActive] = useState("");
    const [userId, setUserid] = useState("");
    const [bgColor2, setBgColor] = useState("");
    const [BgsecondaryColor, setBgsecondaryColor] = useState("");
    
    const [borderColor, setborderColor] = useState("");
    const [fontColor, setfontColor] = useState("");


    //const [status, setStatus] = useState("");

    const {userNick} = useParams()


  if (!userNick) {
    return <p>Cargando...</p>;
  }


  async function getTaskById(userNick: any) {
    const data: any = await supabase.from('users').select('*').eq("userNick", userNick);
    return data;
  }
  getTaskById(userNick).then((element: any) => {
    setUrlImg(element.data[0].urlImg);
    setUrlImgPortada(element.data[0].urlImgPortada);
    setName(element.data[0].name);
    setLastName(element.data[0].lastName);
    setOccupation(element.data[0].occupation);
    setActive(element.data[0].active);
    setActive(element.data[0].active);
    //setStatus(element.data[0].status);
    setUserid(element.data[0].uuid);

    setBgColor(element.data[0].bgcolor)
    setBgsecondaryColor(element.data[0].secondaryColor)

    setborderColor(element.data[0].borderColor)
    setfontColor(element.data[0].fontColor)

    
  console.log(element.data[0])
  })
       


    useEffect(() => {
        document.title = "Mi Perfil";
    }, [])

    /*const handleStatusChange = (e: any) => {
        setStatus(e.target.value);
    };

    const handleFormSubmit = async (e: any) => {
        e.preventDefault();

        try {
            await supabase
                .from('statusProfile')
                .insert({ uuid: props.userId, message: status, like: 0, show:true });

            console.log(props.userId);
        } catch (error) {
            console.error('Error al actualizar el estado:', error);
        }
    };*/
    
  
    return (
        <main className="h-screen"  style={{backgroundColor: bgColor2, color: fontColor,borderColor: borderColor}}>

            <div className="container mx-auto p-6 ">
                <div className="relative h-48 bg-cover bg-center" style={{ backgroundImage: "url("+urlImgPortada+")" }}></div>
                <div className="flex justify-center mt-[-4rem] relative">
                    <div className={`w-32 h-32 border-4 border-[`+borderColor+`] rounded-full overflow-hidden z-10`}>
                        <img className="w-full h-full object-cover" src={urlImg} alt={name} />
                        <span className={active ? 'isActive' : 'inactive' + 'absolute z-10 top-0'}></span>
                    </div>
                </div>
                <div className="mt-6 text-center">

                    <h2 className='font-bold text-xl'>{name} {lastname}</h2>
                    <h3> {occupation}</h3>
                    <p className='text-gray-500'>@{userNick}</p>
                </div>

                <CardStatus userId={userId} borderColor={borderColor} BgsecondaryColor={BgsecondaryColor}  name={name} userNick={userNick} lastName={lastname} urlImg={urlImg} />
            </div>
        </main>
    )
}
