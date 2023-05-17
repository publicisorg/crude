import { useState } from 'react'
import './App.css'
import SheetData from './components/common/sheetdata/SheetData';
import Table from './components/containers/table'
import { ButtonToggle } from './components/common/buttons';
import Folders from './components/containers/folders';
import Main from './components/containers/main';

function App() {

  const [type, setType] = useState("sheet");
  const [beta, useBeta] = useState(false);

  const mainBgColors = "bg-neutral-100 dark:bg-neutral-700";
  const textColors = "text-black dark:text-white";

  return (
    <main className={`w-full ${mainBgColors} ${textColors}`}>
      {!beta && <>
        <div className="flex flex-row p-8 gap-8 justify-center items-center">
          {<ButtonToggle actualValue={type} function={() => { useBeta(!beta) }} arguments={"folders"} label="Nuevas funciones (BETA)" />}
          {<ButtonToggle actualValue={type} function={setType} arguments={"folders"} label="Carpetas" />}
          {<ButtonToggle actualValue={type} function={setType} arguments={"db"} label="Base de datos" />}
          {<ButtonToggle actualValue={type} function={setType} arguments={"sheet"} label="Status" />}
        </div>
        {type == "folders" && <Folders />}
        {type == "db" && <Table />}
        {type == "sheet" && <SheetData />}
      </>}
      {beta && <div className={`w-full ${mainBgColors} ${textColors}`}>
        <Main/>
      </div>}


    </main>
  )
}

export default App
