import React from "react";
 
function ShowResult({ country, onClickHandler }) {
  return (
    <div>
      <p>{country.name.common}</p>
      <button
        onClick={() => {
          onClickHandler(country)
        }}
      >
        show
      </button>
    </div>
  );
}

export default ShowResult;
