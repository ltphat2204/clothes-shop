import { UserContext } from '../../Context/UserContext';
import { useContext, useState } from "react";
import UpdateForm from './UpdateForm';

export default function ProductCard({id, thumbnail, hoverImage, name, price, quantity, onClick, onReload}){
    const { user } = useContext(UserContext);
    const [update, setUpdate] = useState(false);

    return (
        <li className="product-card">
            <div className="product-image" onClick={onClick}>
                <img className="thumbnail" src={thumbnail} alt={name}/>
                <img className="hover" src={hoverImage} alt={name}/>
            </div>
            <div className="product-content" onClick={onClick}>
                <h3 className="product-name">{name}</h3>
                <div className="product-price">{`${price.toLocaleString()} VNĐ`}</div>
                {user !== null && user.role !== "customer" && <div className="product-price">{`Còn ${quantity} sản phẩm`}</div>}
                {user !== null && user.role !== "customer" && <div onClick={()=>setUpdate(true)} className="product-update">Cập nhật số lượng</div>}
            </div>
            {update && <UpdateForm id={id} onClose={()=>setUpdate(false)} onSuccess={onReload}/>}
        </li>
    );
}