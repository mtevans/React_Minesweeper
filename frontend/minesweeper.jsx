var React = require('react'),
    Board = require('./board');

var Minesweeper = React.createClass({
  getInitialState(){
    return {
      numRows: 8,
      numCols: 8,
      numberOfBombs: 10
    }
  },

  makeHard(){
    this.setState({
      numRows: 16,
      numCols: 30,
      numberOfBombs: 99,
    })
  },

  makeMedium(){
    this.setState({
      numRows: 16,
      numCols: 16,
      numberOfBombs: 40,
    })
  },

  makeEasy(){
    this.setState({
      numRows: 8,
      numCols: 8,
      numberOfBombs: 10,
    })
  },

  checkWin(spacesLeft){
    if(spacesLeft === 0){
      alert("You Win!!")
    }
  },

  gameOver(){
    alert("You Hit A Mine!! You LOSE");
  },

  render(){
    return(
      <Board gameOver={this.gameOver} rowCount={this.state.numRows}
        colCount={this.state.numCols} numberOfBombs={this.state.numberOfBombs}
        checkWin={this.checkWin} makeHard={this.makeHard} makeMedium={this.makeMedium}
        makeEasy={this.makeEasy}/>
    )
  }
});

module.exports = Minesweeper
