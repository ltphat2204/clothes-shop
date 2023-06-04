import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import { BsSearch, BsCart } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im"
import { useState, useContext, useEffect, useRef } from "react";
import { UserContext } from '../../Context/UserContext';
import './Header.css';

export default function Header(){
    const [mobileMenu, setMobileMenu] = useState('');
    const toggleMenu = () => {
        setMobileMenu(mobileMenu ? '' : 'active')
    }

    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const [logoutMenu, setLogoutMenu] = useState(false);

    const signoutRef = useRef(null);
    useEffect(()=>{
        const handleClickOutside = (event) => {
            if (signoutRef.current && !signoutRef.current.contains(event.target)) {
                setLogoutMenu(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [])

    return (
        <header>
            <Link to='/' className="logo_header">Yukirelia</Link>
            <nav className="navigation_container">
                <div className="navigation_wrap">
                    <NavLink to='/products'>Cửa hàng</NavLink>
                    <NavLink to='/'>Về chúng tôi</NavLink>
                    <NavLink to='/'>Liên hệ</NavLink>
                </div>
                <div className="personal_wrap">
                    <Link to='/'>
                        <BsSearch/>
                    </Link>
                    <Link to='/'>
                        <BsCart/>
                    </Link>
                    <span id="user_action" onClick={user ? ()=>setLogoutMenu(!logoutMenu) : ()=>navigate('/signin')}>
                        <FaRegUserCircle/>
                        {logoutMenu && <div ref={signoutRef} onClick={()=>{document.cookie = "user_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; setUser(null); window.location.reload();}} id="signout">Đăng xuất</div>}
                    </span>
                </div>
            </nav>
            <div className="nav_toggle" onClick={toggleMenu}>
                {
                    mobileMenu ?
                    <ImCross/> :
                    <GiHamburgerMenu/>
                }
            </div>
            <nav className={`navigation_mobile ${mobileMenu}`}>
                <div className="navigation_mobile_wrap">
                    <NavLink to='/'>Cửa hàng</NavLink>
                    <NavLink to='/'>Về chúng tôi</NavLink>
                    <NavLink to='/'>Liên hệ</NavLink>
                    {user && <div onClick={()=>{document.cookie = "user_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; setUser(null);  window.location.reload();}} id="signout">Đăng xuất</div>}
                </div>
            </nav>
        </header>
    );
}