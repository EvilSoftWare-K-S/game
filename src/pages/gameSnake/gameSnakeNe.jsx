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
  
  // const [snakeAllSegment, setsnakeAllSegment] = useState(
  //   {head:[{ x: 0, y: 0 }],body:[{ x: 0, y: 0 }]} );
  
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
          // console.log(direction);
          break;
        case 'down':
          head.y = limitByField(head.y + 1,COLS);
          // console.log(direction);
          break;
        case 'left':
          head.x = limitByField(head.x - 1,ROWS);
          // console.log(direction);
          break;
        case 'right':
          head.x = limitByField(head.x + 1,ROWS);
          // console.log(direction);
          break;
        default:
          break;
      }

      
    if(snake[0].x!==food.x || snake[0].y!==food.y){
      setSnake([head, ...snake.slice(0, -1)]);
    }
    else{
      if(snake[0].x===food.x && snake[0].y===food.y){
        setFood(nonOverlappCoords());
        setSnake([head, ...snake]);
      }
      else{
        console.log("ccacatafasf");
        handleSetPlay();
      }
      
    }
    
  }

  function checkDirection(strDirection){
    switch(strDirection) {
      case 'updown':
        return false;
      case 'downup':
        return false;
      case 'rightleft':
        return false;
      case 'leftright':
        return false;
      default:
        return true;
    }
  }
  
  //исправить ошибку в результате которой змея может развернуться в себя 
/*
  % функция checkCorrectDirection условно рабочая
  % можно использовать для усложнения игры в результате полного отключения функции
  % чем выше (скорость игры), тем сложнее баг воспроизвести

  !!как воспроизвести баг!!
  (во время отрисовки кадра (скорость игры) меняем направление змеи на перпендикулярное текущему
   и сразу меняем на противоположное текущему движению )
   
*/
  function checkCorrectDirection(newDir,oldDir){
    return checkDirection(newDir + "" + oldDir) ? newDir : oldDir;
  }
  
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      switch(e.keyCode) {
        case 37:
          setDirection(checkCorrectDirection(DIRECTION.left, direction));
          break;
        case 38:
          setDirection(checkCorrectDirection(DIRECTION.top, direction));
          break;
        case 39:
          setDirection(checkCorrectDirection(DIRECTION.right, direction));
          break;
        case 40:
          setDirection(checkCorrectDirection(DIRECTION.bottom, direction));
          break;
        default:
          break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [direction]);

  useEffect(() => {
    const timer = setInterval(() => {
      if( snake.length + 1 >= ROWS * COLS ){
        handleSetPlay();
        return () => clearInterval(timer);
      }
      moveSnake();
    }, 150);

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