import { randomFood } from "./randomFood.js"

/*
    Generate's new food and loops the snake position with forEach
    to check out the food position is not the same as snake's position.
    If it is, runs the genFood() function again.
    This function does not draw the food, only generates the position.

    @.pre   game object
    @.post  game object
*/
export const genFood = (game) => {
    game.snake.foodPos.x = randomFood(0, game.canvas.width - 40)
    game.snake.foodPos.y = randomFood(0, game.canvas.height - 40)
    game.snake.place.forEach(function (part) {
        const has_eaten = part.x == game.snake.foodPos.x && part.y == game.snake.foodPos.y
        console.log("onko syönyt", has_eaten)
        if (has_eaten)  game = genFood(game)})
    return game
}