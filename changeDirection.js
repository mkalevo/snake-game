/*
    Function to change the direction of the snake.

    @.pre   e === keyboards event, game object
    @.post void?

*/

export const change_direction = (e, game) => {
    console.log(game)
    if (game.snake.changingDirection) return
    console.log(e)
    let keypressed;
    game.snake.changingDirection = true
    console.log(typeof(e))

    
    if (typeof e === 'object'){
        keypressed = e.key
    }else{
        keypressed = e
    }
    
    console.log(keypressed)
    
    // This if/else statements blocks the snake to go backwards.
    // If the keypressed is not backwards, will change the direction 
    // inside the game.snake.direction object.
    if (keypressed === 'ArrowUp' && game.snake.direction.y === 40){
        console.log('This snake can\'t move backwards.')
    } else if (keypressed === 'ArrowDown' && game.snake.direction.y === -40){
        console.log('This snake can\'t move backwards.')
    } else if (keypressed === 'ArrowRight' && game.snake.direction.x === -40){
        console.log('This snake can\'t move backwards.')
    } else if (keypressed === 'ArrowLeft' && game.snake.direction.x === 40){
        console.log('This snake can\'t move backwards.')
    } else {
        switch (keypressed){ 
            case 'ArrowRight':      // Right
                game.snake.direction.x = 40
                game.snake.direction.y = 0
                break;
            case 'ArrowLeft':       // Left
                game.snake.direction.x = -40
                game.snake.direction.y = 0
               break;
            case 'ArrowDown':       // Down
               game.snake.direction.y = 40
               game.snake.direction.x = 0
               break;
            case 'ArrowUp':         // Up
                game.snake.direction.y = -40
                game.snake.direction.x = 0
                break;    
        }
    }
}