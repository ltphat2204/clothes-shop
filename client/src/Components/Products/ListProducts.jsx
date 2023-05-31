import ProductCard from "./ProductCard";
import './Products.css';
import { useNavigate } from "react-router-dom";
import { UserContext } from '../../Context/UserContext';
import { useContext } from "react";

export default function ListProducts({list, onReload}){
    const { user } = useContext(UserContext);

    const navigate = useNavigate();
    
    if (list.length === 0) return (
        <div className="notice">
            Chúng tôi hiện chưa có sản phẩm bạn cần tìm, xin lỗi vì sự bất tiện này.
        </div>
    );

    return (
        <ul className="products-container">
            {
                list.map(val=>
                    <ProductCard 
                        id={val.id}
                        quantity={val.quantity}
                        key={Math.floor(Math.random() * 987654321)}
                        thumbnail={`${process.env.REACT_APP_API}${val.image[0]}`}
                        hoverImage={`${process.env.REACT_APP_API}${val.image[1]}`}
                        name={val.name}
                        price={val.price}
                        onClick={() => {
                            if(user === null || user.role !== "admin") navigate(`/products/${val.id}`);
                        }}
                        onReload={onReload}
                    />
                )
            }
        </ul>
    );
}