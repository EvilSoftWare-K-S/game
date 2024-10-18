import React, { useState, useEffect } from 'react';
import './gameSnake.css';




// const ROWS = 5;
// const COLS = 5;
const DIRECTION = {
  right: "right",
  left: "left",
  top: "up",
  bottom: "down"
}

const GameSnake = () => {
  
  

  const [snake, setSnake] = useState([{ x: 0, y: 0 }]);
  const [food, setFood] = useState({ x: 3, y: 3 });
  const [direction, setDirection] = useState('right');
  const [isPlay, setIsPlay] = useState(false);
  const [ROWS , setROWS] = useState(sizeField("small"));
  const [COLS, setCOLS] = useState(sizeField("small"));
  
  const handleSetPlay = () =>{
    setIsPlay(!isPlay);
  }
  
  const handleSetSpeed=()=>{
    console.log();
  }
  
  function sizeField(valueSize){
    switch (valueSize) {
      case "large":
        return(20);
      case "average":
        return(10);
      case "small":
        return(5);
      default:
        return(5);
    }
  }

  const handleSetFieldLarge=()=>{
    let valueSize = sizeField("large");
    setROWS(valueSize);
    setCOLS(valueSize);
  }
  const handleSetFieldAverage=()=>{
    let valueSize = sizeField("average");
    setROWS(valueSize);
    setCOLS(valueSize);
  }
  const handleSetFieldSmall=()=>{
    let valueSize = sizeField("small");
    setROWS(valueSize);
    setCOLS(valueSize);
  }

  const nonOverlappCoords = () => {
      let overlap = false;
      let newX, newY;
      do {
        newX = Math.floor(Math.random() * ROWS);
        newY = Math.floor(Math.random() * COLS);
        overlap = snake.some(snakeSegment => snakeSegment.x === newX && snakeSegment.y === newY);
    } while (overlap);
    
    return { x: newX, y: newY };
  }


  const limitByField = (position, limitPosition) => {
    if(position >= limitPosition){
      return  0;
    }
    if(position < 0){
      return limitPosition - 1;
    }
    return position;
  }

  const moveSnake = () => {
    const head = { ...snake[0] };
      switch(direction) {
        case 'up':
          head.y = limitByField(head.y - 1,COLS);
          break;
        case 'down':
          head.y = limitByField(head.y + 1,COLS);
          break;
        case 'left':
          head.x = limitByField(head.x - 1,ROWS);
          break;
        case 'right':
          head.x = limitByField(head.x + 1,ROWS);
          break;
        default:
          break;
      }

      
    if(snake[0].x!==food.x || snake[0].y!==food.y){
      setSnake([head, ...snake.slice(0, -1)]);
    }
    else{
      
      setFood(nonOverlappCoords());
      setSnake([head, ...snake]);
    }
    
  }

  React.useEffect(() => {
    const handleKeyDown = (e) => {
      switch(e.keyCode) {
        case 37:
          setDirection(DIRECTION.left);
          break;
        case 38:
          setDirection(DIRECTION.top);
          break;
        case 39:
          setDirection(DIRECTION.right);
          break;
        case 40:
          setDirection(DIRECTION.bottom);
          break;
        default:
          break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if( snake.length + 1 >= ROWS * COLS ){
        handleSetPlay();
        return () => clearInterval(timer);
      }
      moveSnake();
    }, 100);

    return () => clearInterval(timer);
  }, [snake]);

  return (
   <div>
    {
      isPlay ?
        <div>
          {Array.from({ length: ROWS }, (_, row) => (
            <div className='fieldHorizontal' key={row}>
              {Array.from({ length: COLS }, (_, col) => (
                <div key={col} className={`cell${snake.some(s => s.x === col && s.y === row) ? 'snake' : ''}${food.x === col && food.y === row ? 'food' : ''}`}></div>
              ))
              }
            </div>
            ))}
        </div>
      :
      <div className='gameSnake-settings'>
        <div className='settings-fieldSize'>
            <legend>Выбери размер поля игры:</legend>
            <button onClick={handleSetFieldLarge}>большое</button>
            <button onClick={handleSetFieldAverage}>среднее</button>
            <button onClick={handleSetFieldSmall}>маленькое</button>
        </div>
        <div className='settings-speed'>
          <legend>Выбери скорость игры:</legend>
          <button onClick={()=>handleSetSpeed}>быстро</button>
          <button onClick={()=>handleSetSpeed}>медленно</button>
        </div>
        <div className='settings-play'>
          <legend>нажми и играй:</legend>
          <button onClick={handleSetPlay}>играть</button>
        </div>
      </div>
    }
   </div>
 
    // <div>
    //   {Array.from({ length: ROWS }, (_, row) => (
    //     <div className='fieldHorizontal' key={row}>
    //       {Array.from({ length: COLS }, (_, col) => (
    //         <div key={col} className={`cell${snake.some(s => s.x === col && s.y === row) ? 'snake' : ''}${food.x === col && food.y === row ? 'food' : ''}`}></div>
    //       ))}
    //     </div>
    //   ))}
    // </div>
  );
}

export default GameSnake;