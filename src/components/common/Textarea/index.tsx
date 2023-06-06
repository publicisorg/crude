import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


export function WysiwygTextarea(props: any) {
  const [value, setValue] = useState('');
  useEffect(() => { props.function(value); }, [value]);
  

  return (
    <div className="w-auto">
      <div className='mb-2 block'>
        <label htmlFor={props.name} className="text-sm font-medium" data-testid="flowbite-label">{props.label}</label>
      </div>
      <div className="flex">
        <div className='relative w-full'>
          <ReactQuill value={value} onChange={setValue} />
        </div>
      </div>
    </div>
  )
}

export default WysiwygTextarea


