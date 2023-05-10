//import { useState } from 'react'
import './App.css'
import Table from './components/containers/table'

function App() {

  //const [type, setType] = useState("db");
  const type = 'db';

  return (
    <main className="w-full flex flex-col justify-center items-center inset-0">
      <div className="flex flex-row m-8 gap-8">
        {/*<ButtonToggle actualValue={type} function={setType} arguments={"folders"} label="Carpetas" />*/}
        {/*<ButtonToggle actualValue={type} function={setType} arguments={"db"} label="Base de datos" />*/}
      </div>
      {/*type == "folders" && <Folders />*/}
      {type == "db" && <Table />}
    </main>
  )
}

export default App
