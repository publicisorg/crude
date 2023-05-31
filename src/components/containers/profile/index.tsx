import React from 'react'
import { supabase } from '../../../supabase/client'

export const ProfileSettings = (props: any) => {
    return (
        <main>
 
            <div className="grid grid-cols-1 px-4 pt-6 xl:grid-cols-3 xl:gap-4 dark:bg-black">

                <div className="col-span-full xl:col-auto">
                    <div className="p-4 mb-4 bg-white/10 border border-gray-200/10 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700/10 sm:p-6 dark:bg-white/10/10">
                        <div className="items-center sm:flex xl:block 2xl:flex sm:space-x-4 xl:space-x-0 2xl:space-x-4">
                            <img className="mb-4 rounded-lg w-28 h-28 sm:mb-0 xl:mb-4 2xl:mb-0" src={props.urlImg} alt={props.name} />
                            <div>
                                <h3 className="mb-1 text-xl font-bold text-gray-900 dark:text-white">Imagen de perfil</h3>
                                <div className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                                    Ingrese la url de la imagen
                                </div>
                                <div className="flex items-center space-x-4">
                                    <input type="text" name="first-name" id="first-name" className="shadow-sm bg-gray-50/10 border border-gray-00/10 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500/10 focus:border-primary-500/10 block w-full p-2.5 dark:bg-gray-700/10 dark:border-gray-600/10 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="URL de la Imagen" required />



                                    <button type="button" className="py-2 px-3 text-sm font-medium text-gray-900 focus:outline-none bg-white/10 rounded-lg border border-gray-200/10 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-white/10/10 dark:text-gray-400 dark:border-gray-600/10 dark:hover:text-white dark:hover:bg-gray-700">
                                        Actualizar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 mb-4 bg-white/10 border border-gray-200/10 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700/10 sm:p-6 dark:bg-white/10/10">
                        <div className="flow-root">
                            <h3 className="text-xl font-semibold dark:text-white">Personaliza tu perfil</h3>
                            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                                <li className="py-4">
                                    <div className="flex items-center space-x-4">
                                        <div className="flex-shrink-0">

                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 dark:text-white fill-white" viewBox="0 0 24 24" fill="none">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M18.2635 11.646L11.1924 4.57492L9.44588 6.32143L16.5169 13.3925L18.2635 11.646ZM3.41421 12.3531L8.03167 7.73565L15.1027 14.8067L10.4853 19.4242L3.41421 12.3531ZM17.2241 15.5138L19.3941 13.3438L19.4404 13.4385L20.0558 14.6984C19.831 15.6632 19.5913 16.3048 19.3973 16.8243C19.1664 17.4427 19 17.8882 19 18.5C19 19.6734 19.5 20.5 20.5 20.5C21.5 20.5 22 20 22 18.5C22 17.8882 21.8336 17.4427 21.6027 16.8243C21.4522 16.4215 21.2744 15.9453 21.0973 15.3019L21.3332 13.1064C21.4987 11.5654 21.4334 9.99227 20.4314 8.84284C19.9406 8.27981 19.5579 8.06042 19.0274 7.75634L19.0273 7.7563C18.8504 7.65487 18.657 7.54401 18.4376 7.40784C17.4574 6.79921 15.6368 5.54617 11.8306 2.39085C11.4332 2.06139 10.8503 2.08858 10.4853 2.4536L7.32456 5.61433L1.29289 11.646C0.902369 12.0365 0.902369 12.6697 1.29289 13.0602L9.77817 21.5455C10.1687 21.936 10.8019 21.936 11.1924 21.5455L17.2241 15.5138Z" />
                                            </svg>


                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <span className="block text-base font-semibold text-gray-900 truncate dark:text-white">
                                                Color de fondo
                                            </span>
                                            <p className="block text-sm font-normal truncate text-primary-700 hover:underline dark:text-primary-500">
                                                Selecciona el color que quieras que sea tu fondo
                                            </p>
                                        </div>
                                        <div className="inline-flex items-center">
                                            <input type="color" />
                                        </div>
                                    </div>
                                </li>
                                <li className="py-4">
                                    <div className="flex items-center space-x-4">
                                        <div className="flex-shrink-0">

                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 dark:text-white" version="1.1" id="_x32_" viewBox="0 0 512 512" >
                                                <g>
                                                    <path className="fill-white" d="M452.349,174.924c-2.95-11.607-13.402-19.726-25.377-19.726h-34.875c-11.326,0-21.369,7.27-24.892,18.034   l-45.107,137.825l21.184,83.224l19.365-59.17h72.836l18.873,74.142H512L452.349,174.924z M373.354,302.417l27.032-82.607h5.751   l21.028,82.607H373.354z" />
                                                    <path className="fill-white" d="M205.804,65.185h-52.385c-17.012,0-32.097,10.933-37.392,27.108L0,446.815h72.74l36.447-111.374h109.41   l28.35,111.374h86.578L243.929,94.818C239.492,77.385,223.794,65.185,205.804,65.185z M125.257,286.338l40.61-124.094h8.641   l31.588,124.094H125.257z" />
                                                </g>
                                            </svg>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <span className="block text-base font-semibold text-gray-900 truncate dark:text-white">
                                                Color de tipografia
                                            </span>
                                            <a href="#" className="block text-sm font-normal truncate text-primary-700 hover:underline dark:text-primary-500">
                                                Cambia el color de la tipografia
                                            </a>
                                        </div>
                                        <div className="inline-flex items-center">
                                        <input type="color" />

                                        </div>
                                    </div>
                                </li>
                            </ul>
                            <div>
                                <button className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Actualizar</button>
                            </div>
                        </div>
                    </div>
                    <div className="p-4 mb-4 bg-white/10 border border-gray-200/10 rounded-lg shadow-sm  dark:border-gray-700/10 sm:p-6 dark:bg-white/10/10">
                        <div className="items-center sm:flex xl:block 2xl:flex sm:space-x-4 xl:space-x-0 2xl:space-x-4">

                            <div>
                               
                                <div className="flex items-center space-x-4">
                                   

                                    <button onClick={()=> supabase.auth.signOut()} type="button" className="py-2 px-3 text-sm font-medium text-gray-900 focus:outline-none bg-white/10 rounded-lg border border-gray-200/10 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-white/10/10 dark:text-gray-400 dark:border-gray-600/10 dark:hover:text-white dark:hover:bg-gray-700">
                                    Cerrar sesion 
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-2">
                    <div className="p-4 mb-4 bg-white/10 border border-gray-200/10 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700/10 sm:p-6 dark:bg-white/10/10">
                        <h3 className="mb-4 text-xl font-semibold dark:text-white">Información general</h3>
                        <form action="#">
                            <div className="grid grid-cols-6 gap-6">
                                <div className="col-span-6 sm:col-span-3">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
                                    <input type="text" name="first-name" id="first-name" className="shadow-sm bg-gray-50/10 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700/10 dark:border-gray-600/10 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" value={props.name} disabled />
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Apellido</label>
                                    <input type="text" name="last-name" id="last-name" className="shadow-sm bg-gray-50/10 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700/10 dark:border-gray-600/10 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" value={props.lastName} disabled />
                                </div>
                               
                                <div className="col-span-6 sm:col-span-3">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Agencia</label>
                                    <input type="text" name="organization" id="organization" className="shadow-sm bg-gray-50/10 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700/10 dark:border-gray-600/10 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" value="The Pub" disabled />
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Rol</label>
                                    <input type="text" name="role" id="role" className="shadow-sm bg-gray-50/10 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700/10 dark:border-gray-600/10 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" value={props.role} disabled />
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Departamento</label>
                                    <input type="text" name="department" id="department" className="shadow-sm bg-gray-50/10 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700/10 dark:border-gray-600/10 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" value="Development" disabled />
                                </div>
                               
                              
                            </div>
                        </form>
                    </div>
                    <div className="p-4 mb-4 bg-white/10 border border-gray-200/10 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700/10 sm:p-6 dark:bg-white/10/10">
                        <h3 className="mb-4 text-xl font-semibold dark:text-white">Actualizar Password</h3>
                        <form action="#">
                            <div className="grid grid-cols-6 gap-6">
                                <div className="col-span-6 sm:col-span-3">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nueva contraseña</label>
                                    <input type="text" name="current-password" id="current-password" className="shadow-sm bg-gray-50/10 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700/10 dark:border-gray-600/10 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="••••••••" required />
                                </div>
                                
                                <div className="col-span-6 sm:col-span-3">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirmar contraseña</label>
                                    <input type="text" name="confirm-password" id="confirm-password" className="shadow-sm bg-gray-50/10 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700/10 dark:border-gray-600/10 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="••••••••" required />
                                </div>
                                <div className="col-span-6 sm:col-full">
                                    <button className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" type="submit">Actualizar</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    
                </div>

            </div>

        </main>
    )
}
