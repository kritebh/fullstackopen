import { useState } from "react";

const Button = ({ text, onClick }) => {
  return (
    <>
      <button onClick={onClick}>{text}</button>
    </>
  );
};

const Header = ({ text }) => {
  return (
    <>
      <h2>{text}</h2>
    </>
  );
};

const StatisticLine = ({ text, value }) => {
  return (
    <>
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    </>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  if (good === 0 && neutral === 0 && bad === 0) {
    return <></>;
  }

  const all = () => (good || neutral || bad ? good + neutral + bad : 0);

  const average = () => {
    let num = good - bad;
    let den = all();
    return num && den ? num / den : 0;
  };

  const positive = () => (good ? good / all() : 0);

  return (
    <>
      <Header text="statistics" />
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={all()} />
          <StatisticLine text="average" value={average()} />
          <StatisticLine text="positive" value={positive()} />
        </tbody>
      </table>
    </>
  );
};

function App() {
  const [good, setGood] = useState(0);
  const [bad, setBad] = useState(0);
  const [neutral, setNeutral] = useState(0);

  return (
    <div>
      <Header text="give feedback" />
      <Button text="good" onClick={() => setGood(good + 1)} />
      <Button text="neutral" onClick={() => setNeutral(neutral + 1)} />
      <Button text="bad" onClick={() => setBad(bad + 1)} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
}

export default App;
