import React, { useState, useEffect } from 'react';
import './gameSnake.css';

const DIRECTION = {
  right: "right",
  left: "left",
  top: "up",
  bottom: "down"
}

const GameSnake = () => {
  
  const [snakeAllSegment, setsnakeAllSegment] = useState( 
    {
      head:[{ x: 2, y: 0 }],
      body:[{ x: 1, y: 0 },{ x: 0, y: 0 }]} );

  const [food, setFood] = useState({ x: 3, y: 3 });
  const [direction, setDirection] = useState('right');
  const [isPlay, setIsPlay] = useState(false);
  const [textEnd, setTextEnd] = useState("");
  const [ROWS , setROWS] = useState(sizeField("small"));
  const [COLS, setCOLS] = useState(sizeField("small"));
  
  const handleSetPlay = () =>{
    setIsPlay(!isPlay);
  }
  const handlesetWinText=()=>{
    setTextEnd("ТЫ ПОБЕДИЛ!:)")
  }
  const handlesetLoseText=()=>{
    setTextEnd("ТЫ ПРОИГРАЛ!!!! ;(")
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

  const nonOverlappFoodCoords = () => {
    let overlap = false;
    let overlapHead;
    let overlapBody;
    let newX, newY;
    do {
      newX = Math.floor(Math.random() * ROWS);
      newY = Math.floor(Math.random() * COLS);
      overlapHead = snakeAllSegment.head.some(snakeheadSegment => snakeheadSegment.x === newX && snakeheadSegment.y === newY);
      overlapBody = snakeAllSegment.body.some(snakebodySegment => snakebodySegment.x === newX && snakebodySegment.y === newY);
      overlap = overlapHead || overlapBody;
    } while (overlap || newX === food.x && newY === food.y); // check for overlap with snake and food
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
    const head = { ...snakeAllSegment.head[0] };
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

    
    if(snakeAllSegment.body.some(s => s.x === head.x && s.y === head.y)){
      
      handlesetLoseText();
      handleSetPlay();
    }
    else{
      if(head.x!==food.x || head.y!==food.y){
        setsnakeAllSegment({head:[head], body:[head, ...snakeAllSegment.body.slice(0, -1)]});
      }
      else{
        if(head.x===food.x && head.y===food.y){
          setFood(nonOverlappFoodCoords());
          setsnakeAllSegment({head:[head], body:[head, ...snakeAllSegment.body]});
        }
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
      if( snakeAllSegment.head.length + snakeAllSegment.body.length + 1 >= ROWS * COLS ){
        handlesetWinText();
        handleSetPlay();
        return () => clearInterval(timer);
      }
      moveSnake();
    }, 150);

    return () => clearInterval(timer);
  }, [snakeAllSegment]);

  return (
   <div>
    {
      isPlay ?
        <div>
          {Array.from({ length: ROWS }, (_, row) => (
            <div className='fieldHorizontal' key={row}>
              {Array.from({ length: COLS }, (_, col) => (
                <div key={col} className={`cell${snakeAllSegment.head.some(s => s.x === col && s.y === row) ? 'snakeHead' : ''}${snakeAllSegment.body.some(s => s.x === col && s.y === row) ? 'body' : ''}${food.x === col && food.y === row ? 'food' : ''}`}></div>
              ))
              }
            </div>
            ))}
        </div>
      :
      <div className='gameSnake-settings'>
        <div className='settings-textEnd'>
          {textEnd}
        </div>
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
  );
}

export default GameSnake;