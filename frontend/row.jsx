var React = require('react'),
    Tile = require('./tile');

var Row = React.createClass({
  getInitialState(){
    return{
      tiles: this.props.tiles
    }
  },

  componentWillReceiveProps(newProps){
    this.setState({
      tiles: newProps.tiles
    })
  },

  drawTiles(){
    var tiles = this.state.tiles.map((tile) => {
      return (
        <Tile handleMove={this.props.handleMove} data={tile} key={[tile.x, tile.y]} />
      )
    })
    return tiles
  },

  render(){

  var tiles = this.drawTiles()
    return(
      <div className='row'>
        {tiles}
      </div>
    )
  }
});

module.exports = Row
