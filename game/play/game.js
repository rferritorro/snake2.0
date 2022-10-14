'use_strict'

function select_mode_game(type) {
    let description_game = document.getElementById('description_game')
    localStorage.removeItem('score')
    localStorage.removeItem('apple')
    localStorage.removeItem('velocity')

    description_game.innerHTML = ""
    let head = ""
    let body = ""
    let footer = "<button id='play_game_"+type+"' onclick='type_game("+type+")'>Play Game</button>"
    switch (type) {
        case 0:
            head += "<h3>Classic Game</h3>"
            body += "<span>You must be survive as logn as posible with classic mode,but when the bigger you are, the harder and the faster will be<span>"
            description_game.innerHTML= head + "<br>" + body + "<br>" +footer

            break;
        case 1:
            head += "<h3>Avant Game</h3>"
            body += "<span>You must be survive as logn as posible with classic mode,but when the bigger you are, the harder and the faster will be<span>"
            description_game.innerHTML= head + "<br>" + body + "<br>" +footer

            break;
        case 2:
            head += "<h3>Pro Game</h3>"
            body += "<span>You must be survive as logn as posible with classic mode,but when the bigger you are, the harder and the faster will be<span>"
            description_game.innerHTML= head + "<br>" + body + "<br>" +footer

            break;       
        default:
            break;
    }

    if (localStorage.getItem('reload') == 0) {
        localStorage.setItem('reload',1)
        document.getElementById('classic_mode_button').click()
        document.getElementById('play_game_0').click()
    }
}

async function classic_mode(description_game,mode_games,highscore,score,table_score,base_game,button_game) {
    

    mode_games.classList.add('d-none')
    mode_games.classList.remove('mode_games')
    description_game.classList.add('d-none')
    description_game.classList.remove('description_game')
    highscore.classList.remove('d-none')
    score.classList.remove('d-none')
    table_score.classList.remove('d-none')
    base_game.classList.remove('d-none')
    button_game.classList.remove('d-none')

    let start_button = document.getElementById('start_game')
    let restart_button = document.getElementById('restart_game')

    let snake = await create_base_game(base_game)
    start_button.addEventListener("click",() => {
         if (snake) {
            start_button.classList.add("d-none")
            restart_button.classList.remove("d-none")
            let squares = document.querySelectorAll(".base div");
            let direccion = 1
            let first_apple = Math.floor(Math.random() * (401 - 1) + 1);
            localStorage.setItem('apple',first_apple)
            squares[first_apple].classList.add("apple")
            let velocity = 1000
            localStorage.setItem('velocity',velocity)
            
            interval_game(direccion,snake,squares,velocity)

            restart_button.addEventListener("click",() => {
               window.location.reload()
               localStorage.setItem('reload',0)
            })
        }
    })
    
}

function velocity_snake(time_game,direccion,snake,squares) {
    let score = localStorage.getItem('score')
    let velocity;
    console.log(velocity)
    switch (parseInt(score)) {
        case 200:
                velocity= 800
                change_velocity(velocity,time_game,direccion,snake,squares)
            break;
        case 400:
                velocity= 600
                change_velocity(velocity,time_game,direccion,snake,squares)
            break;
        case 600:
                velocity= 400
                change_velocity(velocity,time_game,direccion,snake,squares)
            break;
        case score>800:
                velocity= 250
                change_velocity(velocity,time_game,direccion,snake,squares)
            break;
        default:
            break;
    }
}

