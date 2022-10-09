'use_stric'

function begin_buttons() {
    let login_button = document.getElementById('login')
    let register_button = document.getElementById('register')

    login_button.addEventListener('click',() => {
        let menu_login = document.getElementById('menu_login')
        let return_button = document.getElementById('return')
        let play_game = document.getElementById('check_user')

        menu_login.classList.remove('d-none')
        login_button.classList.add('d-none')
        register_button.classList.add('d-none')

        return_button.addEventListener('click',() => {
            menu_login.classList.add('d-none')
            login_button.classList.remove('d-none')
            register_button.classList.remove('d-none')
        })

        play_game.addEventListener('click',() => {
            // let menu = document.getElementById('menu')
            // menu.classList.add('d-none')
            let user = document.getElementById('user')
            let password = document.getElementById('password')
            let check_user = validate_user(user,password)
        })
    })

    register_button.addEventListener('click',() => {
        let menu_register = document.getElementById('menu_register')
        let return_button_2 = document.getElementById('return2')
        menu_register.classList.remove('d-none')
        login_button.classList.add('d-none')
        register_button.classList.add('d-none')

        return_button_2.addEventListener('click',() => {
            menu_register.classList.add('d-none')
            login_button.classList.remove('d-none')
            register_button.classList.remove('d-none')
        })
    })
   
}

function validate_user(user,password,re_password=null) {
    if (re_password != null) {
        console.log("error")
    } else {
        // console.log(user.value,password.value)
       console.log(fields)
    }
}
begin_buttons()