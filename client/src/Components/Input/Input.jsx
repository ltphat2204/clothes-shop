import './Input.css';

export default function Input({name, title, placeholder, value, onChange, type="text", require=false}){
    return (
        <div className="input-wrap">
            <div className="input-label">{`${title} ${require ? '*' : ''}`}</div>
            <input type={type} name={name} id={name} onChange={onChange} placeholder={placeholder} value={value}/>
        </div>
    );
}