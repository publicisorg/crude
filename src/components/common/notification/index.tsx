export const Notification = () => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
    <div className="flex items-center bg-white/10 rounded-lg p-4">
      <img src="https://cdn.discordapp.com/avatars/707236732369895504/e2195fa6d5a6d46ee8e5e394b033cc6a.webp?size=240" alt="Foto de la persona" className="w-16 h-16 rounded-full"/>
      <div className="ml-4">
        <h2 className="text-white text-lg font-bold">Maximiliano te asigno la tarea:</h2>
        <p className="text-gray-500">Mujeres Emprendedoras - Etapa 2</p>
        <p className="text-gray-400 mt-2">Hace 2 horas</p>
      </div>
      <div className="ml-auto">
        <button className="bg-yellow-500/30 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">Ver tarea</button>
        <button className="bg-green-500/30 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2">Empezar tarea</button>
      </div>
    </div>
    </div>
  )
}
