'use_strict'
function charge_user() {
    //Charge de data of user and highscore when user select mode of game
    let mode_game = localStorage.getItem('mode')
    let user_id = localStorage.getItem('user')
    let highscore = document.getElementById('high_score')
    let mode_highscore = "highscore_"
    let table_highscore = document.getElementById('table_highscore')

    switch (parseInt(mode_game)) {
        case 0:
            mode_highscore += "normal"
            break;
        case 1:
            mode_highscore += "avant"
            break;
        case 2:
            mode_highscore += "pro"
            break;
        default:
            break;
    }

    localStorage.setItem('mode_highscore',mode_highscore)

    //Data about highscore table
    fetch('http://localhost:2500/api/'+mode_highscore)
    .then(response => response.json())
    .then((data) => {
        let x = 10
        if (data.length < 10) {
            x = data.length
        }
        console.table(data)
        for ( let i=0 ; i < x ; i++) {
            let username = fetch('http://localhost:2500/api/users/'+data[i].ref_user)
            .then(response => response.json())
            .then((data) => { return data.username});
            username.then((user) => {
                table_highscore.innerHTML += "<tr><td>"+user+"</td><td>"+data[i].score+"</td></tr>"
            })
        }
    });

    //Update highscore of user
    fetch('http://localhost:2500/api/users/'+user_id)
    .then(response => response.json())
    .then((data) => {
        fetch('http://localhost:2500/api/'+mode_highscore+'/'+user_id)
        .then((response) => {
            if (response.ok == false) {
                highscore.innerHTML = 0
            } else {
                data = response.json()
                data.then(value => highscore.innerHTML = value.score)
            }
        })
    });

}

function load_img_user() {
    //Load main info of user
    let user_id = localStorage.getItem('user')
    let username_perfil = document.getElementById('username_perfil')
    let avatar = document.getElementById('avatar')

    fetch('http://localhost:2500/api/users/'+user_id)
    .then(response => response.json())
    .then((data) => {
        username_perfil.innerHTML = data.username
        avatar.src = "https://avatars.dicebear.com/api/male/"+data.username+".svg?"
    })
}

function select_mode_game(type) {
    //It depends of mode of game ,it will charge a different menu
    let description_game = document.getElementById('description_game')
    localStorage.removeItem('score')
    localStorage.removeItem('apple')
    localStorage.removeItem('velocity')
    localStorage.removeItem('dead')
    localStorage.removeItem('range_bomb')
    document.getElementById('description_game').classList.remove('d-none')
    description_game.innerHTML = ""
    let head = ""
    let body = ""
    let footer = "<button id='play_game_"+type+"' class='button_play' onclick='type_game("+type+")'>Play Game</button>"
    switch (type) {
        case 0:
            document.getElementById('description_game').classList.add('description_game')
            head += "<h3>Classic Game</h3>"
            body += "<span>You must be survive as logn as posible with classic mode,but when the bigger you are, the harder and the faster will be<span><br><br><span>Features:</span><br><ul><li>Velocity:Normal</li><li>Extra: None</li></ul>"
            description_game.innerHTML= head + "<br>" + body + "<br>" +footer

            break;
        case 1:
            document.getElementById('description_game').classList.add('description_game')
            head += "<h3>Avant Game</h3>"
            body += "<span>Avant Game is the same than classic game but when snake eats an apple , a wall will appear in the area and the snake will move more faster<span><br><br><span>Features:</span><br><ul><li>Velocity:High</li><li>Extra: <br><ul><li>Walls</li></li></ul>"
            description_game.innerHTML= head + "<br>" + body + "<br>" +footer

            break;
        case 2:
            document.getElementById('description_game').classList.add('description_game')       
            head += "<h3>Pro Game</h3>"
            body += "<span>Pro Game is the same than classic game but when snake eats an apple , a bomb will appear in the area ,which can kill snake and the snake will move more faster<span><br><br><span>Features:</span><br><ul><li>Velocity:High</li><li>Extra: <br><ul><li>Bombs</li></li></ul>"
            description_game.innerHTML= head + "<br>" + body + "<br>" +footer

            break;       
        default:
            break;
    }

    //When restart button is selected, for charging the same mode

    if (localStorage.getItem('reload') == 0) {
        localStorage.setItem('reload',false)
        document.getElementById('classic_mode_button').click()
        document.getElementById('play_game_0').click()
    } else if (localStorage.getItem('reload') == 1) {
        localStorage.setItem('reload',false)
        document.getElementById('avant_mode_button').click()
        document.getElementById('play_game_1').click()
    } else if (localStorage.getItem('reload') == 2) {
        localStorage.setItem('reload',false)
        document.getElementById('pro_mode_button').click()
        document.getElementById('play_game_2').click()
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
    change_color_snake.disabled = true

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

async function pro_game(description_game,mode_games,highscore,score,table_score,base_game,button_game) {
    
    mode_games.classList.add('d-none')
    mode_games.classList.remove('mode_games')
    description_game.classList.add('d-none')
    description_game.classList.remove('description_game')
    highscore.classList.remove('d-none')
    score.classList.remove('d-none')
    table_score.classList.remove('d-none')
    base_game.classList.remove('d-none')
    button_game.classList.remove('d-none')
    change_color_snake.disabled = true

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
            let velocity = 600
            localStorage.setItem('velocity',velocity)
            
            interval_game(direccion,snake,squares,velocity)
            bombs_mode(snake,squares)
            restart_button.addEventListener("click",() => {
               window.location.reload()
               localStorage.setItem('reload',2)
            })
        }
    })
}

