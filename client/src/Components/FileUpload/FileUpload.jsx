import React, { useState } from 'react';
import './FileUpload.css';

export default function FileUpload({ name, title, setFiles, require = false }) {
    const [previews, setPreviews] = useState([]);

    const handleFileChange = (event) => {
        const fileList = event.target.files;
        const newPreviews = [];

        for (let i = 0; i < fileList.length; i++) {
            const file = fileList[i];
            const reader = new FileReader();

            reader.onloadend = () => {
                newPreviews.push(reader.result);

                if (newPreviews.length === fileList.length) {
                    setPreviews(newPreviews);
                    setFiles(fileList);
                }
            };

            reader.readAsDataURL(file);
        }
    };

    return (
        <div className='input-wrap'>
            <div className="input-label">{`${title} ${require ? '*' : ''}`}</div>
            <label className='file-button' htmlFor={name}>
                {previews.length > 0 ? 'Đổi ảnh' : 'Thêm ảnh'}
            </label>
            <input
                type="file"
                id={name}
                accept=".png, .jpeg, .jpg"
                style={{ display: 'none' }}
                multiple
                onChange={handleFileChange}
            />
            {previews.length > 0 && (
                <div className='preview-wrap'>
                    {previews.map((preview, index) => (
                        <img key={index} src={preview} alt={`Preview ${index}`} />
                    ))}
                </div>
            )}
        </div>
    );
}
