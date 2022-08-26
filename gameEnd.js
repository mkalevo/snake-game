import { wait } from "./wait.js"
import { clearCanvas } from "./clearCanvas.js"

//Tämän ohjelman voisi vielä jakaa aliohjelmiin?
//Aliohjelmat kuitenkin vain tässä ohjelmassa käytettäviä ohjelmia
//Toki sitten funktion wait voisi kanssa lisätä tänne. Hmmm

//tämä lista johonkin serverille
let highscores = [
    {name: "Matti Snakelainen", score: 30},
    {name: "Seppo Serpiente", score: 150},
    {name: "Kalle Kärmes", score: 310},
    {name: "Pentti Kärmelin", score: 480},
    {name: "Maija Mato", score: 260}
]


//if snake has_collided =>
// shows the points and give option to play again
// 'play again text/'button' use the same area as the 
// starting page

/*
    Function for the actions if the game have ended.
    If the snake has collided, then shows the player
    points and highscore list.

    @.pre   game object
    @.post  game object
*/
export const gameEnd = (game) => {
    for (let i = 4; i < game.snake.place.length; i++){
        let has_collided = game.snake.place[i].x === game.snake.place[0].x &&
        game.snake.place[i].y === game.snake.place[0].y
        if (has_collided){
            //alert('game ended sry bro paina F5')

            wait(1500)
            clearCanvas(game.context, game.canvas)
            game.context.font = '25px nokiafc22'
            game.context.fillStyle = 'black'
            game.context.fillText(game.snake.points + ' POINTS', 230, 150)
            game.context.fillText("Play again", 230, 220)

            addToHighscores(game.playerName, game.snake.points)
            highscoresList(game)

            game.isRunning = false 
            has_collided = false

        }
    }
    console.log("Objekti game gameEnd:ssä")
    console.log(game)
    //return game
}

/*
    Push's the score to the array highscores

    @.pre   
    @.post
*/
const addToHighscores = (playerName, points) => {
    highscores.push({name: playerName, score: points})
}

/*
    Function to sort and map the highscores to the gameEnd-page
    Show's only the best 5 scores

    @.pre
    @.post
*/
const highscoresList = (game) => {
    let posX = 160
    let posY = 250
    game.context.font = '20px nokiafc22'
    game.context.fillStyle = 'black'
    let ValueSortHighscores = highscores.sort((a,b) => b.score - a.score)
    ValueSortHighscores = ValueSortHighscores.slice(0, 5)
    ValueSortHighscores.map(x  => game.context.fillText(x.name + '      ' + x.score + ' points', posX, posY+=25))
}

