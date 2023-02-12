import { useState } from "react";

const Statistics = ({good,neutral,bad}) => {

  if(good ===0 && neutral ===0 && bad===0){
    return <></>
  }

  const all = () => good||neutral||bad?good + neutral + bad:0;

  const average = () => {
    let num = good - bad;
    let den = all();
    return num && den ? num / den : 0;
  };

  const positive = () => (good ? good / all() : 0);

  return (<>
    <h2>statistics</h2>
    <p>good {good}</p>
    <p>neutral {neutral}</p>
    <p>bad {bad}</p>
    <p>all {all()}</p>
    <p>average {average()} </p>
    <p>positive {positive()}</p>
  </>
  )
};

function App() {
  const [good, setGood] = useState(0);
  const [bad, setBad] = useState(0);
  const [neutral, setNeutral] = useState(0);

  

  return (
    <div>
      <h2>give feedback</h2>
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  );
}

export default App;
