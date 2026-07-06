function applyTheme(){

    const theme =
    localStorage.getItem("theme") || "light";

    if(theme==="dark"){

        document.body.classList.add("dark");

    }

    else{

        document.body.classList.remove("dark");

    }

}

function toggleTheme(){

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){

        localStorage.setItem("theme","dark");

    }

    else{

        localStorage.setItem("theme","light");

    }

}
function formatCurrency(amount){

    return "₹" +

    Number(amount).toLocaleString("en-IN");

}
function formatDate(date){

    return new Date(date)

    .toLocaleDateString(

        "en-IN",

        {

            day:"2-digit",

            month:"short",

            year:"numeric"

        }

    );

}
function logout(){

    localStorage.removeItem(

        "currentUser"

    );

    window.location.href=

    "login.html";

}



function highlightSidebar(){

    const currentPage =

    window.location.pathname

    .split("/")

    .pop();

    const links =

    document.querySelectorAll(".side_bar a");

    links.forEach(function(link){

        if(

            link.getAttribute("href")===currentPage

        ){

            link.classList.add("active");

        }

    });

}
document.addEventListener(

    "DOMContentLoaded",

    function(){

        checkLogin();

        applyTheme();

        highlightSidebar();

    }

);
function checkLogin(){

    if(document.body.classList.contains("login")){
        return;
    }

    if(!localStorage.getItem("currentUser")){
        window.location.href = "login.html";
    }

}