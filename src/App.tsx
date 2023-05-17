import { useState } from 'react'
import './App.css'
import SheetData from './components/common/sheetdata/SheetData';
import Table from './components/containers/table'

function App() {

  const [type, setType] = useState("db");

  return (
    <main className="">
      <div className="flex flex-row m-8 gap-8">
        {/*<ButtonToggle actualValue={type} function={setType} arguments={"folders"} label="Carpetas" />*/}
        {/*<ButtonToggle actualValue={type} function={setType} arguments={"db"} label="Base de datos" />*/}
      </div>
      {/*type == "folders" && <Folders />*/}
      {type == "db" && <Table />}
      {type == "sheet" && 
      
      <>
    
      <SheetData></SheetData></> }

   
    </main>
  )
}

export default App
