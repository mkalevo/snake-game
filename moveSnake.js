import { genFood } from "./genFood.js"

// Moves the snake, adds new head to array and removes 
// the last element if the snake has not eated.

export const moveSnake = (game) => {
    // create new snake's head (to the snake array)
    // if statement to go throw walls

    let head
    if (game.snake.place[0].x > game.canvas.width-40) {
        head = {x: 0, y: game.snake.place[0].y + game.snake.direction.y}
    } else if (game.snake.place[0].x < 0) {
        head = {x: game.canvas.width-40, y: game.snake.place[0].y + game.snake.direction.y}
    } else if (game.snake.place[0].y > game.canvas.height-40) {
        head = {x: game.snake.place[0].x + game.snake.direction.x, y: 0}
    } else if (game.snake.place[0].y < 0) {
        head = {x: game.snake.place[0].x + game.snake.direction.x, y: game.canvas.height-40}
    }else{
        head = {x: game.snake.place[0].x + game.snake.direction.x, y: game.snake.place[0].y + game.snake.direction.y}
    }

    // Add the new head to the beginning of the snake body
    game.snake.place.unshift(head) // unshift inserts new element at the start of the array.

    // Variable has_eaten_food check's if the snake's head is on the food position.
    // If true, player get's 10 points and the game create new food position.
    const has_eaten_food = game.snake.place[0].x === game.snake.foodPos.x  &&
                            game.snake.place[0].y === game.snake.foodPos.y
    if (has_eaten_food) {
        game.snake.points += 10
        game = genFood(game)
    } else {
        game.snake.place.pop() // Removes the last element
    }
    return game
}