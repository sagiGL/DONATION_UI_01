import './App.css';
import { useState } from 'react';



function App() {
  const [data, setdata] = useLocalStorage('data', []);
  const [donations, setdonations] = useLocalStorage('donations', 0);
  const [myDonation, setMyDonation] = useState(50);
  const goal = 1000;
  let inputErr = '';
  
  const addDontaion = () => {
    setdonations(donations + myDonation);
    let newObj = {date: new Date(), donated: myDonation};
    const newData = [newObj].concat(data);
    setdata(newData);
  }
  const checkInput = (val) => {
    setMyDonation(isNaN(val)? 0: val);
  }

  return (
  <div className="donate-comp">
    <div className="comment">
        {
           donations > goal ?
            (<h4><b className="b-white">${donations}</b>DONATED!!! GOAL REACHED !!!</h4>)
            :
            (<h4><b className="b-white">${goal - donations}</b> still needed for this project</h4>)        
        }
    </div>
    
    <div className="panel">
      <div className="bar">
        <div className="fill" style={{width: (donations / goal)*100 + '%'}}>
          <div className="img-logo" id="#triangle-down" style={{right: (donations*100 / goal > 90 ? -15 : -40) + 'px'}}></div>
        </div>
      </div>
      <h4><b className="b-green">Only 3 days left</b> to fund this project.</h4>
      <p>Join the <b>{data.length}</b> other donors who have already supported this project. Every dollar helps.</p>
      
      <div className="group-btns">
        <input value={myDonation} className={"dolar-currency " + inputErr}  onChange={e => checkInput(parseInt(e.target.value))}></input>
        <button className="btn-main" onClick={() => addDontaion()}>Give Now</button>
      </div>
      <a>Why give $50?</a>
    </div>
    <div className="group-btns">
      <button className="btn">Save for later</button>
      <button className="btn">Tell your freinds</button>
    </div>
  </div>
  );
}

export default App;

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      if( !item) {
          window.localStorage.setItem(key, JSON.stringify(initialValue));
      }
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = value => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
}