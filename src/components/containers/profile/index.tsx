import { useEffect, useState } from 'react';
import { supabase } from '../../../supabase/client';
import { CardStatus } from '../../common/Cardstatus';
import { AiOutlineSetting } from 'react-icons/ai';
import { Link } from 'react-router-dom';


export const ProfileUsers = (props: any) => {
    const [status, setStatus] = useState('');
    const [data, setData] = useState(null);


    useEffect(() => {
        document.title = "Mi Perfil";
    }, [])

    const handleStatusChange = (e: any) => {
        setStatus(e.target.value);
    };

    const handleFormSubmit = async (e: any) => {
        e.preventDefault();

        try {
            await supabase
                .from('statusProfile')
                .insert({ uuid: props.userId, message: status, like: 0, show: true });

            console.log(props.userId);
        } catch (error) {
            console.error('Error al actualizar el estado:', error);
        }
    };






    return (
        <main>






            <div className="container mx-auto p-6 ">
                <div className='card'>
                    <div className="card-body">
                       
                    <div className="relative h-48 bg-cover bg-center" style={{ backgroundImage: "url('https://fotos.perfil.com/2022/07/14/trim/1280/720/ciudad-de-buenos-aires-1386884.jpg')" }}></div>
                    
                    <div className="flex justify-center mt-[-4rem] relative">
                    <div className='absolute top-3 left-3 z-30'>
                            <Link to="/setting"><AiOutlineSetting className="fill-white/30 w-14 h-14"></AiOutlineSetting></Link>
                            </div>
                        <div className="w-32 h-32 border-4 border-white rounded-full overflow-hidden z-10">
                            <img className="w-full h-full object-cover" src={props.urlImg} alt={props.name} />
                            <span className={props.active ? 'isActive' : 'inactive' + 'absolute z-10 top-0'}></span>
                        </div>
                    </div>
                    <div className="mt-6 text-center">

                        <h2 className='font-bold text-xl'>{props.name} {props.lastName}</h2>
                        <h3> {props.occupation}</h3>
                        <p className='text-gray-500'>@{props.userNick}</p>
                    </div>
                    </div>
                </div>


                <div className="card mt-6">
                    <textarea value={status} onChange={handleStatusChange} className="w-full h-24 p-2 border border-gray-300 rounded resize-none text-black" placeholder={'¿Qué estás pensando, ' + props.name} />


                    <button
                        type="button"
                        className="mt-4 py-2 px-3 text-sm font-medium   focus:outline-none bg-white/10 rounded-lg border border-gray-200/10 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-white/10/10 dark:  dark:border-gray-600/10 dark:hover:  dark:hover:bg-gray-700"
                        onClick={handleFormSubmit}
                    >
                        Compartir estado
                    </button>

                </div>
                <CardStatus userId={props.userId} name={props.name} userNick={props.userNick} lastName={props.lastname} urlImg={props.urlImg} />
                
                </div>
        </main>
    )
}
