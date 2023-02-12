import React from 'react'
import Part from './Part';
import Total from './Total';

const Content = ({ parts }) => {
    let sum = parts.reduce((acc,element) => {
        return acc+=element.exercises
    },0);
    return (
    <>
      {parts.map((part, i) => {
        return <Part part={part} key={i} />;
      })}
      <Total sum={sum} />
    </>
    )
  };

export default Content