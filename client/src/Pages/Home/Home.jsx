import { Fragment, useEffect, useState } from "react";
import Loading from "../../Components/Loading/Loading";
import ListProducts from "../../Components/Products/ListProducts";
import Map from "../../Components/Map/Map";
import { useLoadScript } from "@react-google-maps/api";
import './Home.css';

export default function Home() {
    const [products, setProducts] = useState(null);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API}/products?max=8&sort=dateCreated%3Adesc`)
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(err => console.log(err))
    }, []);

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GG_API
    })
    if (products === null || !isLoaded) return <Loading />;

    return (
        <Fragment>
            <section id="banner">
                <img
                    width="1920"
                    height="988"
                    src="https://levents.asia/wp-content/uploads/2023/03/1920x760-1920x988.png"
                    alt=""
                    loading="lazy"
                />
                <img
                    id="banner_mobile"
                    width="912"
                    height="1368"
                    src="https://levents.asia/wp-content/uploads/2023/03/456x684-1.png"
                    alt="" loading="lazy"
                    srcSet="https://levents.asia/wp-content/uploads/2023/03/456x684-1.png 912w, https://levents.asia/wp-content/uploads/2023/03/456x684-1-200x300.png 200w, https://levents.asia/wp-content/uploads/2023/03/456x684-1-683x1024.png 683w, https://levents.asia/wp-content/uploads/2023/03/456x684-1-768x1152.png 768w, https://levents.asia/wp-content/uploads/2023/03/456x684-1-666x999.png 666w, https://levents.asia/wp-content/uploads/2023/03/456x684-1-213x320.png 213w, https://levents.asia/wp-content/uploads/2023/03/456x684-1-67x100.png 67w, https://levents.asia/wp-content/uploads/2023/03/456x684-1-850x1275.png 850w"
                    sizes="(max-width: 912px) 100vw, 912px"
                />
            </section>
            <section id="top-products">
                <h2 className="section-title">Những sản phẩm mới nhất của nhà Yukirelia</h2>
                <ListProducts list={products} />
            </section>
            <section id="location">
                <h2 className="section-title">Nơi hoạt động của chúng mình</h2>
                <Map />
            </section>
        </Fragment>
    );
}