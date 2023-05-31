import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Slider from "../../Components/Slider/Slider";
import Loading from "../../Components/Loading/Loading";
import './Products.css'
import ListProducts from "../../Components/Products/ListProducts";

export default function ProductDetail(){
    const {id} = useParams();
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (product !== null){
            fetch(`${process.env.REACT_APP_API}/products?max=8&genre=${encodeURIComponent(product.genre)}&sort=dateCreated%3Adesc`)
                .then(response => response.json())
                .then(data => setRelatedProducts(data.filter(val => val.id !== id)))
                .catch(err => console.log(err))
        }
    }, [product, id]);

    useEffect(()=>{
        setLoading(true);
        fetch(`${process.env.REACT_APP_API}/products/${id}`)
        .then(response => response.json())
        .then(data => {setProduct(data); setLoading(false);})
        .catch(err => console.log(err));
    }, [id])

    useEffect(()=>{
        const scrollToTop = () => {
            const c = document.documentElement.scrollTop || document.body.scrollTop;
            if (c > 0) {
              window.requestAnimationFrame(scrollToTop);
              window.scrollTo(0, c - c / 8);
            }
        };
        
        setTimeout(()=>{
            scrollToTop();
        }, 500)
    }, [id])

    if (loading || relatedProducts === null) return <Loading/>;

    return (
        <Fragment>
            <div className="content-container product-container">
                <div className="product-images">
                    <Slider images={product.image}/>
                </div>
                <div className="product-information">
                    <h3 className="product-title">{product.name}</h3>
                    <h5 className="product-title">{product.price.toLocaleString()} VNĐ</h5>
                    <div className="product-section product-title">Mô tả</div>
                    <div className="product-description">{product.description}</div>
                    <div className="product-section product-title">Kích cỡ</div>
                    <div style={{marginBottom: 24}}>
                        {product.size.map((val, inx)=><span key={inx} className="product-tag">{val}</span>)}
                    </div>
                    <div className="product-description">Số lượng còn lại: <b>{product.quantity}</b></div>
                    <div className="product-action">Thêm vào giỏ hàng</div>
                </div>
            </div>
            <section id="top-products">
                <h2 className="section-title">Những sản phẩm cùng danh mục</h2>
                <ListProducts list={relatedProducts} />
            </section>
        </Fragment>
    );
}