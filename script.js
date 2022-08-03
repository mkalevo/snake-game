import { drawFood } from "./food.js"

window.onload = function (){
    let canvas = document.getElementById("canvas");
    let context = canvas.getContext("2d")
    
    //canvas size 18*11
    // 680 * 440 and snake 40 pixels
    let points = 0
    let food_x = random_food(0, canvas.width - 40)
    let food_y = random_food(0, canvas.height - 40)
    console.log(canvas.width)
    console.log(canvas.height)

    var runGame = false;

    let snake = [
        {x: 200, y: 200},
        {x: 160, y: 200},
        {x: 120, y: 200},
        {x: 80, y: 200},
        {x: 40, y: 200},
    ]

    let highscores = [
        {name: "Matti Snakelainen", score: 30},
        {name: "Seppo Serpiente", score: 150},
        {name: "Kalle Kärmes", score: 310},
        {name: "Pentti Kärmelin", score: 480},
        {name: "Maija Mato", score: 260}
    ]

    // True if changing direction
    let changing_direction = false;
    //horizontal velocity
    let dx = 40;
    // vertical velocity
    let dy = 0;

    let up = document.getElementById('up')
    let right = document.getElementById('right')
    let left = document.getElementById('left')
    let down = document.getElementById('down')
    

    function random_food(min, max) {
        return Math.round((Math.random() * (max-min) + min) /40) *40
    }
    
    const gen_food = () => {
        food_x = random_food(0, canvas.width - 40)
        food_y = random_food(0, canvas.height - 40)
        snake.forEach(function has_snake_eaten_food(part) {
            const has_eaten = part.x == food_x && part.y == food_y;
            if (has_eaten) gen_food();
        })
    }

    
    function moveUp() {
        console.log('move up funktio')
        change_direction('ArrowUp')
    }
    function moveDown() {
        change_direction('ArrowDown')
    }
    function moveRight() {
        change_direction('ArrowRight')
    }
    const moveLeft = () => {
        change_direction('ArrowLeft')
    }
    document.getElementById("moveUp").onclick = function(){moveUp()};
    document.getElementById("moveDown").onclick = function(){moveDown()};
    document.getElementById("moveRight").onclick = function(){moveRight()};
    document.getElementById("moveLeft").onclick = function(){moveLeft()};

    const change_direction = (e) => {
        if (changing_direction) return
        console.log(e)
        var keypressed;
        changing_direction =true
        console.log(typeof(e))

        
        if (typeof e === 'object'){
            keypressed = e.key
        }else{
            keypressed = e
        }
        
        console.log(keypressed)
        
        // estää väärään suuntaan ajamisen
        //hölmö logiikka, olisi ehkä parempi jos boolean
        // true tai false arvo kääntymiseen
        if (keypressed === 'ArrowUp' && dy === 40){
            console.log('ei')
        } else if (keypressed === 'ArrowDown' && dy === -40){
            console.log('ei')
        } else if (keypressed === 'ArrowRight' && dx === -40){
            console.log('ei')
        } else if (keypressed === 'ArrowLeft' && dx === 40){
            console.log('ei')
        } else {
            switch (keypressed){ 
                case 'ArrowRight':    //right
                    dx = 40
                    dy = 0
                    break;
                case 'ArrowLeft':    //left
                    dx = -40
                    dy = 0
                   break;
                case 'ArrowDown':    //down
                   dy = 40
                   dx = 0
                   break;
                case 'ArrowUp':    //up
                    dy = -40
                    dx = 0
                    break;    
            }
        }
    }
    
    
    const clearCanvas = () => {
        context.clearRect(0, 0, canvas.width, canvas.height)
    }

    const drawSnakePart = (snakePart) => { 
        context.fillStyle = 'black'
        context.strokestyle = 'white'
        context.fillRect(snakePart.x, snakePart.y, 38, 38)
        context.strokeRect(snakePart.x, snakePart.y, 40, 40)
    }

    const drawSnake = () => { snake.forEach(drawSnakePart)}

    // moves the snake to direction, adds new head to array
    // and removes one element
    //head VAR koska ei toimi constina kesken if
    const move_snake = () => {
        //create new snake's head (to the snake array)
        if (snake[0].x > canvas.width-40) {
            var head = {x: 0, y: snake[0].y + dy}
        } else if (snake[0].x < 0) {
            var head = {x: canvas.width-40, y: snake[0].y + dy}
        } else if (snake[0].y > canvas.height-40) {
            var head = {x: snake[0].x + dx, y: 0}
        } else if (snake[0].y < 0) {
            var head = {x: snake[0].x + dx, y: canvas.height-40}
        }else{
            var head = {x: snake[0].x + dx, y: snake[0].y + dy}
        }
       
        //add the new head to the beginning of the snake body
        snake.unshift(head) //unshift inserts new element at the start
        const has_eaten_food = snake[0].x === food_x  &&
                            snake[0].y === food_y
        if (has_eaten_food) {
            points += 10
            gen_food()
        } else {
            snake.pop() //remove the last element
        }
    }

    //function to use wait()
    function wait(ms){
        let start = new Date().getTime();
        let end = start;
        while(end < start + ms) {
          end = new Date().getTime();
       }
     }

    //if snake has_collided =>
    // shows the points and give option to play again
    // 'play again text/'button' use the same area as the 
    // starting page
    const game_end = () => {
        for (let i = 4; i < snake.length; i++){
            var has_collided = snake[i].x === snake[0].x &&
            snake[i].y === snake[0].y
            if (has_collided){
                //alert('game ended sry bro paina F5')

                wait(1500)
                clearCanvas()
                context.font = '25px nokiafc22'
                context.fillStyle = 'black'
                context.fillText(points + ' POINTS', 230, 150)
                context.fillText("Play again", 230, 220)

                addToHighscores("Pelaaja1 (Käärmes)", points)
                highscoresList()

                runGame = false 
                has_collided = false

                return runGame
                //return true
            }
        }
    }

    //highscoret mapattuina vikalle sivulle
    //tulisi myös järjestää suuruusjärjestykseen
    const highscoresList = () => {
        let posX = 160
        let posY = 250
        context.font = '20px nokiafc22'
        context.fillStyle = 'black'
        let ValueSortHighscores = highscores.sort((a,b) => b.score - a.score)
        ValueSortHighscores = ValueSortHighscores.slice(0, 5)
        ValueSortHighscores.map(x  => context.fillText(x.name + '      ' + x.score + ' points', posX, posY+=25))

    }

    //Pisteet highscorelistaan
    const addToHighscores = (name1, score1) => {
        highscores.push({name: name1, score: score1})
    }

    //Starting page of the game
    function mainScreen() {
        context.font = '25px nokiafc22'
        context.fillStyle = 'black'
        context.fillText("Click here to start", 200, 220)
    }

    // used in 'Start-button'
    //function to get mouse position
    function getMousePos(canvas, event) {
        var rect = canvas.getBoundingClientRect()
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        }
    }

    //parts of 'Start-button'
    //function to check wheter a point is inside a rectancle
    function isInside(pos, rect) {
        return pos.x > rect.x && pos.x < rect.x+rect.width &&
                pos.y < rect.y+rect.height && pos.y > rect.y
    }

    //'Start-button' placement and click-area
    var rect = {
        x:180,
        y:170,
        width:260,
        height:50
    }
    
    //UI's main/line-button click to start the game
    document.getElementById("line-button").onclick = function() {ButtonStartGame()};

    const ButtonStartGame = () => {
        if (!runGame){
            StartGame()
        }
    }

    function StartGame() {
        console.log("hellow startGame")
        clearCanvas()
            //Game is running = true
            points = 0
            runGame = true
            //console.log(mousePos)
            //console.log(runGame)
            snake = [
                {x: 200, y: 200},
                {x: 160, y: 200},
                {x: 120, y: 200},
                {x: 80, y: 200},
                {x: 40, y: 200},
            ]
            changing_direction = false
            //moving left when starts
            dx = 40;
            dy = 0;
            //starts the game
            if(runGame){
                console.log('the game runs')
                main()
            }
    }

    const main = () => {

        //if (game_end()) return;
        game_end()
        if (runGame == false) return

        changing_direction = false;
        setTimeout(function onTick(){
        clearCanvas()
        drawFood(context, food_x, food_y)
        move_snake()
        drawSnake()

        // points over the canvas
        document.getElementById("points").innerHTML = points;

        //call main again
        main()
        }, 150)
    }
    

    //movements of the snake
    document.addEventListener("keydown", change_direction);
    
    //starting the app with space
    document.addEventListener('keypress', e => {
        if(e.code === 'Space'){
            ButtonStartGame()
        }
    })

    //starting game by mouseclick
    canvas.addEventListener('click', function(evt){
        var mousePos = getMousePos(canvas, evt)

        if (!runGame && isInside(mousePos,rect)) {
            StartGame()
        }
    }, false)

    mainScreen()
    console.log(runGame)
    if (runGame) {
        main()
    }
    //main()
    

        /* PUUTTUVAT TOIMINNOT:             
        8. benchmarkkaus originaaliin 3310 snakeen
        9. korjaukset ylemmän mukaan
        10. Muokkaa osat funktioiksi 
            - (const drawSnake =()=>)
            - const newFood = () =>
        11. Pause button (space?) / tai ehkä ei
        14. toimiminen FPS:nä window.requestAnimationFrame(main) 
        15. poista var ja vaihda let/const
        16. jaa .js ohjelma useampiin alatiedostoihin
        19. Ennätyslistaan omalla nimellä
        2X. funktionaalisten sääntöjen mukaan


        24. Lataa WSL2
        20. Typescriptiksi
            - typescript compiler (TSC)
                - tsc watch (devserver) tsc build ()
            - osaa lukea reactia suoraan
        2X. prettier CLI? (npm install prettier, asenna vscode plugari)
        2x. Eslint (airbnb, google?)
        21. Firebase kautta ennätyslista
        22. Reactiksi

        23. (REMIX)
        
        

        Done:
        1. Liikkuminen "Pixeleittäin" (eikä seinän sisällä)
            - madon koon mukaan (optimikoko??) (25.3.2022)
        2. Madon kasvattaminen (25.3)
        3. Matoon törmääminen (25.3)
        4. Nokia 3310 Design (29.3.2022)
        5. Näppäimistö (3310) ja toiminnallisuudet (29.3.2022)
        6. game-endiin restartti (28.3.2022)
        8. favicon (29.3.2022)
        8. layout grids (29.3.2022)
        7. Start game Spacesta ja nokian päänapista  (30.3.2022)
        9. githubbiin ja gitpages (30.3.2022)
        4. Pisteet canvaksen yläpuolelle vasemmalle (30.3.2022)
        15. media query screen size puhelin, tablet ja tietokone (30.3.2022)
        16. hr-viiva pisteiden alle (2.4.2022)
            - position relative bottom -4px numeron siirtoon
        17. Ennätyslistan tulostaminen (2.8.2022)
        18. Omien pisteiden lisääminen ennätyslistaan ilman nimeä (2.8.2022)
        */
    
}