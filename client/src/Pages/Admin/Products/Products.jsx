import { Fragment } from "react";
import './Products.css';
import { RiAddCircleLine } from 'react-icons/ri';
import AddForm from "./AddForm";
import { useState, useEffect } from "react";
import ListProducts from "../../../Components/Products/ListProducts";
import Loading from "../../../Components/Loading/Loading";

export default function Products(){
    const [addOpen, setAddOpen] = useState(false);
    const [products, setProducts] = useState(null);
    const [shouldReload, setShouldReload] = useState(true);

    useEffect(()=>{
        if (shouldReload){
            fetch(`${process.env.REACT_APP_API}/products`)
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(err => console.log(err));
        }else{
            setProducts(null);
        }
    }, [shouldReload])

    const refresh = () => {
        fetch(`${process.env.REACT_APP_API}/products${products ? '?offset=' + products.length : ''}`)
        .then(response => response.json())
        .then(data => setProducts([...products, ...data]))
        .catch(err => console.log(err));
    }

    if (products === null) return <Loading/>;

    return (
        <Fragment>
            <div className="action_container">
                <div onClick={()=>setAddOpen(true)} className="action-button"><RiAddCircleLine/>Thêm mẫu</div>
            </div>
            <section id="products">
                <ListProducts list={products} onReload={setShouldReload}/>
            </section>
            {addOpen && <AddForm onClose={()=>setAddOpen(false)} onSuccessful={refresh}/>}
        </Fragment>
    );
}