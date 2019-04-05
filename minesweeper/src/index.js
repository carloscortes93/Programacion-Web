import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
  render() {
    return (
      <button style = {this.props.color}
        className = "square" 
        onClick = {() => this.props.onClick({value: 'X'})}
      >
        {this.props.value}
      </button>
    );
  }
} 

class Board extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      firstClick: true,
      time: 0,
      bombs: 20,
      flags: 20,
      boolBoard: Array(81).fill(false),
      mainBoard: Array(81).fill(null),
      maskedBoard: Array(81).fill(null),
    };

    this.timerIncrease = this.timerIncrease.bind(this);
  } 

  bombCount(i, mainBoard){
    var n = 0;
    if ((i % 9 > 0) && (i/9 > 0) && mainBoard[i -10] === '*'){
      n++;
    }
    if ((i/9 > 0) && mainBoard[i -9] === '*'){
      n++;
    }
    if ((i % 9 < 8) && (i/9 > 0) && mainBoard[i -8] === '*'){
      n++;
    }
    if ((i % 9 > 0) && mainBoard[i -1] === '*'){
      n++;
    }
    if ((i % 9 < 8) && mainBoard[i +1] === '*'){
      n++;
    }
    if ((i % 9 > 0) && (i/9 < 8) && mainBoard[i +8] === '*'){
      n++;
    }
    if ((i/9 < 8) && mainBoard[i +9] === '*'){
      n++;
    }
    if ((i % 9 < 8) && (i/9 < 8) && mainBoard[i +10] === '*'){
      n++;
    }
    if (n){
      return n;
    }
    return null;
  }

  floodFill(i, boolBoard, maskedBoard, mainBoard){
    if(i < 0 || i > 80){
      return null;
    }
    if(boolBoard[i]){
      return;
    }

    boolBoard[i] = true;
    maskedBoard[i] = mainBoard[i];
    
    if(mainBoard[i] === null){
      if(i%9 !== 0){
        this.floodFill(i -10, boolBoard, maskedBoard, mainBoard);
        this.floodFill(i -1, boolBoard, maskedBoard, mainBoard);
        this.floodFill(i +8, boolBoard, maskedBoard, mainBoard);
      }
      if((i +1)%9 !== 0){
        this.floodFill(i -8, boolBoard, maskedBoard, mainBoard);
        this.floodFill(i +1, boolBoard, maskedBoard, mainBoard);
        this.floodFill(i +10, boolBoard, maskedBoard, mainBoard);  
      }    
      this.floodFill(i -9, boolBoard, maskedBoard, mainBoard);
      this.floodFill(i +9, boolBoard, maskedBoard, mainBoard);  
    }
  }

  setFill(mainBoard){
    for(var i = 0; i < 81; i++){
      if(mainBoard[i] !== "*"){
        mainBoard[i] = this.bombCount(i, mainBoard);
      }
    }
  }

  setBombs(start, mainBoard){
    for (var i = 0; i < this.state.bombs;){
      var n = Math.floor((Math.random() * 81));

      if (n !== start && mainBoard[n] !== '*'){
        mainBoard[n] = '*';
        i++;
      }
    }

    this.setFill(mainBoard);
  }

  winCondition(boolBoard){
    var cont = 80;
    
    for(var i = 0; i < 81; i++){
      if(boolBoard[i]){
        cont--;
      }
    }

    if(cont < 20){
      return true
    }

    return false;
  }

  handleClick(i) {
    var firstClick = this.state.firstClick;
    const maskedBoard = this.state.maskedBoard.slice();
    const boolBoard = this.state.boolBoard.slice();
    const mainBoard = this.state.mainBoard.slice();
    
    if (firstClick === true){
      firstClick = false;

      this.setBombs(i, mainBoard);
    }

    if (maskedBoard[i] !== '*'){
      this.floodFill(i, boolBoard, maskedBoard, mainBoard);
    }
    
    if(maskedBoard[i] === '*'){
      alert("Game over!");
      document.location.reload();
    }
    
    if (this.winCondition(boolBoard)){
      alert("Win! :^)");
      document.location.reload();
    }
    
    this.setState({mainBoard: mainBoard, boolBoard: boolBoard, maskedBoard: maskedBoard, firstClick: firstClick});
  }

  timerIncrease(){
    var time = this.state.time;
    time++;

    this.setState({time: time});
  }

  componentDidMount(){
    setInterval(this.timerIncrease, 1000);
  }

  renderSquare(i) {
    var color = (this.state.boolBoard[i])? {backgroundColor : "gray"} : {backgroundColor : "white"};

    return (
      <Square color = {color}
        value = {this.state.maskedBoard[i]} 
        onClick = {() => this.handleClick(i)}
      />
    );
  }

  render() {
    const status = 'Bombs: ';

    return (
      <div>
        <div className="status">{status} {this.state.flags}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
        <div className="board-row">
          {this.renderSquare(0 + 9*1)}
          {this.renderSquare(1 + 9*1)}
          {this.renderSquare(2 + 9*1)}
          {this.renderSquare(3 + 9*1)}
          {this.renderSquare(4 + 9*1)}
          {this.renderSquare(5 + 9*1)}
          {this.renderSquare(6 + 9*1)}
          {this.renderSquare(7 + 9*1)}
          {this.renderSquare(8 + 9*1)}
        </div>
        <div className="board-row">
          {this.renderSquare(0 + 9*2)}
          {this.renderSquare(1 + 9*2)}
          {this.renderSquare(2 + 9*2)}
          {this.renderSquare(3 + 9*2)}
          {this.renderSquare(4 + 9*2)}
          {this.renderSquare(5 + 9*2)}
          {this.renderSquare(6 + 9*2)}
          {this.renderSquare(7 + 9*2)}
          {this.renderSquare(8 + 9*2)}
        </div><div className="board-row">
          {this.renderSquare(0 + 9*3)}
          {this.renderSquare(1 + 9*3)}
          {this.renderSquare(2 + 9*3)}
          {this.renderSquare(3 + 9*3)}
          {this.renderSquare(4 + 9*3)}
          {this.renderSquare(5 + 9*3)}
          {this.renderSquare(6 + 9*3)}
          {this.renderSquare(7 + 9*3)}
          {this.renderSquare(8 + 9*3)}
        </div>
        <div className="board-row">
          {this.renderSquare(0 + 9*4)}
          {this.renderSquare(1 + 9*4)}
          {this.renderSquare(2 + 9*4)}
          {this.renderSquare(3 + 9*4)}
          {this.renderSquare(4 + 9*4)}
          {this.renderSquare(5 + 9*4)}
          {this.renderSquare(6 + 9*4)}
          {this.renderSquare(7 + 9*4)}
          {this.renderSquare(8 + 9*4)}
        </div>
        <div className="board-row">
          {this.renderSquare(0 + 9*5)}
          {this.renderSquare(1 + 9*5)}
          {this.renderSquare(2 + 9*5)}
          {this.renderSquare(3 + 9*5)}
          {this.renderSquare(4 + 9*5)}
          {this.renderSquare(5 + 9*5)}
          {this.renderSquare(6 + 9*5)}
          {this.renderSquare(7 + 9*5)}
          {this.renderSquare(8 + 9*5)}
        </div><div className="board-row">
          {this.renderSquare(0 + 9*6)}
          {this.renderSquare(1 + 9*6)}
          {this.renderSquare(2 + 9*6)}
          {this.renderSquare(3 + 9*6)}
          {this.renderSquare(4 + 9*6)}
          {this.renderSquare(5 + 9*6)}
          {this.renderSquare(6 + 9*6)}
          {this.renderSquare(7 + 9*6)}
          {this.renderSquare(8 + 9*6)}
        </div>
        <div className="board-row">
          {this.renderSquare(0 + 9*7)}
          {this.renderSquare(1 + 9*7)}
          {this.renderSquare(2 + 9*7)}
          {this.renderSquare(3 + 9*7)}
          {this.renderSquare(4 + 9*7)}
          {this.renderSquare(5 + 9*7)}
          {this.renderSquare(6 + 9*7)}
          {this.renderSquare(7 + 9*7)}
          {this.renderSquare(8 + 9*7)}
        </div>
        <div className="board-row">
          {this.renderSquare(0 + 9*8)}
          {this.renderSquare(1 + 9*8)}
          {this.renderSquare(2 + 9*8)}
          {this.renderSquare(3 + 9*8)}
          {this.renderSquare(4 + 9*8)}
          {this.renderSquare(5 + 9*8)}
          {this.renderSquare(6 + 9*8)}
          {this.renderSquare(7 + 9*8)}
          {this.renderSquare(8 + 9*8)}
        </div>
        <div className="status">Current game time: {this.state.time}</div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