async function avant_game(description_game,mode_games,highscore,score,table_score,base_game,button_game) {
    
    mode_games.classList.add('d-none')
    mode_games.classList.remove('mode_games')
    description_game.classList.add('d-none')
    description_game.classList.remove('description_game')
    highscore.classList.remove('d-none')
    score.classList.remove('d-none')
    table_score.classList.remove('d-none')
    base_game.classList.remove('d-none')
    button_game.classList.remove('d-none')
    change_color_snake.disabled = true

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
            let velocity = 800
            localStorage.setItem('velocity',velocity)
            
            interval_game(direccion,snake,squares,velocity)

            restart_button.addEventListener("click",() => {
               window.location.reload()
               localStorage.setItem('reload',1)
            })
        }
    })
}

function bombs_mode(snake,squares) {
    //Start appear bombs in the map
    let appear_bombs = setInterval(() => {
        if (localStorage.getItem('dead')) {
            clearInterval(appear_bombs)
        } else {
            start_bombs(snake,squares)
        }
    }, 3500);
}

function start_bombs(snake,squares) {
    //For calculating the aerea of bombs
    let bomb = Math.floor(Math.random() * (401 - 1) + 1)

    if (snake.includes(bomb)) {
        start_bombs(snake)
    } else {
        localStorage.setItem('bomb',bomb)
        squares[bomb].classList.add("bomb")


        setTimeout(() => {
            squares[bomb].classList.remove("bomb")
            let range_bomb = [
                parseInt(bomb),
                bomb-39,
                bomb-19,
                parseInt(bomb)+1,
                parseInt(bomb)+21,
                parseInt(bomb)+41,
                bomb-18,
                parseInt(bomb)+2,
                parseInt(bomb)+22,
                parseInt(bomb)+3,
                parseInt(bomb)+20,
                parseInt(bomb)+40,
                parseInt(bomb)+60,
                bomb-20,
                bomb-40,
                bomb-60,
                bomb-41,
                bomb-21,
                bomb-1,
                parseInt(bomb)+19,
                parseInt(bomb)+39,
                bomb-22,
                bomb-2,
                parseInt(bomb)+18,
                bomb-3
            ]
            if (bomb%20 == 0) { //These ifs is for calculate range of explosion with is near to border of base
                range_bomb.splice(16,9)
            }
            if (((bomb%20)-1) == 0) {
                range_bomb.splice(21,4)
            }
            if (((bomb%20)-2) == 0) {
                range_bomb.splice(24,1)
            }
            if ((parseInt(bomb)+1)%20 == 0) {
                range_bomb.splice(1,9)
            }
            if ((parseInt(bomb)+2)%20 == 0) {
                range_bomb.splice(6,4)
            }
            if ((parseInt(bomb)+3)%20 == 0) {
                range_bomb.splice(9,1)
            }

            localStorage.setItem('range_bomb', JSON.stringify(range_bomb));

            //The limits of the range of bombs
            range_bomb.forEach(element => {
                if ( element <= 400 && element >= 0 && element != null && element != undefined) {
                    squares[element].classList.add("explosion")
                }
            });
            setTimeout(() => {
                range_bomb.forEach(element => {
                    if ( element <= 400 && element >= 0 && element != null && element != undefined) {
                        squares[element].classList.remove("explosion")
                    }
                    localStorage.removeItem('range_bomb')                
                });
            }, 1250);
        }, 2000);

    }

}
function freeze_blocks(snake,squares) {
    //Its for create a wall when snake eat an apple
    let snake_block = snake.map((value, index) => {
        if (index > snake.length-3)
        {
            return null
        }
        return value
    })

    snake_block.forEach((value, index) => {
        if (snake_block[index] != null) {
            squares[snake_block[index]].classList.add("wall")
        }
    })
    
    setTimeout(() => {
        snake_block.forEach((value, index) => {
            if (snake_block[index] != null) {
                squares[snake_block[index]].classList.remove("wall")
            }
        })
    }, 8000);
}
function velocity_snake(time_game,direccion,snake,squares) {
    //it depens on the mode and score, the velocity will be different
    let score = localStorage.getItem('score')
    let mode = localStorage.getItem('mode')
    let velocity;
    switch (parseInt(score)) {
        case 200:
                switch (parseInt(mode)) {
                    case 0:
                    velocity = 800
                        break;
                    case 1:
                    velocity = 600
                        break;
                    case 2:
                    velocity = 500
                        break;
                    default:
                        break;
                }
                change_velocity(velocity,time_game,direccion,snake,squares)
            break;
        case 400:
            switch (parseInt(mode)) {
                case 0:
                velocity = 600
                    break;
                case 1:
                velocity = 400
                    break;
                case 2:
                velocity = 350
                    break;
                default:
                    break;
            }
                change_velocity(velocity,time_game,direccion,snake,squares)
            break;
        case 600:
            switch (parseInt(mode)) {
                case 0:
                velocity = 450
                    break;
                case 1:
                velocity = 300
                    break;
                case 2:
                velocity = 200
                    break;
                default:
                    break;
            }
                change_velocity(velocity,time_game,direccion,snake,squares)
            break;
        case score>800:
            switch (parseInt(mode)) {
                case 0:
                velocity = 350
                    break;
                case 1:
                velocity = 150
                    break;
                case 2:
                velocity = 100
                    break;
                default:
                    break;
            }
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
    //The direccions to each level
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
    //Generate a random apple
    snake.push(eat_apple)
    squares[eat_apple].classList.remove("apple")
    let apple = Math.floor(Math.random() * (401 - 1) + 1);
    if (snake.includes(apple)) {
        apple(snake,squares,eat_apple)
    }
    squares[apple].classList.add("apple")
    localStorage.setItem('apple',apple)
    if (localStorage.getItem('mode') == 1) {
        freeze_blocks(snake,squares)
    }
}

function dead(snake,squares,time_game) {
    //When snake dead,there are different type to dead
    localStorage.setItem('dead',true)
    clearInterval(time_game)
    squares[localStorage.getItem("apple")].classList.remove("apple")
    squares[snake[0]].classList.remove("head")
    let game_over = [107,108,109,110,111,126,127,128,129,130,131,132,145,147,149,151,153,165,166,168,169,170,172,173,185,187,189,191,193,206,207,208,209,210,211,212,227,228,229,230,231,248,249,250]
    let array_lick = [269,271,289,290,311]
    snake.forEach((value) => {
        squares[value].style.backgroundColor = "transparent"
    })
    squares.forEach((value, index) => {
        squares[index].classList.remove("wall")
        squares[index].classList.add("base_dead")
    })
    game_over.forEach((value) => {
        squares[value].classList.add("game_over")
    })
    array_lick.forEach((value) => {
        squares[value].classList.add("lick")
    })

    let user_id = localStorage.getItem('user')
    let mode_game = localStorage.getItem('mode_highscore')
    let scored = 0
    if (localStorage.getItem('score')) {
        scored = localStorage.getItem('score')
    }
    let user_json = {ref_user: user_id, score: scored}

    //When snake died, put the new puntuation
    fetch('http://localhost:2500/api/'+mode_game+'/'+user_id)
        .then((response) => {
            if (response.ok == false) {
                fetch('http://localhost:2500/api/'+mode_game, {
                    method: 'POST',
                    body: JSON.stringify(user_json), 
                    headers:{
                      'Content-Type': 'application/json'
                    }
                  }).then(res => res.json())
                  .catch(error => console.error('Error:', error))
                  .then(response => console.log('Success:', response));
            } else {
                data = response.json()
                data.then((value) => {
                    if (scored > value.score) {
                        fetch('http://localhost:2500/api/'+mode_game+'/'+user_id+'/'+scored)
                        .then(response => response.json())
                    }
                })
            }
        })
}
async function movement_snake(snake,squares,direccion,time_game) {
    let eat_apple = parseInt(localStorage.getItem('apple'))
    squares[snake[0]].style.backgroundColor = "transparent"
    snake.shift()
    
    squares[snake[snake.length-1]].classList.remove("head")
    let new_part_snake = snake[snake.length-1]+direccion
    
    if (snake.includes(new_part_snake) ||
    new_part_snake < 0 ||
    new_part_snake > 400 || 
    new_part_snake%20 == 0 && direccion == 1 ||
    (new_part_snake+1)%20 == 0 && direccion == -1
    )
    {
        dead(snake,squares,time_game)
        }
        
        snake.push(new_part_snake)
        
        if (snake.includes(eat_apple)) {
            score()
            apple(snake,squares,eat_apple)
        }
        
        snake.forEach(element => {
            squares[element].style.backgroundColor = localStorage.getItem('color')
        });
        squares[snake[snake.length-1]].classList.add("head")
        
        let mistake;
        if (localStorage.getItem('mode') == 1) {
            
            let squares_block = document.querySelectorAll(".wall")
            if (squares_block.length != 0 || range_bomb != null) {

                squares_block.forEach((value) => { if(value.classList.contains("head")){mistake=true}})
                
                if (mistake){
                    dead(snake,squares,time_game)
                }
            }
        } else if (localStorage.getItem('mode') == 2) {
            let range_bomb = JSON.parse(localStorage.getItem('range_bomb'))
            if (range_bomb != null) {
                snake.forEach((value) => { if(range_bomb.includes(value)){mistake=true}})
                if (mistake){
                    dead(snake,squares,time_game)
                }
            }
        }


    //console.log(snake)
}

async function create_base_game(base_game) {
    //Function for creating the base of the game
    for ( let i = 0; i < 400 ; i++) {
        let square = document.createElement("div")
        square.classList.add("square")
        base_game.appendChild(square)
    }
    let squares = document.querySelectorAll(".base div");
    let snake = [0,1,2,3]
    snake.forEach(element => {
        squares[element].style.backgroundColor = localStorage.getItem('color')
    });
    return snake
}
function score() {
    //Function to change score
    let score = document.getElementById('number_score')
    new_score = parseInt(score.innerHTML)+100
    score.innerHTML = new_score
    localStorage.setItem('score',new_score)

}

function type_game(type) {
    //Charge the type game
    let description_game = document.getElementById('description_game')
    let mode_games = document.getElementById('mode_games')
    let highscore = document.getElementById('highscore')
    let score = document.getElementById('score')
    let table_score = document.getElementById('table-score')
    let base_game = document.getElementById('base_game')
    let button_game = document.getElementById('button_game')
    let return_button = document.getElementById('return_button')

 

    return_button.addEventListener("click",() => {window.location.reload()})
    document.getElementById('table_highscore').innerHTML = " "
    switch (type) {
        case 0:
            localStorage.setItem('mode',0)
            classic_mode(description_game,mode_games,highscore,score,table_score,base_game,button_game)
            break;
        case 1:
            localStorage.setItem('mode',1)
            avant_game(description_game,mode_games,highscore,score,table_score,base_game,button_game)
            break;
        case 2:
            localStorage.setItem('mode',2)
            pro_game(description_game,mode_games,highscore,score,table_score,base_game,button_game)
            break;
        default:
            break;
    }
    charge_user()
}

function logout() {
    //User logout
    let button_logout = document.getElementById('logout')
    button_logout.addEventListener('click',() => {
        localStorage.removeItem('user')
        localStorage.removeItem('mode_highscore')
        localStorage.removeItem('mode')
        localStorage.removeItem('bomb')
        location.href="../index.html"

    })
}
function color_snake() {
    let color = document.getElementById('change_color_snake')
    color.value = localStorage.getItem('color')
    color.addEventListener('mouseout',() => { 
        localStorage.setItem('color',color.value)
    })
}
color_snake()
logout()
load_img_user()
select_mode_game()
