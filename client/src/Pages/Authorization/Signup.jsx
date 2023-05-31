import { useEffect, useState } from "react";
import Input from "../../Components/Input/Input";
import './Authorization.css';
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";
import { useContext } from 'react';
import { UserContext } from '../../Context/UserContext';

export default function Signup(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);

    useEffect(()=>{
        if (user) navigate(-1);
    }, [user]);

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
                body: JSON.stringify({username, password})
            }).then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.success){
                    setUser(data.user);
                    document.cookie = "user_id=" + data.accessToken;
                    navigate(-1);
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
        <div className="authorization-background">
            {loading && <Loading/>}
            <form className="authorization-form" onSubmit={handleSubmit}>
                <Input value={username} onChange={e => setUsername(e.target.value.slice(0, 64))} name="username" title="Tên đăng nhập:" placeholder="Tên đăng nhập của bạn"/>
                {error.username && <div className="authorization-error">{error.username}</div>}

                <Input type="password" value={password} onChange={e => setPassword(e.target.value)} name="password" title="Mật khẩu:" placeholder="Mật khẩu của bạn"/>
                <Input type="password" value={password2} onChange={e => setPassword2(e.target.value)} name="password2" title="Nhập lại mật khẩu:" placeholder="Nhập lại mật khẩu của bạn"/>
                {error.password && <div className="authorization-error">{error.password}</div>}

                <div className="authorization-action">
                    <button type="submit">Đăng ký</button>

                    <div className="authorization-hint">
                        Đã có tài khoản?
                        <Link to='/signin'> Đăng nhập ngay</Link>
                    </div>
                </div>
            </form>
        </div>
    );
}