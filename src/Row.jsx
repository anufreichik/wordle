import React from 'react';
import Cell from "./Cell";
import './App.css';

const Row = ({guess, isCurrent, updateWord}) => {
    return (
        <div className='row'>
            {
                guess.map((el, ind)=><Cell letter={el} key={ind} isCurrentRow={isCurrent} updateWord={updateWord}/> )
            }
        </div>
    );
};

export default Row;