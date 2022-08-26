/*

    @.pre   context(object), snake === []
    @.post draws food for given position
*/
export const drawFood = (context, snake) => {
    context.beginPath()
    context.arc(snake.foodPos.x + 20, snake.foodPos.y + 20, 20, 0, Math.PI * 2)
    context.fillStyle = "rgb(20,20,20)"
    context.fill()
}