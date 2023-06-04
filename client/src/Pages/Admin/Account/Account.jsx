import { Fragment, useEffect, useState } from "react";
import './Account.css';
import Loading from "../../../Components/Loading/Loading";
import CreateStaff from './CreateStaff';
import { RiAddCircleLine } from 'react-icons/ri';

export default function Account(){
    const [accounts, setAccount] = useState(null);
    const [selected, setSelected] = useState(null);
    const [loading, setLoading] = useState(false);
    const [creating, setCreating] = useState(false);

    useEffect(()=>{
        fetch(`${process.env.REACT_APP_API}/authorization/staff`)
        .then(response => response.json())
        .then(data => setAccount(data))
        .catch(err => console.log(err));
    }, []);

    const convertDate = timestamp => {
        const date = new Date(timestamp);

        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");

        return `${day}/${month}/${year} ${hours}:${minutes}`;
    }

    const handleDelete = e => {
        e.preventDefault();
        setLoading(true);

        fetch(`${process.env.REACT_APP_API}/authorization/staff/${selected._id}`, {method: "DELETE"})
        .then(response => response.json())
        .then(data => {
            setAccount(accounts.filter(account => account._id !== selected._id));
            setSelected(null);
            setLoading(false);
        })
        .catch(err => console.log(err));
    }
    
    if (accounts === null) return <Loading/>;

    return (
        <Fragment>
        <div className="action_container" style={{justifyContent: "flex-start", marginTop: 16}}>
            <div onClick={()=>setCreating(true)} className="action-button"><RiAddCircleLine/>Thêm nhân viên</div>
        </div>
        <table>
            <thead>
                <tr>
                    <th>Tên đăng nhập</th>
                    <th>Ngày tạo</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
            {accounts.length ? accounts.map(acc => <tr key={acc._id}>
                <td>{acc.username}</td>
                <td>{convertDate(acc.createdAt)}</td>
                <td style={{cursor: "pointer"}} onClick={()=>setSelected(acc)}><b>Xóa</b></td>
            </tr>) : <tr></tr>}
            </tbody>
        </table>
        
        {selected &&
            <div className="form-container">
                {loading && <Loading/>}
                <form className="add-form" onSubmit={handleDelete}>
                    <h2>Bạn có chắc muốn xóa tài khoản {selected.username}</h2>
                    <div className="action_container">
                        <div onClick={()=>setSelected(null)} className="action-button">Hủy</div>
                        <button type="submit" className="action-button">Xác nhận</button>
                    </div>
                </form>
            </div>
        }
        {creating && <CreateStaff onClose={account=>{setCreating(false); setAccount([...accounts, {...account, createdAt: new Date()}]);}}/>}
        </Fragment>
    );
}