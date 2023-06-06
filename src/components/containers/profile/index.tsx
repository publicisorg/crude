import { useEffect, useState } from 'react';
import { supabase } from '../../../supabase/client';
import { CardStatus } from '../../common/Cardstatus';
import { AiOutlineSetting } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import GenericButton from '../../common/buttons';


export const ProfileUsers = (props: any) => {
    const [status, setStatus] = useState('');
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
        } catch (error) {
            console.error('Error al actualizar el estado:', error);
        }
    };

    return (
        <main>
            <div className="container mx-auto p-6">
                <div className='border rounded-lg overflow-hidden pb-6 bg-white/10' style={{borderColor: props.borderColor}}>
                    <div className="card-body">
                    <div className="relative h-48 bg-cover bg-center" style={{ backgroundImage: "url("+props.urlImgPortada+")" }}></div>
                    <div className="flex justify-center mt-[-4rem] relative">
                    <div className='absolute top-3 left-3 z-30'>
                            <Link to="/setting"><AiOutlineSetting className="fill-white/30 w-10 h-10"></AiOutlineSetting></Link>
                            </div>
                        <div className="w-32 h-32 border-4 rounded-full overflow-hidden z-10 shadow-lg" style={{borderColor: props.borderColor}}>
                            <img className="w-full h-full object-cover" src={props.urlImg} alt={props.name} />
                            <span className={props.active ? 'isActive' : 'inactive' + 'absolute z-10 top-0'}></span>
                        </div>
                    </div>
                    <div className="mt-4 text-center">
                        <h2 className='font-bold text-xl'>{props.name} {props.lastName}</h2>
                        <h3>{props.occupation}</h3>
                        <p className='opacity-75'>@{props.userNick}</p>
                    </div>
                    </div>
                </div>
                <div className="card my-4 bg-white/10" style={{borderColor: props.borderColor}}>
                    <textarea value={status} onChange={handleStatusChange} className="w-full h-24 p-2 border rounded-lg resize-none mb-2" placeholder={'¿Qué estás pensando, ' + props.name} style={{borderColor: props.borderColor, backgroundColor: props.secondaryColor}}/>
                    <GenericButton type="button" onClick={handleFormSubmit} label="Compartir estado" borderColor={props.borderColor} secondaryColor={props.secondaryColor}/>
                </div>
                <CardStatus userId={props.userId} name={props.name} userNick={props.userNick} lastName={props.lastName} urlImg={props.urlImg} borderColor={props.borderColor} secondaryColor={props.secondaryColor}/>
                
                </div>
        </main>
    )
}
