import React from 'react';
import { Link } from "react-router-dom";

import './gameShop.css';

const GameShop = () =>{
  return(
    <div className='gameShop'>
      <div className='gameShop-game'>
          <div className="game-description">
            <h1 className='description-title'>змейка</h1>
            {/*<img className="description-img" src="" alt="" />*/} 
            <div className="description-img">{"~~~~~~~~<>"}</div>
            <span className='description-text'>
              «Зме́йка» (англ. Snake), также «Питон», «Удав», 
              «Червяк» — жанр компьютерных игр, в которых игрок
              управляет «головой» растущей линии («змеи») и не должен
              позволять ей столкнуться с препятствиями, в том числе со своим «хвостом».
            </span>
          </div>
        <Link to="GameSnake" className="game-buttonPlay">Play</Link>
      </div>
        
        
      {/*gameNames.map(gameName)*/ }
    </div>
  );
}
export default GameShop;