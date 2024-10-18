import React from 'react';
import { Link } from "react-router-dom";
import './gameSnake.css';




const GameSnake_ = () =>{

  //  1) сделать коины которые сохраняются при перезагрузке сайта и даются за достижения или набор очков
  //  2) реализовать змейку

  
  
  const DIRECTION = {
    right: {x: 1, y: 0},
    left: {x: -1, y: 0},
    top: {x: 0, y: 1},
    bottom: {x: 0, y: -1}
  }
  
  const [isPlay,setIsPlay] = React.useState(true);
  const [sizeField,setSizeField] = React.useState("");
  const [direction,setDirection] = React.useState(DIRECTION.top);
  const [snakeSegments, setSnakeSegments] = React.useState([]);


  let foodItem = {};
  let width;
  let height;
  let test_mas2D = [];




  const handleSetPlay = () =>{
    setIsPlay(!isPlay);
  }

  const handleSetSize=(valueSize)=>{
    console.log(valueSize);
    setSizeField(valueSize);
  }

  const handleSetSpeed=(valueSpeed)=>{
    console.log(valueSpeed);
  }

  const handleSizeField=(expression)=>{
    switch (expression) {
      case "large":
        return(60);
      case "average":
        return(40);
      case "small":
        return(20);
      default:
        return(20);
    }
  }
 
  
  
  const createField=()=>{
    
    width = handleSizeField(sizeField||" " ) * 2;
    height = width / 4;
    
    foodItem = {
      x:Math.floor(Math.random() * width),
      y:Math.floor(Math.random() * height),
    };

    setSnakeSegments( [{ x:width / 2, y:height / 2}, {x:width / 2, y:height / 2 + 1}, {x:width / 2,y:height / 2 + 2}] );
    for (let y = 0; y < height; y++) {
      test_mas2D.push([]);
      for (let x = 0; x < width; x++) {
        test_mas2D[y].push(getItem(x,y));  
      }
    }
    return test_mas2D;
  }
  
  const game = () => {
    let test_mas2D = createField();
    
    return test_mas2D.map((value, index) => (
      (index % 1) === 0 ? <React.Fragment key={index}> {value} <br/> </React.Fragment> : {value}
    ));
  }

  const getItem=(x,y) => {
    if (foodItem.x===x && foodItem.y===y){
      return "*";
    }
    for (const snakeSegment of snakeSegments){
      if (snakeSegment.x===x && snakeSegment.y===y){
        return "0";
      }
    }
    return " . ";
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

  const setNewSnakePosition = (snakeSegments, direction) => {
    
    console.log(snakeSegments);
    const head = snakeSegments[0];
    
    const newHead = {
        x: limitByField(head.x + direction.x, width),
        y: limitByField(head.y + direction.y, height)
    };
    return [newHead, ...snakeSegments.slice(0,-1)];
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

  return(
      <div className='gameSnake'>
        {
          isPlay  ?
          <div className='gameSnake-settings'>
            <div className='settings-fieldSize'>
                <legend>Выбери размер поля игры:</legend>
                <button onClick={()=>handleSetSize("large")}>большое</button>
                <button onClick={()=>handleSetSize("average")}>среднее</button>
                <button onClick={()=>handleSetSize("small")}>маленькое</button>
            </div>
            <div className='settings-speed'>
              <legend>Выбери скорость игры:</legend>
              <button onClick={()=>handleSetSpeed("quick")}>быстро</button>
              <button onClick={()=>handleSetSpeed("slow")}>медленно</button>
            </div>
            <div className='settings-play'>
              <legend>нажми и играй:</legend>
              <button onClick={()=>handleSetPlay()}>играть</button>
            </div>
          </div>
          :
          <div className='gameSnake-play'>
            {
              game()
            }
            <div className='settings-play'>
              <legend>нажми и играй:</legend>
              <button onClick={()=>handleSetPlay()}>играть</button>
            </div>
          </div>
        }
      </div>
  );
}
export default GameSnake_;