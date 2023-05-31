import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Loading from '../../Components/Loading/Loading';
import ListProducts from '../../Components/Products/ListProducts';
import Search from "../../Components/Search/Search";
import Filter from "../../Components/Filter/Filter";

export default function Products(){
    const [params, setParams] = useSearchParams();
    const [products, setProducts] = useState(null);
    const [name, setName] = useState(params.get('name') || '');
    const [filter, setFilter] = useState({
        genre: params.get('genre') || '', 
        price: params.get('price') || '', 
    });
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        setParams({name: name, ...filter});
    }, [name, filter])

    const addQuery = (name, data, url) => {
        if (data) return `${url}&${name}=${data}`;
        return url;
    }

    const initQuery = useCallback(()=>{
        setLoading(true);

        let url = `${process.env.REACT_APP_API}/products?hidden=false`;
        url = addQuery('name', params.get('name'), url);
        url = addQuery('genre', params.get('genre'), url);
        url = addQuery('price', params.get('price'), url);
        url = addQuery('sort', params.get('sort'), url);

        return url
    }, [params])

    const fetchData = useCallback(()=>{
        const url = initQuery();
        return new Promise((res, rej) => {
            fetch(url)
            .then(response => response.json())
            .then(data => res(data))
            .catch(err => rej(err));
        })
    }, [initQuery])

    useEffect(()=>{
        fetchData()
        .then(data => {
            setProducts(data);
            setLoading(false);
        })
        .catch(err => console.log(err));
    }, [fetchData])

    if (loading) return <Loading/>;

    return (
        <div className="content-container">
            <div className="product-filter-wrap">
                <Search onChange={setName} initialValues={name}/>
                <Filter onChange={setFilter} initialValues={filter}/>
            </div>
            <ListProducts list={products}/>
        </div>
    );
}