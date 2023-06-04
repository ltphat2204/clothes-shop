import { useState } from "react";
import Input from "../../../Components/Input/Input";
import Loading from "../../../Components/Loading/Loading";

export default function Signup({onClose}){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);

    const handleSubmit = e => {
        e.preventDefault();
        if (!password || !password2 || !username) setError({password: "Vui lòng điền đủ các trường thông tin"});
        else if (password !== password2) setError({password: "Mật khẩu không trùng khớp"});
        else{
            setLoading(true);

            fetch(`${process.env.REACT_APP_API}/authorization/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({username, password, role: "staff"})
            }).then(res => res.json())
            .then(data => {
                if (data.success){
                    onClose({username, password});
                }else{
                    setError({username: data.message});
                }
                setLoading(false);
            }).catch(err => {
                console.log(err);
                setLoading(false);
            })
        }
    }

    return (
        <div className="form-container">
            {loading && <Loading/>}
            <form className="authorization-form" onSubmit={handleSubmit}>
                <Input value={username} onChange={e => setUsername(e.target.value.slice(0, 64))} name="username" title="Tên đăng nhập:" placeholder="Tên đăng nhập của bạn"/>
                {error.username && <div className="authorization-error">{error.username}</div>}

                <Input type="password" value={password} onChange={e => setPassword(e.target.value)} name="password" title="Mật khẩu:" placeholder="Mật khẩu của bạn"/>
                <Input type="password" value={password2} onChange={e => setPassword2(e.target.value)} name="password2" title="Nhập lại mật khẩu:" placeholder="Nhập lại mật khẩu của bạn"/>
                {error.password && <div className="authorization-error">{error.password}</div>}

                <div className="authorization-action">
                    <button type="submit">Đăng ký</button>
                </div>
            </form>
        </div>
    );
}