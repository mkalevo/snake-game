/* 
    This function draws the snake by looping the
    snake position and drawing each array item
    to the canvas context.

    @.pre   game object
    @.post  void
*/
export const drawSnake = (game) => { 
    game.snake.place.forEach(function (snakePart) {
        game.context.fillStyle = 'black'
        game.context.strokestyle = 'white'
        game.context.fillRect(snakePart.x, snakePart.y, 38, 38)
        game.context.strokeRect(snakePart.x, snakePart.y, 40, 40)
    })        
} 
        

