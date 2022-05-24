import { useState, useEffect } from 'react'

function App() {
  // Declare a new state variable, which we'll call "count"
  // const structureCalc = 

  const baseCalculationObj = {
    name:'',
    letters:{
    'ؤ':0,'ة':0,'ى':0,'ء':0,'ا':0,'أ':0,'ب':0,
    'ت':0,'ث':0,'ج':0,'ح':0,'خ':0,'د':0,'ذ':0,
    'ر':0,'ز':0,'س':0,'ش':0,'ص':0,'ض':0,'ط':0,
    'ظ':0,'ع':0,'غ':0,'ف':0,'ق':0,'ك':0,'ل':0,
    'م':0,'ن':0,'ه':0,'و':0,'ي':0,' ':0
  }}
  let letterVal = {
    "الصغير":{
      letters:{
      'ؤ':4,'ة':7,'ى':6,'ء':1,'ا':2,'أ':3,
      'ب':7,'ت':8,'ث':9,'ج':1,'ح':1,'خ':1,
      'د':1,'ذ':1,'ر':18,'ز':1,'س':1,'ش':1,
      'ص':1,'ض':2,'ط':2,'ظ':2,'ع':26,'غ':2,
      'ف':2,'ق':2,'ك':2,'ل':2,'م':2,'ن':3,
      'ه':3,'و':3,'ي':3,' ':0}
    },
    "الكبير":{
      letters:{
      'ؤ':9,'ة':7,'ى':6,'ء':1,'ا':2,'أ':3,
      'ب':3,'ت':8,'ث':9,'ج':1,'ح':1,'خ':1,
      'د':6,'ذ':20,'ر':11,'ز':7,'س':1,'ش':1,
      'ص':9,'ض':2,'ط':25,'ظ':2,'ع':2,'غ':2,
      'ف':2,'ق':2,'ك':2,'ل':2,'م':2,'ن':3,
      'ه':3,'و':3,'ي':3,' ':0}
    }
  }

  const [count, setCount] = useState(0);
  const [letterValues, setLetterValues] = useState(letterVal);
  const [word, setWord] = useState('');
  const [method, setMethod] = useState(Object.keys(letterValues)[0]);
  // const [words, setWords] = useState([]);
  const [showNewCalcInputsFlag, setShowNewCalcInputsFlag] = useState(false);
  const [newCalcObj, setNewCalcObj] = useState(baseCalculationObj);
  const [newCalcName, setNewCalcName] = useState('');

  let lv = JSON.parse(localStorage.getItem('letterValues'));
  if(!lv){
    localStorage.setItem('letterValues', JSON.stringify(letterVal));
    lv = letterVal;
  }
  if(letterValues == letterVal){
    setLetterValues(lv)
  }else{
    localStorage.setItem('letterValues', JSON.stringify(letterValues));
  }
  useEffect(() => {
    calcWord();
    
  });
  
  const arabicLetters = ['ؤ','ة','ى','ء','ا','أ','ب','ت','ث','ج','ح',
  'خ','د','ذ','ر','ز','س','ش','ص','ض','ط',
  'ظ','ع','غ','ف','ق','ك','ل','م','ن','ه','و','ي']

  const letterValueTable = method != '' ? <div  className='w3-row' > {
    Object.keys(letterValues).map((name) => { 
      const {letters} = letterValues[name];
      if(name == method){
        console.log("letters=",letters);
        return Object.keys(letters).map((letter) => {
          return <div className='w3-col m2 w3-light-grey w3-center w3-border' key={letter}>{letter} : {letters[letter]}</div>
        })
      }
    })
      
      }
      </div> : ''

  function calcWord(m){
    let val = 0;
    word.split('').forEach((letter) => {
      const {letters} = letterValues[method];
      if (!isNaN(letters[letter])) {
        val+=letters[letter]
      }
    });
    setCount(val);
  }

  const newCalc = <div className="w3-row"> {arabicLetters.map( arabicLetter => {

                  return  <div className="w3-col m2 w3-light-grey w3-center w3-border" key={arabicLetter} style={{"width":"70px"}}>
                            <label>{arabicLetter}</label>
                            <input className="w3-input w3-border" value={newCalcObj.letters[arabicLetter]} onChange={(event) => {
                                        let updatedValue = structuredClone(newCalcObj);
                                        updatedValue.letters[arabicLetter] = event.target.value;
                                        setNewCalcObj(updatedValue);
                            }} type="text" placeholder={newCalcObj.letters[arabicLetter]}/>
                          </div>
                          })
                        }
                        <input className='w3-input w3-border' value={newCalcName} type="text" placeholder='اسم الحساب الجديد' 
                        onChange={(event) => {
                          let updatedValue = structuredClone(newCalcObj);
                          updatedValue.name = event.target.value;
                          setNewCalcObj(updatedValue);
                          setNewCalcName(event.target.value)}
                          }/>
      <button  onClick={() =>{
        let updatedValue = structuredClone(letterValues);
        updatedValue[newCalcObj.name] = {letters:{}};
        updatedValue[newCalcObj.name].letters = structuredClone(newCalcObj.letters)
        setLetterValues(updatedValue);
        setNewCalcObj(baseCalculationObj);
        setShowNewCalcInputsFlag(false);
      }}>
       أضف هذا الحساب
      </button>
                        </div>
                  
  const showNewCalcInputsJSX = showNewCalcInputsFlag? <div style={{"width":"50%","margin":"0px 0px 10px 50px"}}>{newCalc}</div> : ''

  return (
    <div>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"></link>
      <div></div>
      <input style={{"width":"50%","margin":"50px 0px 20px 50px"}} className='w3-input w3-border' value={word} type="text" onChange={(event) => setWord(event.target.value)}/>
      <div></div>
      <button style={{"width":"50%","margin":"0px 0px 10px 50px"}} onClick={calcWord}>
       احسب الجملة
      </button>
      <div></div>
      <div style={{"width":"50%","margin":"0px 0px 10px 50px"}}>قيمة الجملة: {count}</div>
      <select 
        style={{"width":"50%","margin":"0px 0px 0px 50px"}} 
        className="w3-select"
        multiple={false} 
        value={method} 
        onChange={(event) => setMethod(event.target.value)}>
            { Object.keys(letterValues).map((name) => {
              return <option key={name} value={name}>{name}</option>
            })}
      </select>
      <div></div>
      <div style={{"width":"50%","margin":"10px 0px 10px 50px"}}>{method}</div>
      <div style={{"width":"50%","margin":"0px 0px 10px 50px"}}>{letterValueTable}</div>
      
      <button style={{"width":"50%","margin":"0px 0px 10px 50px"}} onClick={() => setShowNewCalcInputsFlag(!showNewCalcInputsFlag)}>
       أضف حساب جديد
      </button>
      {showNewCalcInputsJSX}
      
    </div>
  );
}

export default App;
