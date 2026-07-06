let expenseChartObject = null;
let cashflowChartObject = null;
console.log("Dashboard Loaded");

/* ========================= */
/* ELEMENTS */
/* ========================= */

const userName = document.getElementById("user_name");

const totalBalance = document.getElementById("total_balance");

const totalIncome = document.getElementById("total_income");

const totalExpense = document.getElementById("total_expense");

const totalSavings = document.getElementById("total_savings");

const expenseChart = document.getElementById("expense_chart");

const cashflowChart = document.getElementById("cashflow_chart");

const transactionList = document.getElementById("transaction_list");

const goalTarget = document.getElementById("goal_target");

const goalCurrent = document.getElementById("goal_current");

const goalRemaining = document.getElementById("goal_remaining");

const progressFill = document.getElementById("progress_fill");

const progressText = document.getElementById("progress_text");

function loadUser(){

    const user = getProfile();

    userName.textContent = "Welcome, " + user.fullName;

}

function loadSummaryCards(){

const currentMonth = new Date().getMonth();

const summary = getDashboardSummary(currentMonth);
    totalBalance.textContent = formatCurrency(summary.balance);

    totalIncome.textContent = formatCurrency(summary.income);

    totalExpense.textContent = formatCurrency(summary.expense);

    totalSavings.textContent = formatCurrency(summary.savings);

}

function loadSavingsGoal(){

    const goal = getGoals();

    goalTarget.textContent = formatCurrency(goal.savingsGoal);

    goalCurrent.textContent = formatCurrency(goal.totalSavings);

    const remaining =

        goal.savingsGoal - goal.totalSavings;

    goalRemaining.textContent =

        formatCurrency(remaining);

    const percentage =

        (goal.totalSavings / goal.savingsGoal) * 100;

    progressFill.style.width =

        percentage + "%";

    progressText.textContent =

        Math.round(percentage) + "% Completed";

}
function loadExpenseChart(){

const currentMonth = new Date().getMonth();

const categoryTotals = getCategoryTotals(currentMonth);
    const labels = Object.keys(categoryTotals);

    const values = Object.values(categoryTotals);

    if(expenseChartObject){

        expenseChartObject.destroy();

    }
    console.log(labels);
console.log(values);

    expenseChartObject = new Chart(expenseChart,{

        type:"doughnut",

        data:{

            labels:labels,

            datasets:[{

                data:values,

                backgroundColor:[

                    "#368CBF",

                    "#7EBC59",

                    "#F4B400",

                    "#EF5350",

                    "#9C27B0",

                    "#26C6DA",

                    "#FF7043"

                ],

                borderWidth:0

            }]

        },

        options:{

            responsive:true,

            maintainAspectRatio:false,

            cutout:"70%",

            plugins:{

                legend:{

                    display:false

                }

            }

        }

    });

}

function loadExpenseBreakdown(){

    const list = document.getElementById("expense_breakdown");

    list.innerHTML = "";

const currentMonth = new Date().getMonth();

const categoryTotals = getCategoryTotals(currentMonth);
const colors = [

    "#368CBF", // Housing

    "#7EBC59", // Food

    "#F4B400", // Utilities

    "#EF5350", // Transport

    "#9C27B0", // Entertainment

    "#26C6DA", // Investment

    "#FF7043", // Shopping

    "#4F46E5", // Healthcare

    "#10B981"  // Travel

];

    let index=0;

    for(const category in categoryTotals){

        const li=document.createElement("li");

        li.innerHTML=

        `
        <span class="dot"
        style="background:${colors[index]};"></span>

        <span class="category">

            ${category}

        </span>

        <span class="amount">

            ${formatCurrency(categoryTotals[category])}

        </span>
        `;

        list.appendChild(li);

        index++;

    }

}


function loadCashFlowChart(){

    const currentMonth = new Date().getMonth();

    const transactions = getTransactions();

    let income = 0;

    let expense = 0;

    transactions.forEach(function(transaction){

        const transactionMonth = new Date(transaction.date).getMonth();

        if(transactionMonth === currentMonth){

            if(transaction.type === "Income"){

                income += Number(transaction.amount);

            }

            else{

                expense += Number(transaction.amount);

            }

        }

    });

    if(cashflowChartObject){

        cashflowChartObject.destroy();

    }

    const ctx = cashflowChart.getContext("2d");

    cashflowChartObject = new Chart(ctx,{

        type:"bar",

        data:{

            labels:["Income","Expenses"],

            datasets:[{

                label:"Amount",

                data:[income,expense],

                backgroundColor:[

                    "#22C55E",

                    "#EF4444"

                ],

                borderRadius:12

            }]

        },

        options:{

            responsive:true,

            maintainAspectRatio:false,

            plugins:{

                legend:{

                    display:false

                }

            },

            scales:{

                y:{

                    beginAtZero:true

                }

            }

        }

    });

}
/* ========================= */
/* RECENT TRANSACTIONS */
/* ========================= */

function loadRecentTransactions(){

    transactionList.innerHTML = "";

    const recent = getRecentTransactions(5);

    recent.forEach(function(transaction){

        const li = document.createElement("li");

        li.className = "transaction_item";

        const amountClass =

            transaction.type === "Income"

            ? "income"

            : "expense";

        const sign =

            transaction.type === "Income"

            ? "+"

            : "-";

        li.innerHTML =

        `
        <div class="transaction_info">

            <h5 class="transaction_name">

                ${transaction.title}

            </h5>

            <p class="transaction_category">

                ${transaction.category}

            </p>

        </div>

        <span class="transaction_amount ${amountClass}">

            ${sign}${formatCurrency(transaction.amount)}

        </span>
        `;

        transactionList.appendChild(li);

    });

}
function initializeDashboard(){

    loadUser();

    loadSummaryCards();

    loadExpenseChart();

    loadExpenseBreakdown();

    loadCashFlowChart();

    loadRecentTransactions();

    loadSavingsGoal();

    applyTheme();

}

initializeDashboard();