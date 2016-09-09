var React = require('react'),
    Row = require('./row');

var Board = React.createClass({
  getInitialState(){
    return {
      rows: this.createBoard(),
      spacesLeft: (this.props.rowCount * this.props.colCount) - this.props.numberOfBombs,
      reset: true
    }
  },

  componentWillReceiveProps(newProps) {
    this.props = newProps
    this.setState({
      rows: this.createBoard(),
      spacesLeft: (newProps.rowCount * newProps.colCount) - newProps.numberOfBombs,
      reset: true
    });
  },

  createBoard(){
    var board = []
    for (var i = 0; i < this.props.rowCount; i++) {
      let row = []
      for (var j = 0; j < this.props.colCount; j++) {
        row.push({
          x: i,
          y: j,
          bombCount: 0,
          hasBomb: false,
          hasNumber: false,
          revealed: false
        })
      }
      board.push(row)
    }
    board = this.plantMines(board)
    return board
  },

  plantMines(board){
    for (var i = 0; i < this.props.numberOfBombs; i++) {
      let foundTarget = false
      while(!foundTarget){
        let target = board[Math.floor(Math.random()*this.props.rowCount)][Math.floor(Math.random()*this.props.colCount)]
        if(!target.hasBomb){
          target.hasBomb = true
          target.bombCount = 0
          board = this.handleCount(target, board)
          foundTarget = true
        }
      }
    }
    return board
  },

  handleCount(tile, board){
    var neighbours = [[-1,0], [-1,-1], [-1,1], [0,-1], [0,1], [1,-1], [1,0], [1,1]]
    var x = tile.x
    var y = tile.y
    neighbours.forEach(pos => {
      let x2 = x + pos[0]
      let y2 = y + pos[1]
      if(this.validPos([x2,y2]) && !board[x2][y2].hasBomb){
        board[x2][y2].bombCount += 1
        board[x2][y2].hasNumber = true
      }
    })
    return board
  },

  handleMove(target){
    var board = this.state.rows

    board[target.x][target.y].revealed = true


    if (target.hasBomb){
      this.props.gameOver()
      this.setState({rows: board})
    } else if (target.bombCount === 0) {
      board = this.triggerExpansion(target)
      this.state.spacesLeft -= 1
    } else {
      this.state.spacesLeft -= 1
    }
    this.setState({rows: board})
  },


  validPos(pos){
    let x = pos[0]
    let y = pos[1]
    if((x >= 0 && x < this.props.rowCount) && (y >= 0 && y < this.props.colCount)){
      return true
    } else {
      return false
    }
  },

  triggerExpansion(target){
    var targetNeighbours = [[-1,0], [-1,-1], [-1,1], [0,-1], [0,1], [1,-1], [1,0], [1,1]]
    var targetPosition = [target.x, target.y]
    var stack = [targetPosition]
    var board = this.state.rows
      while(stack.length > 0){
        let position = stack.pop()
        let x = parseInt(position[0])
        let y = parseInt(position[1])

        for (var i = 0; i < targetNeighbours.length; i++) {
          let newX = targetNeighbours[i][0] + x
          let newY = targetNeighbours[i][1] + y
          if(!(this.validPos([newX, newY]))){
            continue //skip invalid positions
          }
          let newTarget = board[newX][newY] // position in question
          if(newTarget.bombCount === 0 && !newTarget.revealed && !newTarget.hasBomb){ //if the bomb count of the target is 0 and it hasn't been revealed and it's not a bomb
            stack.push([newX, newY])  //add empties to the stack
          }
          if(!newTarget.revealed && !newTarget.hasBomb){
            newTarget.revealed = true //all neighbours of empty get revealed
            this.state.spacesLeft -= 1
          }
        }
      }
      return board
  },

  _reset(){
    let newBoard = this.createBoard()
    this.setState({
      rows: newBoard,
      spacesLeft: (this.props.rowCount * this.props.colCount) - this.props.numberOfBombs,
    })
  },

  drawRows(){
    var drawnRows = this.state.rows.map((row)=>{
      return (
        <Row handleMove={this.handleMove} tiles={row} key={row[0].x}/>
      )
    })
    return drawnRows
  },

  render(){
    var rows = this.drawRows()
    this.props.checkWin(this.state.spacesLeft)
    return(
      <div className='board'>
        <h1>Minesweeper</h1>
        <div className='panel'>
          <div className='button' onClick={this._reset}>Reset Game</div>
          <div className='button' onClick={this.props.makeLarge}>Hard</div>
          <div className='button' onClick={this.props.makeMedium}>Medium</div>
          <div className='button' onClick={this.props.makeEasy}>Easy</div>
          <div className='score'>Safe Spaces Left: {this.state.spacesLeft}</div>
        </div>
        {rows}
      </div>
    )
  }

});

module.exports = Board
