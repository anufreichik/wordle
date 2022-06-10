import React, {useState} from 'react';
import './App.css';
const Cell = ({letter, isCurrentRow, updateWord}) => {
    const [val, setVal] = useState(letter.letterVal)
    const handleChange=(e)=>{
        setVal(e.target.value);
        updateWord(e.target.value);
    }
    const getCellStyle=()=>{
       if( letter.letterInWord && letter.rightPosition ) return 'greenCell';
       else if(letter.letterInWord && !letter.rightPosition ) return 'yellowCell';
       else return '';
    }
    return (
        <div className={`cell ${getCellStyle()}`}>
            <input type='text' onChange={(e)=>handleChange(e)} value={val} maxLength={1} disabled={!isCurrentRow}/>
        </div>
    );
};

export default Cell;