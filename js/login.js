console.log("Login Page Loaded");

/* ========================= */
/* ELEMENTS */
/* ========================= */

const loginForm =
document.querySelector("form");

const usernameInput =
document.getElementById("username");

const passwordInput =
document.getElementById("password");

/* ========================= */
/* LOGIN */
/* ========================= */

loginForm.addEventListener(

    "submit",

    function(event){

        event.preventDefault();

        const username =

        usernameInput.value.trim();

        const password =

        passwordInput.value.trim();

        const users =

        getUsers();

        const user =

        users.find(function(item){

            return item.username===username &&

            item.password===password;

        });

        if(!user){

            alert(

                "Invalid Username or Password."

            );

            return;

        }

        localStorage.setItem(

            "currentUser",

            user.username

        );

        window.location.href=

        "dashboard.html";

    }

);