function change_velocity(velocity,time_game,direccion,snake,squares) {
    let current_velocity = localStorage.getItem('velocity')
    if (current_velocity != velocity) {
        localStorage.setItem('velocity',velocity)
        clearInterval(time_game)
        interval_game(direccion,snake,squares,velocity)
    } else {
        velocity = current_velocity
    }
}
function interval_game(direccion,snake,squares,velocity) {
    let time_game;
    time_game= setInterval(() => {
        document.addEventListener("keyup",(event) => {
            let old_direccion = direccion
            switch (event.key) {
                case "ArrowUp":
                    direccion = -20
                    break;
                case "ArrowDown":
                    direccion = 20
                    break;
                case "ArrowRight":
                    direccion = 1 
                    break;
                case "ArrowLeft":
                    direccion = -1
                    break;
                default:
                    break;
                        }
          if (direccion == -(old_direccion)) {
            direccion=old_direccion
          }
        })
            movement_snake(snake,squares,direccion,time_game)
            velocity_snake(time_game,direccion,snake,squares)
        }, velocity);
   }

function apple(snake,squares,eat_apple) {
    snake.push(eat_apple)
    squares[eat_apple].classList.remove("apple")
    let apple = Math.floor(Math.random() * (401 - 1) + 1);
    squares[apple].classList.add("apple")
    localStorage.setItem('apple',apple)

}
function dead(snake,squares,time_game) {
    clearInterval(time_game)
    squares[localStorage.getItem("apple")].classList.remove("apple")
    squares[snake[0]].classList.remove("head")
    let game_over = [107,108,109,110,111,126,127,128,129,130,131,132,145,147,149,151,153,165,166,168,169,170,172,173,185,187,189,191,193,206,207,208,209,210,211,212,227,228,229,230,231,248,249,250]
    let array_lick = [269,271,289,290,311]
    snake.forEach((value) => {
        squares[value].classList.remove("snake")
    })
    squares.forEach((value, index) => {
        squares[index].classList.add("base_dead")
    })
    game_over.forEach((value) => {
        squares[value].classList.add("game_over")
    })
    array_lick.forEach((value) => {
        squares[value].classList.add("lick")
    })
}
async function movement_snake(snake,squares,direccion,time_game) {
    let eat_apple = parseInt(localStorage.getItem('apple'))

    squares[snake[0]].classList.remove("snake")
    snake.shift()
    squares[snake[snake.length-1]].classList.remove("head")
    let new_part_snake = snake[snake.length-1]+direccion

    if (snake.includes(new_part_snake) ||
        new_part_snake < 0 ||
        new_part_snake > 400 || 
        new_part_snake%20 == 0 && direccion == 1 ||
        (new_part_snake+1)%20 == 0 && direccion == -1
    ) {
        dead(snake,squares,time_game)
    }
    snake.push(new_part_snake)
    
    if (snake.includes(eat_apple)) {
        score()
        apple(snake,squares,eat_apple)
    }

    snake.forEach(element => {
        squares[element].classList.add("snake")
    });
    squares[snake[snake.length-1]].classList.add("head")
    //console.log(snake)
}

async function create_base_game(base_game) {
    for ( let i = 0; i < 400 ; i++) {
        let square = document.createElement("div")
        square.classList.add("square")
        base_game.appendChild(square)
    }
    let squares = document.querySelectorAll(".base div");
    let snake = [0,1,2,3,4,5]
    snake.forEach(element => {
        squares[element].classList.add("snake")
    });
    return snake
}
function score() {
    let score = document.getElementById('number_score')
    new_score = parseInt(score.innerHTML)+100
    score.innerHTML = new_score
    localStorage.setItem('score',new_score)

}
function snake() {
    
}

function type_game(type) {
    let description_game = document.getElementById('description_game')
    let mode_games = document.getElementById('mode_games')
    let highscore = document.getElementById('highscore')
    let score = document.getElementById('score')
    let table_score = document.getElementById('table-score')
    let base_game = document.getElementById('base_game')
    let button_game = document.getElementById('button_game')
    let return_button = document.getElementById('return_button')

 

    return_button.addEventListener("click",() => {window.location.reload()})

    switch (type) {
        case 0:
            classic_mode(description_game,mode_games,highscore,score,table_score,base_game,button_game)
            break;
        default:
            break;
    }
}
select_mode_game()