import { Fragment, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from 'yup';
import Loading from '../../../Components/Loading/Loading';
import Input from "../../../Components/Input/Input";
import FileUpload from "../../../Components/FileUpload/FileUpload";
import TextArea from "../../../Components/TextArea/TextArea";
import Dropdown from "../../../Components/Dropdown/Dropdown";
import './AddForm.css';

export default function AddForm({onClose, onSuccessful}){
    const ProductSchema = yup.object().shape({
        name: yup
        .string()
        .min(5, "Tên quá ngắn")
        .max(32, "Tên quá dài")
        .required("Tên bắt buộc phải có nha"),
        description: yup
        .string()
        .min(5, "Mô tả quá ngắn")
        .max(1000, "Cần tóm gọn lại mô tả")
        .required("Mô tả bắt buộc phải có nha"),
        images: yup.mixed().required('Bạn phải cần có ảnh'),
        genre: yup.string(),
        size: yup.array(),
        price: yup.number().min(1, 'Giá tiền không thể âm').typeError('Giá tiền phải là con số'),
        quantity: yup.number().min(1, 'Số lượng không thể âm').typeError('Số lượng phải là con số')
    })

    const formik = useFormik({
        initialValues: {
            name: "",
            description: "",
            images: [],
            genre: "",
            size: [],
            price: 0,
            quantity: 1
        },
        onSubmit: (values) => {
            setLoading(true);

            //Add data to form
            const formData = new FormData();
            formData.append("name", values.name);
            formData.append("description", values.description);
            formData.append("genre", values.genre);
            formData.append("size", values.size);
            formData.append("price", values.price);
            formData.append("quantity", values.quantity);
            for (let i = 0; i < values.images.length; i++) {
                formData.append("images", values.images[i]);
            }

            //Send it
            fetch(`${process.env.REACT_APP_API}/products`, {
                method: "POST",
                body: formData
            }).then(response => {
                setLoading(false);
                if (response.ok) {
                    setTimeout(()=>{
                        onSuccessful();
                        onClose();
                    }, 500)
                } else {
                    console.log("Error occurred while adding product:", response);
                    alert('Failed to add new product');
                }
            }).catch(error => {
                console.log("Error occurred while adding product:", error);
            })
        },
        validationSchema: ProductSchema
    });

    const [listGenre, setListGenre] = useState(null);
    const [listSize, setListSize] = useState(null);
    const [selectedGenre, setGenre] = useState('');
    const [selectedSize, setSize] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(()=>{
        fetch(`${process.env.REACT_APP_API}/genres`)
        .then(response => response.json())
        .then(data => {
            setListGenre(data); 
            formik.setFieldValue('genre', data[0].id);
            setGenre(data[0].name);
        })
        .catch(err => console.log(err))
    }, [])
    
    useEffect(()=>{
        fetch(`${process.env.REACT_APP_API}/sizes`)
        .then(response => response.json())
        .then(data => {
            setListSize(data); 
            formik.setFieldValue('size', data[0].id);
            setSize(data[0].name);
        })
        .catch(err => console.log(err))
    }, [])

    useEffect(()=>{
        setLoading( !listGenre || !listSize);
    }, [listGenre, listSize])

    useEffect(()=>{
        const handleClick = e => {
            if (e.target.className === 'form-container'){
                onClose();
            }
        }
        document.addEventListener('mousedown', handleClick);

        return () => document.removeEventListener('mousedown', handleClick);
    }, [])

    return (
        <div className="form-container">
            <form className="add-form" onSubmit={formik.handleSubmit}>
                <h2 className="form-title">Thêm mới sản phẩm</h2>
                {isLoading ? 
                <Loading/>:
                <Fragment>
                    <Input 
                        name="name" 
                        title="Tên sản phẩm:" 
                        placeholder="Tối đa 32 ký tự" 
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        require
                    />
                    {(formik.touched.name && formik.errors.name) && <div className="form-error">{formik.errors.name}</div>}

                    <TextArea 
                        name="description" 
                        title="Mô tả:" 
                        placeholder="Tối đa 1000 kí tự" 
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        require
                    />
                    {formik.touched.description && formik.errors.description && <div className="form-error">{formik.errors.description}</div>}
                    
                    <Dropdown title="Danh mục sản phẩm:" require value={selectedGenre} setValue={(id, name)=>{formik.setFieldValue('genre', id); setGenre(name)}} lisOption={listGenre}/>

                    <Dropdown multiselect title="Kích thước sản phẩm:" require value={selectedSize} setValue={(id, name)=>{formik.setFieldValue('size', id); setSize(name)}} lisOption={listSize}/>

                    <Input 
                        name="price" 
                        title="Giá tiền:" 
                        placeholder="Giá tiền theo đơn vị chuẩn VNĐ"
                        type="number"
                        value={formik.values.price}
                        onChange={formik.handleChange}
                        require
                    />
                    {(formik.touched.price && formik.errors.price) && <div className="form-error">{formik.errors.price}</div>}

                    <Input 
                        name="quantity" 
                        title="Số lượng:" 
                        placeholder="Chỉ nhập số"
                        type="number"
                        value={formik.values.quantity}
                        onChange={formik.handleChange}
                        require
                    />
                    {(formik.touched.quantity && formik.errors.quantity) && <div className="form-error">{formik.errors.quantity}</div>}

                    <FileUpload name="images" title="Hình ảnh:" require setFiles={file => formik.setFieldValue('images', file)}/>
                    {(formik.touched.images && formik.errors.images) && <div className="form-error">{formik.errors.images}</div>}

                    <div className="action_container">
                        <div onClick={()=>onClose()} className="action-button">Hủy</div>
                        <button type="submit" className="action-button">Thêm</button>
                    </div>
                </Fragment>
                }
            </form>
        </div>
    );
}