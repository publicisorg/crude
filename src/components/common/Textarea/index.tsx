import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
interface WysiwygTextareaProps extends React.HTMLProps<HTMLDivElement> {
    id?: string;
    name?: string;
    onChange: (value: string) => void;
  }

  const WysiwygTextarea = ({ id, name, ...rest }: WysiwygTextareaProps) => {
    const [content, setContent] = useState('');
  
    const handleTextareaChange = (value:any) => {
      setContent(value);
    };
  
    return (
      <div  {...rest}>
        <ReactQuill value={content} onChange={handleTextareaChange}  />
        <input type="hidden" id={id} name={name} value={content} />
      </div>
    );
  };

export default WysiwygTextarea;
