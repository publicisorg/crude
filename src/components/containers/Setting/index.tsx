import { useEffect, useState } from 'react';
import { supabase } from '../../../supabase/client';
import { AiOutlineBgColors, AiOutlineLine } from 'react-icons/ai';

export const ProfileSettings = (props: any) => {

    const [primaryColor, setPrimaryColor] = useState(props.mainBgColors);
    const [secondaryColor, setSecondaryColor] = useState(props.secondaryColor);
    const [cardBg, setCardBgColor] = useState(props.cardBg);
    const [textColor, setTextColor] = useState(props.textColors);
    const [borderColor, setBorderColor] = useState(props.borderColor);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const buttonStyle = "border hover:brightness-150 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center duration-300";
    const inputStyle = "border hover:brightness-150 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-left w-full duration-300";
    const inputDisabledStyle = "bg-transparent border font-medium rounded-lg text-sm px-5 py-2.5 text-left w-full";
    const inputColorStyle = "border hover:brightness-150 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-1 py-[0.5] text-center duration-300";

    const [imageUrl, setImageUrl] = useState('');
    const [imageUrlPortada, setImageUrlPortada] = useState('');

    useEffect(() => {
        document.title = "Configuracion";
        getColorsFromDB().then((result: any) => {
            if (result.data != undefined) {
                setPrimaryColor(result.data[0].bgcolor);
                setTextColor(result.data[0].fontColor);
                setSecondaryColor(result.data[0].secondaryColor);
                setCardBgColor(result.data[0].cardBg);
                setBorderColor(result.data[0].borderColor);
            }
        })
    }, [])

    async function getColorsFromDB() {
        if (props.userId != "" && props.userId != undefined) {
            const color = await supabase
                .from('users')
                .select("cardBg, bgcolor, secondaryColor, fontColor, borderColor")
                .eq('uuid', props.userId)
            return color;
        } else {
            return false;
        }
    }

    const handleImageUrlChange = (e: any) => {
        setImageUrl(e.target.value);
    };

    const handleImageUrlPortadaChange = (e: any) => {
        setImageUrlPortada(e.target.value);
    };

    const handleFormSubmit = async (e: any) => {
        e.preventDefault();

        try {
            await supabase
                .from('users')
                .update({ urlImg: imageUrl })
                .eq('uuid', props.userId);

            console.log('Imagen de perfil actualizada correctamente');
        } catch (error) {
            console.error('Error al actualizar la imagen de perfil:', error);
        }
    };



    const handleFormSubmitUpdatePortada = async (e: any) => {
        e.preventDefault();

        try {
            await supabase
                .from('users')
                .update({ urlImgPortada: imageUrlPortada })
                .eq('uuid', props.userId);

            console.log('Imagen de portada actualizada correctamente');
        } catch (error) {
            console.error('Error al actualizar la imagen de portada:', error);
        }
    };




    async function handleChangeBg(e: any) {
        e.preventDefault();
        setPrimaryColor(e.target.value);
    }

    async function changeBgColorOnDB(e: any) {
        props.changeBg(e)
        try {
            await supabase
                .from('users')
                .update({ bgcolor: e })
                .eq('uuid', props.userId);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        changeBgColorOnDB(primaryColor);
    }, [primaryColor])

    async function handleChangeText(e: any) {
        e.preventDefault();
        setTextColor(e.target.value);
    }

    async function changeTextColorOnDB(e: any) {
        props.changeText(e)
        try {
            await supabase
                .from('users')
                .update({ fontColor: e })
                .eq('uuid', props.userId);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        changeTextColorOnDB(textColor);
    }, [textColor])
// ______________________ Bg Card
async function handleChangeCardBg(e: any) {
    e.preventDefault();
    setCardBgColor(e.target.value);
}

async function changeCardBgOnDB(e: any) {
    props.changeCardBg(e)
    try {
        await supabase
            .from('users')
            .update({ cardBg: e })
            .eq('uuid', props.userId);
    } catch (error) {
        console.error(error);
    }
}

useEffect(() => {
    changeCardBgOnDB(cardBg);
}, [cardBg])

// ______________________ Bg Secundary
    async function handleChangeSecondary(e: any) {
        e.preventDefault();
        setSecondaryColor(e.target.value);
    }

    async function changeSecondaryColorOnDB(e: any) {
        props.changeSecondary(e)
        try {
            await supabase
                .from('users')
                .update({ secondaryColor: e })
                .eq('uuid', props.userId);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        changeSecondaryColorOnDB(secondaryColor);
    }, [secondaryColor])
// ______________________ Border Color
    async function handleChangeBorder(e: any) {
        e.preventDefault();
        setBorderColor(e.target.value);
    }

    async function changeBorderColorOnDB(e: any) {
        props.changeBorder(e)
        try {
            await supabase
                .from('users')
                .update({ borderColor: e })
                .eq('uuid', props.userId);
        } catch (error) {
            console.error(error);
        }
    }


    useEffect(() => {
        changeBorderColorOnDB(borderColor);
    }, [borderColor])
// ______________________ Sign Out
    const handleCerrarSesion = async () => {
        try {
            await supabase.auth.signOut();
            await supabase
                .from('users')
                .update({ active: 'inactive' })
                .eq('uuid', props.userId);

            console.log('Sesión cerrada y base de datos actualizada correctamente.');
        } catch (error) {
            console.error('Error al cerrar sesión y actualizar la base de datos:', error);
        }
    };


// ______________________ Change Password
    const handleSubmitPassword = async (event: any) => {
        event.preventDefault();

        if (newPassword !== confirmPassword) {
            setError('Las contraseñas no coinciden. Por favor, inténtalo de nuevo.');
            return;
        }

        try {

            const user = supabase.auth.getUser();
            if (await user) {
                const { error } = await supabase.auth.updateUser({
                    password: newPassword
                });
                if (error) {
                    setError(error.message);
                } else {
                    alert('Contraseña actualizada correctamente.');
                }
            }
        } catch (error) {
            console.log('Error al actualizar la contraseña:');
            setError('Error al actualizar la contraseña. Por favor, inténtalo de nuevo.');
        }
    };

    return (
        <main>
            <div className="grid grid-cols-1 p-8 xl:grid-cols-3 xl:gap-4">
                <div className="col-span-full xl:col-auto">
                    <div className="p-4 mb-4  border rounded-lg 2xl:col-span-2 sm:p-6 shadow-lg" style={{ borderColor: borderColor, backgroundColor:  props.cardBg  }}>
                        <div className="items-center sm:flex xl:block 2xl:flex sm:space-x-4 xl:space-x-0 2xl:space-x-4">
                            <img className="mb-4 rounded-lg w-28 h-28 sm:mb-0 xl:mb-4 2xl:mb-0 border" src={props.urlImg} alt={props.name} style={{ borderColor: borderColor, backgroundColor: secondaryColor }} />
                            <div className="w-full">
                                <h3 className="mb-1 text-xl font-bold">Imagen de perfil</h3>
                                <div className="mb-4 text-sm">
                                    Ingrese la url de la imagen
                                </div>
                                <form>
                                    <div className="flex flex-col xl:flex-row justify-center items-start gap-4 w-full">
                                        <input
                                            type="text"
                                            name="url-img"
                                            className={`${inputStyle}`}
                                            placeholder="URL de la Imagen"
                                            required
                                            value={imageUrl}
                                            onChange={handleImageUrlChange}
                                            style={{ borderColor: borderColor, backgroundColor: secondaryColor }}
                                        />
                                        <button
                                            type="button"
                                            className={`${buttonStyle}`}
                                            onClick={handleFormSubmit}
                                            style={{ borderColor: borderColor, backgroundColor: secondaryColor }}
                                        >
                                            Actualizar
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 mb-4 border rounded-lg 2xl:col-span-2 sm:p-6 shadow-lg" style={{ borderColor: borderColor, backgroundColor:  props.cardBg }}>
                        <div className="items-center sm:flex xl:block 2xl:flex sm:space-x-4 xl:space-x-0 2xl:space-x-4">
                            <img className="mb-4 rounded-lg w-28 h-28 sm:mb-0 xl:mb-4 2xl:mb-0 border" src={props.urlImgPortada} alt={props.name} style={{ borderColor: borderColor, backgroundColor: secondaryColor }} />
                            <div className="w-full">
                                <h3 className="mb-1 text-xl font-bold">Imagen de portada</h3>
                                <div className="mb-4 text-sm">
                                    Ingrese la url de la imagen
                                </div>
                                <form>
                                    <div className="flex flex-col xl:flex-row justify-center items-start gap-4 w-full">
                                        <input
                                            type="text"
                                            name="url-img"
                                            className={`${inputStyle}`}
                                            placeholder="URL de la Imagen"
                                            required
                                            value={imageUrlPortada}
                                            onChange={handleImageUrlPortadaChange}
                                            style={{ borderColor: borderColor, backgroundColor: secondaryColor }}
                                        />
                                        <button
                                            type="button"
                                            className={`${buttonStyle}`}
                                            onClick={handleFormSubmitUpdatePortada}
                                            style={{ borderColor: borderColor, backgroundColor: secondaryColor }}
                                        >
                                            Actualizar
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 mb-4 border rounded-lg shadow-lg 2xl:col-span-2 sm:p-6" style={{ borderColor: borderColor, backgroundColor:  props.cardBg }}>
                        <div className="flow-root">
                            <h3 className="text-xl font-semibold">Personaliza tu perfil</h3>
                            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                                <li className="py-4">
                                    <div className="flex items-center space-x-4">
                                        <div className="flex-shrink-0">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 " viewBox="0 0 24 24">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M18.2635 11.646L11.1924 4.57492L9.44588 6.32143L16.5169 13.3925L18.2635 11.646ZM3.41421 12.3531L8.03167 7.73565L15.1027 14.8067L10.4853 19.4242L3.41421 12.3531ZM17.2241 15.5138L19.3941 13.3438L19.4404 13.4385L20.0558 14.6984C19.831 15.6632 19.5913 16.3048 19.3973 16.8243C19.1664 17.4427 19 17.8882 19 18.5C19 19.6734 19.5 20.5 20.5 20.5C21.5 20.5 22 20 22 18.5C22 17.8882 21.8336 17.4427 21.6027 16.8243C21.4522 16.4215 21.2744 15.9453 21.0973 15.3019L21.3332 13.1064C21.4987 11.5654 21.4334 9.99227 20.4314 8.84284C19.9406 8.27981 19.5579 8.06042 19.0274 7.75634L19.0273 7.7563C18.8504 7.65487 18.657 7.54401 18.4376 7.40784C17.4574 6.79921 15.6368 5.54617 11.8306 2.39085C11.4332 2.06139 10.8503 2.08858 10.4853 2.4536L7.32456 5.61433L1.29289 11.646C0.902369 12.0365 0.902369 12.6697 1.29289 13.0602L9.77817 21.5455C10.1687 21.936 10.8019 21.936 11.1924 21.5455L17.2241 15.5138Z" />
                                            </svg>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <span className="block text-base font-semibold   truncate">
                                                Color de fondo
                                            </span>
                                            <p className="block text-sm font-normal truncate text-primary-700 hover:underline dark:text-primary-500">
                                                Selecciona el color que quieras que sea tu fondo
                                            </p>
                                        </div>
                                        <div className="inline-flex items-center">
                                            <input value={primaryColor} type="color" className={`${inputColorStyle}`} onChange={(e) => handleChangeBg(e)} style={{ borderColor: borderColor, backgroundColor: secondaryColor }} />
                                        </div>
                                    </div>
                                </li>
                                <li className="py-4">
                                    <div className="flex items-center space-x-4">
                                        <div className="flex-shrink-0">
                                            <AiOutlineBgColors size={20} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <span className="block text-base font-semibold   truncate">
                                                Color Primario 
                                            </span>
                                            <a href="#" className="block text-sm font-normal truncate text-primary-700 hover:underline dark:text-primary-500">
                                                Cambia el color primario
                                            </a>
                                        </div>
                                        <div className="inline-flex items-center">
                                            <input value={cardBg} type="color" className={`${inputColorStyle}`} onChange={(e) => handleChangeCardBg(e)} style={{ borderColor: borderColor, backgroundColor: secondaryColor }} />
                                        </div>
                                    </div>
                                </li>
                                <li className="py-4">
                                    <div className="flex items-center space-x-4">
                                        <div className="flex-shrink-0">
                                            <AiOutlineBgColors size={20} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <span className="block text-base font-semibold   truncate">
                                                Color secundario
                                            </span>
                                            <a href="#" className="block text-sm font-normal truncate text-primary-700 hover:underline dark:text-primary-500">
                                                Cambia el color secundario
                                            </a>
                                        </div>
                                        <div className="inline-flex items-center">
                                            <input value={secondaryColor} type="color" className={`${inputColorStyle}`} onChange={(e) => handleChangeSecondary(e)} style={{ borderColor: borderColor, backgroundColor: secondaryColor }} />
                                        </div>
                                    </div>
                                </li>
                                <li className="py-4">
                                    <div className="flex items-center space-x-4">
                                        <div className="flex-shrink-0">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" version="1.1" id="_x32_" viewBox="0 0 512 512" >
                                                <g>
                                                    <path className="" d="M452.349,174.924c-2.95-11.607-13.402-19.726-25.377-19.726h-34.875c-11.326,0-21.369,7.27-24.892,18.034   l-45.107,137.825l21.184,83.224l19.365-59.17h72.836l18.873,74.142H512L452.349,174.924z M373.354,302.417l27.032-82.607h5.751   l21.028,82.607H373.354z" />
                                                    <path className="" d="M205.804,65.185h-52.385c-17.012,0-32.097,10.933-37.392,27.108L0,446.815h72.74l36.447-111.374h109.41   l28.35,111.374h86.578L243.929,94.818C239.492,77.385,223.794,65.185,205.804,65.185z M125.257,286.338l40.61-124.094h8.641   l31.588,124.094H125.257z" />
                                                </g>
                                            </svg>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <span className="block text-base font-semibold   truncate">
                                                Color de tipografia
                                            </span>
                                            <a href="#" className="block text-sm font-normal truncate text-primary-700 hover:underline dark:text-primary-500">
                                                Cambia el color de la tipografia
                                            </a>
                                        </div>
                                        <div className="inline-flex items-center">
                                            <input value={textColor} type="color" className={`${inputColorStyle}`} onChange={(e) => handleChangeText(e)} style={{ borderColor: borderColor, backgroundColor: secondaryColor }} />
                                        </div>
                                    </div>
                                </li>
                                <li className="py-4">
                                    <div className="flex items-center space-x-4">
                                        <div className="flex-shrink-0">
                                            <AiOutlineLine size={20} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <span className="block text-base font-semibold   truncate">
                                                Color de los bordes
                                            </span>
                                            <a href="#" className="block text-sm font-normal truncate text-primary-700 hover:underline dark:text-primary-500">
                                                Cambia el color de los bordes
                                            </a>
                                        </div>
                                        <div className="inline-flex items-center">
                                            <input value={borderColor} type="color" className={`${inputColorStyle}`} onChange={(e) => handleChangeBorder(e)} style={{ borderColor: borderColor, backgroundColor: secondaryColor }} />
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="p-4 mb-4 border rounded-lg shadow-lg sm:p-6" style={{ borderColor: borderColor, backgroundColor:  props.cardBg }}>
                        <div className="items-center sm:flex xl:block 2xl:flex sm:space-x-4 xl:space-x-0 2xl:space-x-4">
                            <div>
                                <div className="flex items-center space-x-4">
                                    <button
                                        type="button"
                                        className={`${buttonStyle}`}
                                        style={{ borderColor: borderColor, backgroundColor: secondaryColor }}
                                        onClick={handleCerrarSesion}
                                    >
                                        Cerrar sesión
                                    </button>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-2">
                    <div className="p-4 mb-4  border rounded-lg shadow-lg 2xl:col-span-2 sm:p-6" style={{ borderColor: borderColor, backgroundColor: props.cardBg }}>
                        <h3 className="mb-4 text-xl font-semibold">Información general</h3>
                        <form action="#">
                            <div className="grid grid-cols-6 gap-6">
                                <div className="col-span-6 sm:col-span-3">
                                    <label className="block mb-2 text-sm font-medium">Nombre</label>
                                    <input type="text" name="first-name" id="first-name" className={`${inputDisabledStyle}`} value={props.name} disabled style={{ borderColor: borderColor, backgroundColor: secondaryColor }} />
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label className="block mb-2 text-sm font-medium">Apellido</label>
                                    <input type="text" name="last-name" id="last-name" className={`${inputDisabledStyle}`} value={props.lastName} disabled style={{ borderColor: borderColor, backgroundColor: secondaryColor }} />
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label className="block mb-2 text-sm font-medium">Agencia</label>
                                    <input type="text" name="organization" id="organization" className={`${inputDisabledStyle}`} value="The Pub" disabled style={{ borderColor: borderColor, backgroundColor: secondaryColor }} />
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label className="block mb-2 text-sm font-medium">Rol</label>
                                    <input type="text" name="role" id="role" className={`${inputDisabledStyle}`} value={props.role} disabled style={{ borderColor: borderColor, backgroundColor: secondaryColor }} />
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label className="block mb-2 text-sm font-medium">Departamento</label>
                                    <input type="text" name="department" id="department" className={`${inputDisabledStyle}`} value="Development" disabled style={{ borderColor: borderColor, backgroundColor: secondaryColor }} />
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="p-4 mb-4  border rounded-lg shadow-lg 2xl:col-span-2 sm:p-6" style={{ borderColor: borderColor, backgroundColor: props.cardBg }}>
                        <h3 className="mb-4 text-xl font-semibold">Actualizar Password</h3>
                        <form onSubmit={handleSubmitPassword}>
                            <div className="grid grid-cols-6 gap-6">
                                <div className="col-span-6 sm:col-span-3">
                                    <label className="block mb-2 text-sm font-medium">Nueva contraseña</label>
                                    <input
                                        type="password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        className={`${inputStyle}`}
                                        placeholder="••••••••"
                                        required
                                        style={{ borderColor: borderColor, backgroundColor: secondaryColor }}
                                    />
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label className="block mb-2 text-sm font-medium">Confirmar contraseña</label>
                                    <input
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className={`${inputStyle}`}
                                        placeholder="••••••••"
                                        required
                                        style={{ borderColor: borderColor, backgroundColor: secondaryColor }}
                                    />
                                </div>

                                <div className="col-span-6 sm:col-full">
                                    <button className={`${buttonStyle}`} style={{ borderColor: borderColor, backgroundColor: secondaryColor }}>
                                        Actualizar
                                    </button>
                                </div>
                            </div>

                            {error && <p>{error}</p>}
                        </form>
                    </div>

                </div>

            </div>

        </main>
    )
}
