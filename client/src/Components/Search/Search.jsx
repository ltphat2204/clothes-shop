import { useState } from "react";
import { BiSearchAlt2 } from 'react-icons/bi';
import './Search.css';

export default function Search({onChange, initialValues}){
    const [value, setValue] = useState(initialValues);

    const handleSubmit = e => {
        e.preventDefault();
        onChange(value);
    }

    return (
        <form className="search-wrap" onSubmit={handleSubmit}>
            <input type="text" placeholder="Tìm kiếm những gì bạn muốn..." value={value} onChange={e=>setValue(e.target.value)}/>
            <BiSearchAlt2/>
        </form>
    );
}