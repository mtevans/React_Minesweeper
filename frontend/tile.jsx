var React = require('react');

var Tile = React.createClass({
  getInitialState(){
    var data = this.props.data
    return {
      x: data.x,
      y: data.y,
      bombCount: data.bombCount,
      hasBomb: data.hasBomb,
      hasNumber: data.hasNumber,
      revealed: data.revealed
    }
  },

  componentWillReceiveProps(newProps) {
    this.setState({
      x: newProps.data.x,
      y: newProps.data.y,
      bombCount: newProps.data.bombCount,
      hasBomb: newProps.data.hasBomb,
      hasNumber: newProps.data.hasNumber,
      revealed: newProps.data.revealed
    });
  },

  _handleClick(){
    if(!(this.state.revealed)){
      this.props.handleMove(this.state)
    }
  },

  handleContent(){
    if(this.state.revealed && this.state.hasBomb){
      return (<img className='bomb' src='./images/bomb.png'/>)
    } else if (this.state.revealed && this.state.bombCount === 0){
      return ""
    } else if (this.state.revealed){
      return this.state.bombCount
    } else {
      return ""
    }
  },

  handleClass(){
    let firstClass;
    let secondClass;
    let count = this.state.bombCount
    if(this.state.revealed){
      firstClass = "tile-revealed"
    } else {
      firstClass = "tile-concealed"
    }
    if(count == 1){
      secondClass = "one"
    } else if (count === 2){
      secondClass = "two"
    } else if (count === 3){
      secondClass = "three"
    } else if (count === 4){
      secondClass = "four"
    } else if (count === 5){
      secondClass = "five"
    } else if (count === 6){
      secondClass = "six"
    } else if (count === 7){
      secondClass = "seven"
    } else if (count === 8){
      secondClass = "eight"
    } else {
      secondClass = "none"
    }

    return `${firstClass} ${secondClass}`
  },

  render(){

    var content = this.handleContent()
    var Classes = this.handleClass()
    return(
      <div className={Classes} onClick={this._handleClick}>{content}</div>
    )
  }
});

module.exports = Tile
