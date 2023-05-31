import { useState } from "react";
import './TextArea.css';

export default function TextArea({name, title, placeholder, value, onChange, require=false}){
    const maxRow = 5;
    const buffer = 48;

    const [inputRow, setInputRow] = useState(1)

    const calculateRow = data => {
        const breakLine = data.split(/\r*\n/);
    
        let overflowBuffer = 0;
        for (let line of breakLine){
          overflowBuffer += Math.floor(line.length / buffer);
        }
    
        return breakLine.length + overflowBuffer;  
    }

    const handleTyping = e => {
        const data = e.target.value;
        onChange(e);
        setInputRow(Math.min(calculateRow(data), maxRow));
    }

    return (
        <div className="input-wrap">
            <div className="input-label">{`${title} ${require ? '*' : ''}`}</div>
            <textarea 
                id={name} 
                value={value} 
                onChange={handleTyping}
                name={name}
                rows={inputRow} cols={buffer}
                placeholder={placeholder}
            />
        </div>
    );
}