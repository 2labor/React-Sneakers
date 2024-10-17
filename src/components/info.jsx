import React, { useContext } from "react";
import AppContext from "../context";
import { Link } from "react-router-dom";

const Info = ({ onMain=false ,imageUrl,title, description }) => {
  const {setCartOpened} = useContext(AppContext);


  return ( 
    <div className="cartEmpty d-flex align-center justify-center flex-column flex">
      <img className="mb-20" src={imageUrl} alt="Empty cart icon" />
      <h2>{title}</h2>
      <p className="opacity-6">{description}</p>
      {onMain ? (<Link to="/">
        <button className="greenButton">
          <img src="/img/arrow.svg" alt="Arrow"/>Вернуться на главную
        </button>
      </Link>
      ) : (
      <button className="greenButton" onClick={() => setCartOpened(false)}>
        <img src="/img/arrow.svg" alt="Arrow"/>Вернуться назад
      </button>)}
    </div>
  );
}

export default Info;