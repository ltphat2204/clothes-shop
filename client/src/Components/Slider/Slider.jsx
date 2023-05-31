import { useReducer } from 'react';
import './Slider.css';
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai';

export default function Slider({images}){
    const changeImage = (state, action) => {
        switch (action.type){
            case "LEFT": {
                if (state === 0) return images.length - 1;
                return state - 1;
            }
            case "RIGHT": {
                if (state === images.length - 1) return 0;
                return state + 1;
            }
            case "SET": {
                return action.index;
            }
            default: return state;
        }
    }

    const [selectedIndex, handleIndex] = useReducer(changeImage, 0);

    return (
        <div className="slider-wrap">
            <div className="slider-main">
                <img src={`${process.env.REACT_APP_API}${images[selectedIndex]}`} alt='images'/>
                <div className='slide-button left' onClick={()=>handleIndex({type: "LEFT"})}>
                    <AiFillCaretLeft/>
                </div>
                <div className='slide-button right' onClick={()=>handleIndex({type: "RIGHT"})}>
                    <AiFillCaretRight/>
                </div>
            </div>
            <div className="slider-list">
                {
                    images.map((val, index)=>
                        <img 
                            key={index}
                            className={index === selectedIndex ? "selected" : ""} 
                            src={`${process.env.REACT_APP_API}${val}`} alt={index}
                            onClick={()=>handleIndex({type: "SET", index: index})}
                        />
                    )
                }
            </div>
        </div>
    );
}