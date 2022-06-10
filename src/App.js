import './App.css';
import {useEffect, useState} from "react";
import Row from "./Row";

function App() {

    //https://api.frontendexpert.io/api/fe/wordle-words
    const API_URL = 'https://api.frontendexpert.io/api/fe/wordle-words';
    const [guesses, setGuesses] = useState(Array(6).fill(Array(5).fill({letterVal:'', rightPosition:false, letterInWord:false})));

    //[{letterVal:'m', rightPosition:true, letterInWord:true},{},{},{},{}]

    const  [currentRow, setCurrentRow] = useState(0);
    const [currentWord, setCurrentWord] = useState([])
    const [final, setFinal] = useState('');

    const updateWord=(letter)=>{
        let newCur = [...currentWord];
        newCur.push(letter);
        setCurrentWord(newCur);
    }

    function handlekeydownEvent(event) {
        const { key, keyCode } = event;
        if (keyCode ===13) {
            if(currentWord.length!==5) return;
            else{
                const newGuesses = [...guesses].map((el,ind)=>{
                    if(ind===currentRow) {
                        let tempArr=[];
                        let isRightPosition=false;
                        let isLetterInWord = false;
                        currentWord.forEach((l,i)=>{

                            isLetterInWord=false;
                            isRightPosition=false;

                            if(final.toUpperCase().includes(l.toUpperCase())){
                                isLetterInWord=true;
                                if(l.toUpperCase()===final[i].toUpperCase()) isRightPosition=true;
                            }
                            tempArr.push({letterVal:l, rightPosition:isRightPosition, letterInWord:isLetterInWord});
                        } )
                        return tempArr;
                    }
                    else {
                        return el;
                    }
                })
                setGuesses(newGuesses);
                setCurrentRow(prev=>prev+1);
                setCurrentWord([]);

            }
        }
    }

    useEffect(()=>{

        window.addEventListener('keydown', handlekeydownEvent);

        return () => {
            window.removeEventListener('keydown', handlekeydownEvent);
        };
    },[currentRow, currentWord]);

    useEffect(() => {

        const fetchWord = async () => {
            const response = await fetch(API_URL);
            const res = await response.json();
            const randomWord = res[Math.floor(Math.random() * res.length)];
            console.log(randomWord);
            setFinal(randomWord);
        }
        fetchWord();
    }, [])
    return (
        <div className='board'>
            {guesses.map((guess, index) => <Row guess={guess} key={index} isCurrent={currentRow===index} updateWord={updateWord}/>)}
        </div>
    );
}

export default App;
