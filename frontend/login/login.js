'use_stric'

function begin_buttons() {
    let login_button = document.getElementById('login')
    let register_button = document.getElementById('register')
    localStorage.removeItem('user')
    login_button.addEventListener('click',() => {
        let menu_login = document.getElementById('menu_login')
        let return_button = document.getElementById('return')
        let play_game = document.getElementById('login_user')

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
            validate_user(user,password)
        })
    })

    register_button.addEventListener('click',() => {
        let menu_register = document.getElementById('menu_register')
        let return_button_2 = document.getElementById('return2')
        menu_register.classList.remove('d-none')
        login_button.classList.add('d-none')
        register_button.classList.add('d-none')
        let play_game = document.getElementById('check_user')

        return_button_2.addEventListener('click',() => {
            menu_register.classList.add('d-none')
            login_button.classList.remove('d-none')
            register_button.classList.remove('d-none')
        })

        play_game.addEventListener('click',() => {
            let user = document.getElementById('user2')
            let password = document.getElementById('password2')
            let re_password = document.getElementById('re_password')
            validate_user(user,password,re_password)
        })
    })
   
}

function validate_user(user,password,re_password=null) {
    if (re_password != null) {
        if (password.value == re_password.value) {  

                fetch('http://localhost:2500/api/users/'+user.value)
                .then((response) => {
                    if (response.ok) {
                        window.alert('User has been existed')
                    } else {
                        new_user(user.value,password.value)
                        window.alert('User has created and now,login')
                    }
                })
        } else {
            window.alert('Password and RePassword arent the same')
        }
    } else {
        fetch('http://localhost:2500/api/users/'+user.value)
        .then(response => response.json())
        .then(data => password.value == data.password ? login_user(data.username) : window.alert('Password Incorrect'));
    }
}


function login_user(ref) {
    localStorage.setItem('color','green')
    localStorage.setItem('user',ref)
    location.href="game/game.html"
}

function new_user(user,password) {

    let users_lenght = fetch('http://localhost:2500/api/users')
    .then(response => response.json())
    .then(data => data.length);

    users_lenght.then((data) => {
        user_json = {"ref": parseInt(data)+1,"username": user,"password":password}
        
        fetch('http://localhost:2500/api/users', {
            method: 'POST',
            body: JSON.stringify(user_json), 
            headers:{
              'Content-Type': 'application/json'
            }
          }).then(res => res.json())
          .catch(error => console.error('Error:', error))
          .then(response => console.log('Success:', response));
    })

}
begin_buttons()