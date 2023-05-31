import { Fragment, useEffect, useState } from 'react';
import { useFormik } from "formik";
import { FiFilter } from 'react-icons/fi';
import { ImCross } from 'react-icons/im';
import './Filter.css';
import Loading from '../Loading/Loading';
import Dropdown from '../Dropdown/Dropdown';

export default function Filter({onChange, initialValues}){
    const [listGenre, setListGenre] = useState(null);
    const priceRange = [
        {
            id: '', 
            name: 'Mặc định'
        },
        {
            id: '0-200000', 
            name: 'Dưới 200k'
        },
        {
            id: '200000-300000', 
            name: '200k - 300k'
        },
        {
            id: '300000-400000', 
            name: '300k - 400k'
        },
        {
            id: '400000-500000', 
            name: '400k - 500k'
        },
        {
            id: '500000-1000000', 
            name: 'Trên 500k'
        },
    ];
    console.log(initialValues)
    const [open, setOpen] = useState(false);
    const [selectedGenre, setGenre] = useState(
        listGenre !== null && initialValues && initialValues.genre && listGenre.find(elm => elm.id === initialValues.genre) ? 
        listGenre.find(elm => elm.id === initialValues.genre).name : 
        'Mặc định'
    );
    const [selectedPrice, setPrice] = useState(
        initialValues && initialValues.price && priceRange.find(elm => elm.id === initialValues.price) ? 
        priceRange.find(elm => elm.id === initialValues.price).name :
        'Mặc định'
    );
    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            genre: "",
            price: "",
        },
        onSubmit: (values) => {
            onChange({genre: values.genre, price: values.price});
            setOpen(false);
        }
    });

    useEffect(()=>{
        if (open){
            setLoading(true);

            fetch(`${process.env.REACT_APP_API}/genres`)
            .then(response => response.json())
            .then(data => {
                setListGenre([{id: '', name: 'Mặc định'}, ...data]); 
                setLoading(false);
            })
            .catch(err => console.log(err))
        }
    }, [open, ]);

    const handleReset = () => {
        onChange({});
        setOpen(false);
    }

    if (loading) return <Loading/>;

    return (
        <Fragment>
            <div className="filter" onClick={()=>setOpen(true)}>
                <FiFilter/>Lọc
            </div>
            {
                open &&
                <div className={`model-overlay ${open ? 'open' : ''}`}>
                    <form id='filter-form' onSubmit={formik.handleSubmit}>
                        <ImCross id="modal-close" onClick={()=>setOpen(false)}/>
                        <Dropdown title="Danh mục sản phẩm:" require value={selectedGenre} setValue={(id, name)=>{formik.setFieldValue('genre', id); setGenre(name)}} lisOption={listGenre}/>
                        <Dropdown title="Tầm giá sản phẩm:" require value={selectedPrice} setValue={(id, name)=>{formik.setFieldValue('price', id); setPrice(name)}} lisOption={priceRange}/>
                        <div className="action_container">
                            <div onClick={handleReset} className="action-button">Mặc định</div>
                            <button type="submit" className="action-button">Áp dụng</button>
                        </div>
                    </form>
                </div>
            }
        </Fragment>
    );
}