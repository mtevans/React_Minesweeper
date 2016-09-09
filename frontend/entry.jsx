var React = require ('react'),
    ReactDOM = require('react-dom'),
    Minesweeper = require('./minesweeper');


document.addEventListener('DOMContentLoaded', function(){
  ReactDOM.render(<Minesweeper/>, document.getElementById('root'))
})
