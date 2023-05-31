import { NavLink } from "react-router-dom";
import './SideTab.css';
import { AiOutlineLineChart } from 'react-icons/ai';
import { BsShop } from 'react-icons/bs';
import { MdManageAccounts } from 'react-icons/md';

export default function SideTab(){
    const activeTab = e => e.isActive ? "tab_button active" : "tab_button";

    return (
        <div id="tab_container">
            <NavLink to="/admin/statistic" className={activeTab}><AiOutlineLineChart/>Thống kê</NavLink>
            <NavLink to="/admin/products" className={activeTab}><BsShop/>Sản phẩm</NavLink>
            <NavLink to="/admin/accounts" className={activeTab}><MdManageAccounts/>Tài khoản</NavLink>
        </div>
    );
}