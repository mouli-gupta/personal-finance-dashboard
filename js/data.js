console.log("Data Loaded");

/* ========================= */
/* INITIALIZE STORAGE */
/* ========================= */

if(localStorage.getItem("users")==null){

    localStorage.setItem(

        "users",

        JSON.stringify(defaultUsers)

    );

}

/* ========================= */
/* LOAD USERS */
/* ========================= */

let users = JSON.parse(

    localStorage.getItem("users")

);

/* ========================= */
/* SAVE USERS */
/* ========================= */

function saveUsers(){

    localStorage.setItem(

        "users",

        JSON.stringify(users)

    );

}

/* ========================= */
/* CURRENT USER */
/* ========================= */

function getCurrentUser(){

    const username =

    localStorage.getItem("currentUser");

    if(!username){

        window.location.href =

        "login.html";

        return null;

    }

    const user = users.find(function(item){

        return item.username===username;

    });

    if(!user){

        localStorage.removeItem(

            "currentUser"

        );

        window.location.href =

        "login.html";

        return null;

    }

    return user;

}

function getUsers(){

    return users;

}
/* ========================= */
/* PROFILE */
/* ========================= */

function getProfile(){

    return getCurrentUser().profile;

}

function updateProfile(data){

    const user =

    getCurrentUser();

    user.profile.fullName =

    data.fullName;

    user.username =

    data.username;
    localStorage.setItem(

    "currentUser",

    data.username

);

    user.profile.username =

    data.username;

    user.profile.email =

    data.email;

    user.profile.phone =

    data.phone;

    user.profile.country =

    data.country;

    saveUsers();

}
/* ========================= */
/* GOALS */
/* ========================= */

function getGoals(){

    return getCurrentUser().goals;

}

function updateGoals(data){

    const user =

    getCurrentUser();

    user.goals.totalSavings =

    data.totalSavings;

    user.goals.savingsGoal =

    data.savingsGoal;

    user.goals.monthlyTarget =

    data.monthlyTarget;

    user.goals.targetDate =

    data.targetDate;

    saveUsers();

}
/* ========================= */
/* PREFERENCES */
/* ========================= */

function getPreferences(){

    return getCurrentUser().preferences;

}

function updatePreferences(data){

    const user =

    getCurrentUser();

    user.preferences.currency =

    data.currency;

    user.preferences.theme =

    data.theme;

    user.preferences.language =

    data.language;

    user.preferences.notification =

    data.notification;

    saveUsers();

}
/* ========================= */
/* TRANSACTIONS */
/* ========================= */

function getTransactions(){

    return getCurrentUser().transactions;

}

function addTransaction(transaction){

    const user =

    getCurrentUser();

    user.transactions.push(transaction);

    saveUsers();

}
function deleteTransaction(id){

    const user =

    getCurrentUser();

    user.transactions =

    user.transactions.filter(function(transaction){

        return transaction.id!==id;

    });

    saveUsers();

}
function updateTransaction(updatedTransaction){

    const user =

    getCurrentUser();

    for(

        let i=0;

        i<user.transactions.length;

        i++

    ){

        if(

            user.transactions[i].id===

            updatedTransaction.id

        ){

            user.transactions[i]=

            updatedTransaction;

            break;

        }

    }

    saveUsers();

}
function getRecentTransactions(limit=5){

    const sorted =

    [...getTransactions()];

    sorted.sort(function(a,b){

        return new Date(b.date)-

        new Date(a.date);

    });

    return sorted.slice(0,limit);

}
/* ========================= */
/* CALCULATIONS */
/* ========================= */

function calculateTotalIncome(selectedMonth){

    const transactions = getTransactions();

    let total = 0;

    transactions.forEach(function(transaction){

        const transactionMonth =

        new Date(transaction.date).getMonth();

        if(

            transaction.type==="Income" &&

            transactionMonth===selectedMonth

        ){

            total += Number(transaction.amount);

        }

    });

    return total;

}
function calculateTotalExpense(selectedMonth){

    console.log("Selected Month:", selectedMonth);

    const transactions = getTransactions();

    let total = 0;

    transactions.forEach(function(transaction){

        const transactionMonth = new Date(transaction.date).getMonth();

        console.log(transaction.title, transactionMonth);

        if(
            transaction.type === "Expense" &&
            transactionMonth === selectedMonth
        ){

            total += Number(transaction.amount);

        }

    });

    return total;

}
function calculateBalance(selectedMonth){

    return calculateTotalIncome(selectedMonth) -

           calculateTotalExpense(selectedMonth);

}
function calculateMonthlySavings(selectedMonth){

    return calculateBalance(selectedMonth);

}
function calculateSavingsRate(selectedMonth){

    const income =

    calculateTotalIncome(selectedMonth);

    if(income===0){

        return 0;

    }

    return Math.round(

        (

            calculateMonthlySavings(selectedMonth)

            /

            income

        ) * 100

    );

}
/* ========================= */
/* DASHBOARD SUMMARY */
/* ========================= */

function getDashboardSummary(selectedMonth){

    return{

        income:

        calculateTotalIncome(selectedMonth),

        expense:

        calculateTotalExpense(selectedMonth),

        balance:

        calculateBalance(selectedMonth),

        savings:

        calculateMonthlySavings(selectedMonth),

        savingsRate:

        calculateSavingsRate(selectedMonth)

    };

}
/* ========================= */
/* CATEGORY TOTALS */
/* ========================= */

function getCategoryTotals(selectedMonth){

    const transactions = getTransactions();

    let totals = {};

    transactions.forEach(function(transaction){

        const transactionMonth =

        new Date(transaction.date).getMonth();

        if(

            transaction.type==="Expense" &&

            transactionMonth===selectedMonth

        ){

            if(totals[transaction.category]){

                totals[transaction.category] +=

                Number(transaction.amount);

            }

            else{

                totals[transaction.category] =

                Number(transaction.amount);

            }

        }

    });

    return totals;

}
/* ========================= */
/* MONTHLY TOTALS */
/* ========================= */

function getMonthlyTotals(){

    const transactions =

    getTransactions();

    let monthlyData = {};

    transactions.forEach(function(transaction){

        const month =

        transaction.date.substring(0,7);

        if(!monthlyData[month]){

            monthlyData[month]={

                income:0,

                expense:0

            };

        }

        if(transaction.type==="Income"){

            monthlyData[month].income+=

            transaction.amount;

        }

        else{

            monthlyData[month].expense+=

            transaction.amount;

        }

    });

    return monthlyData;

}