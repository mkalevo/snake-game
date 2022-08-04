export const drawFood = (context, food_x, food_y) => {
    context.beginPath()
    context.arc(food_x + 20, food_y + 20, 20, 0, Math.PI * 2)
    //context.rect(food_x, food_y, 40, 40)
    context.fillStyle = "rgb(20,20,20)"
    context.fill()
/*
    context.fillStyle = 'lightgreen'
    context.strokestyle = 'darkgreen'
    context.fillRect(food_x, food_y, 10, 10)
    context.strokeRect(food_x, food_y, 10, 10) */
}
