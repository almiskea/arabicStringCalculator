import { useState, useEffect } from 'react'

function App() {
  // Declare a new state variable, which we'll call "count"
  // const structureCalc = 

  const baseCalculationObj = {
    name:'',
    letters:{
      'ء':1,'ا':1,'أ':1,'ئ':1,'ى':1,
      'ب':2,
      'ج':1,
      'د':6,
      'ه':3,
      'ؤ':9 ,'و':3,
      'ز':7,
      'ح':1,
      'ط':25,
      'ي':3,
      'ك':2,
      'ل':2,
      'م':2,
      'ن':3,
      'س':1,
      'ع':2,
      'ف':2,
      'ص':9,
      'ق':2,
      'ر':11,
      'ش':1,
      'ة':7,'ت':8,
      'ث':9,
      'خ':1,
      'ذ':20,
      'ض':2,
      'ظ':2,
      'غ':2,
      ' ':0}
    }
  let letterVal = {
    "الصغير":{
      letters:{
        'ء':1,'ا':1,'أ':1,'ئ':1,'ى':1,
        'ب':2,
        'ج':1,
        'د':6,
        'ه':3,
        'ؤ':9 ,'و':3,
        'ز':7,
        'ح':1,
        'ط':25,
        'ي':3,
        'ك':2,
        'ل':2,
        'م':2,
        'ن':3,
        'س':1,
        'ع':2,
        'ف':2,
        'ص':9,
        'ق':2,
        'ر':11,
        'ش':1,
        'ة':7,'ت':8,
        'ث':9,
        'خ':1,
        'ذ':20,
        'ض':2,
        'ظ':2,
        'غ':2,
        ' ':0}
    },
    "حساب أبجد الكبير":{
      letters:{
        'ء':1,'ا':1,'أ':1,'ئ':1,'ى':1,
        'ب':2,
        'ج':3,
        'د':4,
        'ه':5,
        'ؤ':6 ,'و':6,
        'ز':7,
        'ح':8,
        'ط':9,
        'ي':10,
        'ك':20,
        'ل':30,
        'م':40,
        'ن':50,
        'س':60,
        'ع':70,
        'ف':80,
        'ص':90,
        'ق':100,
        'ر':200,
        'ش':300,
        'ة':400,'ت':400,
        'ث':500,
        'خ':600,
        'ذ':700,
        'ض':800,
        'ظ':900,
        'غ':1000,
        ' ':0}
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
