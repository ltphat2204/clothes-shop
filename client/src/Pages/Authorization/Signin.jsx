import { useState, useEffect } from "react";
import Input from "../../Components/Input/Input";
import './Authorization.css';
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";
import { useContext } from 'react';
import { UserContext } from '../../Context/UserContext';

export default function Signin(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);

    useEffect(()=>{
        if (user) navigate(-1);
    }, [user]);

    const handleSubmit = e => {
        e.preventDefault();
        setLoading(true);
        if (!password || !username) setError({password: "Vui lòng điền đủ các trường thông tin"});
        else {
            fetch(`${process.env.REACT_APP_API}/authorization/signin`, {
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
                    if (data.field === 'username') setError({username: data.message});
                    if (data.field === 'password') setError({password: data.message});
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
                {error.password && <div className="authorization-error">{error.password}</div>}

                <div className="authorization-action">
                    <button type="submit">Đăng nhập</button>

                    <div className="authorization-hint">
                        Chưa có tài khoản?
                        <Link to='/signup'> Đăng ký ngay</Link>
                    </div>
                </div>
            </form>
        </div>
    );
}