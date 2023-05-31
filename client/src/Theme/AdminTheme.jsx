import { Outlet } from "react-router-dom";
import SideTab from "../Components/SideTab/SideTab";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import AuthorizedOnly from '../Components/AuthorizedOnly';

export default function AdminTheme(){
    const location = useLocation();
    const tab = {
        "statistic": "Thống kê",
        "products": "Sản phẩm",
        "assets": "Hình ảnh",
        "accounts": "Tài khoản"
    }
    const [title, setTitle] = useState('');

    useEffect(() => {
        const path = location.pathname;
        setTitle(tab[path.substring(path.lastIndexOf('/') + 1, path.length)]);
    }, [location,]);

    return (
        <div id="main-container">
            <AuthorizedOnly/>
            <SideTab/>
            <div id="admin-main">
                <h1 className="admin_title">{title}</h1>
                <Outlet/>
            </div>
        </div>
    );
}