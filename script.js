import { drawFood } from "./drawFood.js"
import { clearCanvas } from "./clearCanvas.js"
import { moveSnake } from "./moveSnake.js"
import { randomFood } from "./randomFood.js"
import { genFood } from "./genFood.js"
import { drawSnake } from "./drawSnake.js"
//import { wait } from "./wait.js" //Kutsutaan gameEnd:stä (pian :D)
import { gameEnd } from "./gameEnd.js"
//import {  } from "./moving.js"
import { mainScreen } from "./mainScreen.js"
import { change_direction } from "./changeDirection.js"

/*
    Lista muuttujista ja tyypeistä?
    


*/
window.onload = function (){
    let canvas_let = document.getElementById("canvas");
    let context_let = canvas.getContext("2d")
    
    //canvas size 18*11
    // 680 * 440 and snake 40 pixels
    console.log(canvas_let.width)
    console.log(canvas_let.height)

    //koko pelin objekti game, joka sisältää
    //pelin, pelilaudan ja käärmeen muuttujat
    let game = {
        canvas: canvas_let,
        context: context_let,
        playerName: "Käärme666",
        isRunning: false,
        snake : {
            place:[
                {x: 200, y: 200},
                {x: 160, y: 200},
                {x: 120, y: 200},
                {x: 80, y: 200},
                {x: 40, y: 200},
            ],
            direction: {x: 40, y: 0},
            movements: [], // max items 2, jossa sisältö "direction"-objekteja?
            points: 0,
            foodPos: {
                x: 100, //randomFood(0, canvas_let.width - 40), 
                y: 100 //randomFood(0, canvas_let.height - 40)
            },
            changingDirection: false
        }
    }

    // Moving from UI-keyboard
    document.getElementById("moveUp").onclick = function(){change_direction("ArrowUp", game)};
    document.getElementById("moveDown").onclick = function(){change_direction("ArrowDown", game)};
    document.getElementById("moveRight").onclick = function(){change_direction("ArrowRight", game)};
    document.getElementById("moveLeft").onclick = function(){change_direction("ArrowLeft", game)};

    // UI's main/line-button click to start the game
    document.getElementById("line-button").onclick = function() {ButtonStartGame()};

    // Function to get mouse position to click the
    // screen's "Click here" to start the game
    function getMousePos(canvas, event) {
        let rect = canvas.getBoundingClientRect()
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        }
    }

    // Function to check wheter a point is inside a rectancle
    function isInside(pos, rect) {
        return pos.x > rect.x && pos.x < rect.x+rect.width &&
                pos.y < rect.y+rect.height && pos.y > rect.y
    }

    // 'Start-button' placement and click-area
    const rect = {
        x:180, y:170, width:260, height:50
    }

    const ButtonStartGame = () => {
        if (!game.isRunning){
            StartGame()
        }
    }

    const StartGame = () => {
        console.log("Hello SnakeWorld")
        clearCanvas(game.context, game.canvas)
            game.snake.points = 0
            game.isRunning = true
            game.snake.place = [
                {x: 200, y: 200},
                {x: 160, y: 200},
                {x: 120, y: 200},
                {x: 80, y: 200},
                {x: 40, y: 200},
            ]
            game.snake.changingDirection = false
            // Moving left when starts
            game.snake.direction.x = 40;
            game.snake.direction.y = 0;
            // Generates food position
            game = genFood(game)
            // Starts the game
            if(game.isRunning){
                console.log('the game runs')
                main()
            }
    }

    const main = () => {

        // If gameEnd() then return;
        //game = 
        gameEnd(game)

        if (game.isRunning === false) return

        game.snake.changingDirection = false;

        setTimeout(function onTick(){
            clearCanvas(game.context, game.canvas)
            drawFood(game.context, game.snake)
            game = moveSnake(game) 
            drawSnake(game)
            // points over the canvas
            document.getElementById("points").innerHTML = game.snake.points;
            //call main again
            main()
        }, 150) //GameSpeed
    }
    

    // Movements of the snake from Keyboard
    document.addEventListener('keydown', (event) => { change_direction(event, game)});
    
    // EventListener to start the game from keyboard's space
    document.addEventListener('keypress', e => {
        if(e.code === 'Space'){
            ButtonStartGame()
        }
    })

    // Starting game by mouseclick
    game.canvas.addEventListener('click', function(evt){
        let mousePos = getMousePos(game.canvas, evt)

        if (!game.isRunning && isInside(mousePos,rect)) {
            StartGame()
        }
    }, false)

    mainScreen(game)
    if (game.isRunning) {
        main()
    }
    //main()
    
        //aliohjelmoimisen jälkeen ongelmana ruuan generointi,
        //muuttujat food_x ja food_y ei muutu pääohjelmassa

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
        32. StartGame omaksi tiedostokseen
        33. Palauttaako nä funktiot jotain vai miten tuo objekti välillä oikein toimii :D

        30. Ensimmäinen ruoka voi tällä hetkellä olla madon alla,
            koska generoidaan vain satunnaisesti :o
            mahd ratkaisu. movesnaken has eaten food trueksi
            kun ohjelma alkaa (Eli tulisko lisätä objektiin game.snake?)
        31. Madon liikkumisesta: jos mato ei ole tehnyt aikaisempaa liikettä,
            se ei ota muistiin toista liikettä (esimerkkitapaus, nopea käännös).
            Tämän vuoksi voi joskus tuntua ettei mato tottele näppämistöä.
            ^^Voikohan tuon kehittää toimimaan paremmin?
                - Liikkeet arrayna jossa maksimissaan kaksi arvoa?
                - käytännössä jokaisessa liikkeessä poistaisi aina ensimmäisenä tulleen
                  arvon (FIFO) ja suoraan mentäessä arrayssa ei olisi arvoja 


        
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
        24. Lataa WSL2 (10.8.2022)
        25. Komponentteja omiksi tiedostoiksi
        26. Luotu objekti "game" hallitsemaan pelin muuttujia (18.8.2022)
        27. Muokattu drawSnake erikseen ja poistettu erillinen snakePart funktio(24.8.2022)
        28. genFood toimii viimein, kirjoitus virhe y ja x :D (24.8.2022)
        29. changeDirection.js kansiokseen ja muutettu toimimaan näppäimistöstä ja UI:stä (25.8.2022)
        */
    
}