import { useState } from 'react'
import './App.css'
import SheetData from './components/common/sheetdata/SheetData';
import Table from './components/containers/table'
import { ButtonToggle } from './components/common/buttons';
import Folders from './components/containers/folders';

function App() {

  const [type, setType] = useState("sheet");

  return (
    <main className="">
      <div className="flex flex-row m-8 gap-8 justify-center items-center">
        {<ButtonToggle actualValue={type} function={setType} arguments={"folders"} label="Carpetas" />}
        {<ButtonToggle actualValue={type} function={setType} arguments={"db"} label="Base de datos" />}
        {<ButtonToggle actualValue={type} function={setType} arguments={"sheet"} label="Status" />}
      </div>
      {type == "folders" && <Folders />}
      {type == "db" && <Table />}
      {type == "sheet" && 
      
      <>
    
      <SheetData></SheetData></> }

   
    </main>
  )
}

export default App
