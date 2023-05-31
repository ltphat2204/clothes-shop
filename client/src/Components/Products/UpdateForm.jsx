import { useEffect, useState, useContext } from "react";
import Input from "../Input/Input";
import Loading from "../Loading/Loading";
import { UserContext } from "../../Context/UserContext";

export default function UpdateForm({ id, onClose, onSuccess }){
    const [quantity, setQuantity] = useState(0);
    const [error, setError] = useState(null);
    const { user } = useContext(UserContext);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        fetch(`${process.env.REACT_APP_API}/products/${id}`)
        .then(res => res.json())
        .then(data => {setQuantity(data.quantity); setLoading(false);})
    }, [id]);

    const handleSubmit = e => {
        e.preventDefault();

        if (quantity < 0){
            setError("Giá tiền không thể âm");
        } else {
            setLoading(true);
            onSuccess(false);
            const formData = new FormData();
            formData.append("quantity", quantity);

            fetch(`${process.env.REACT_APP_API}/products/${id}`, {
                method: "PUT",
                headers: {
                    "Authorization": "Bearer " + user.id
                },
                body: formData
            }).then(res => res.json())
            .then(data => {setLoading(false); onSuccess(true); onClose();})
        }
    }

    return (
        <div className="form-container">
            {loading && <Loading/>}
            <form className="add-form" onSubmit={handleSubmit}>
                <Input 
                    name="quantity" 
                    title="Số lượng" 
                    type="number"
                    placeholder="Chỉ nhập số"
                    value={quantity}
                    onChange={e=>setQuantity(e.target.value)}
                    require
                />
                {error && <div className="form-error">{error}</div>}
                <div className="action_container">
                    <div onClick={()=>onClose()} className="action-button">Hủy</div>
                    <button type="submit" className="action-button">Thêm</button>
                </div>
            </form>
        </div>
    );
}