console.log("Insights Page Loaded");
let expenseChartObject = null;
let cashFlowChartObject = null;
let monthlyCompareChartObject = null;
let spendingTrendChartObject = null;
/* ========================= */
/* ELEMENTS */
/* ========================= */

const userName =
    document.getElementById("user_name");

const highestExpense =
    document.getElementById("highest_expense");

const highestIncome =
    document.getElementById("highest_income");

const averageSpend =
    document.getElementById("average_spend");

const savingRate =
    document.getElementById("saving_rate");

const categoryList =
    document.getElementById("category_list");

const insightOne =
    document.getElementById("insight_one");

const insightTwo =
    document.getElementById("insight_two");

const insightThree =
    document.getElementById("insight_three");

const insightFour =
    document.getElementById("insight_four");
    
const expenseChart =
    document.getElementById("expenseChart");

const cashFlowChart =
    document.getElementById("cashFlowChart");

const monthlyCompareChart =
    document.getElementById("monthlyCompareChart");

const spendingTrendChart =
    document.getElementById("spendingTrendChart");
/* ========================= */
/* USER */
/* ========================= */

function loadUser() {

    const user =

        localStorage.getItem("profileName") ||

        "User";

    userName.textContent =

        "Welcome, " + user;

}
/* ========================= */
/* SUMMARY CARDS */
/* ========================= */

function loadSummaryCards() {

    const transactions =

        getTransactions();

    let income = 0;

    let expense = 0;

    let highestExpenseAmount = 0;

    let highestIncomeAmount = 0;

    let highestExpenseCategory = "";

    let highestIncomeSource = "";

    transactions.forEach(function (transaction) {

        if (transaction.type === "Income") {

            income += transaction.amount;

            if (transaction.amount > highestIncomeAmount) {

                highestIncomeAmount =

                    transaction.amount;

                highestIncomeSource =

                    transaction.title;

            }

        }

        else {

            expense += transaction.amount;

            if (transaction.amount > highestExpenseAmount) {

                highestExpenseAmount =

                    transaction.amount;

                highestExpenseCategory =

                    transaction.category;

            }

        }

    });

    highestExpense.textContent =

        formatCurrency(highestExpenseAmount);

    highestIncome.textContent =

        formatCurrency(highestIncomeAmount);

    const monthlyTotals = getMonthlyTotals();

    const months = Object.keys(monthlyTotals).length;

    averageSpend.textContent =

        formatCurrency(expense / months);

    if (income === 0) {

        savingRate.textContent = "0%";

    }

    else {

        const rate =

            ((income - expense) / income) * 100;

        savingRate.textContent =

            rate.toFixed(1) + "%";

    }

    highestExpense.nextElementSibling.textContent =

        highestExpenseCategory;

    highestIncome.nextElementSibling.textContent =

        highestIncomeSource;

}
/* ========================= */
/* EXPENSE PIE CHART */
/* ========================= */
function loadExpenseChart() {

const currentMonth = new Date().getMonth();

const categories = getCategoryTotals(currentMonth);
    const labels = Object.keys(categories);

    const data = Object.values(categories);

    if (expenseChartObject) {

        expenseChartObject.destroy();

    }

    const ctx = document
        .getElementById("expenseChart")
        .getContext("2d");
        console.log(labels);
console.log(data);

    expenseChartObject = new Chart(ctx, {

        type: "doughnut",

        data: {

            labels: labels,

            datasets: [{

                data: data,

                backgroundColor: [

                    "#3B82F6",

                    "#22C55E",

                    "#F59E0B",

                    "#EF4444",

                    "#8B5CF6",

                    "#06B6D4",

                    "#64748B"

                ],

                borderWidth: 0

            }]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            cutout: "70%",

            plugins: {

                legend: {

                    display: false

                }

            }

        }

    });

}
/* ========================= */
/* INCOME VS EXPENSE */
/* ========================= */

function loadCashFlowChart(){

    const currentMonth = new Date().getMonth();

    const transactions = getTransactions();

    let income = 0;

    let expense = 0;

    transactions.forEach(function(transaction){

        const month = new Date(transaction.date).getMonth();

        if(month === currentMonth){

            if(transaction.type === "Income"){

                income += Number(transaction.amount);

            }

            else{

                expense += Number(transaction.amount);

            }

        }

    });

    if(cashFlowChartObject){

        cashFlowChartObject.destroy();

    }

    const ctx = cashFlowChart.getContext("2d");

    cashFlowChartObject = new Chart(ctx,{

        type:"bar",

        data:{

            labels:["Income","Expenses"],

            datasets:[{

                data:[income,expense],

                backgroundColor:[

                    "#4CAF50",

                    "#EF5350"

                ],

                borderRadius:8

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
/* CATEGORY ANALYSIS */
/* ========================= */

function loadCategoryAnalysis() {

    const transactions = getTransactions();

    const categories = {};

    transactions.forEach(function (transaction) {

        if (transaction.type === "Expense") {

            if (categories[transaction.category]) {

                categories[transaction.category] += transaction.amount;

            }

            else {

                categories[transaction.category] = transaction.amount;

            }

        }

    });

    categoryList.innerHTML = "";

    Object.entries(categories).forEach(function (item) {

        const category = item[0];

        const amount = item[1];

        const li = document.createElement("li");

        li.innerHTML = `

            <span>${category}</span>

            <span>${formatCurrency(amount)}</span>

        `;

        categoryList.appendChild(li);

    });

}

/* ========================= */
/* MONTHLY COMPARISON */
/* ========================= */

function loadMonthlyComparison() {

    const monthlyTotals = getMonthlyTotals();

    const monthLabels = [

        "Jan","Feb","Mar","Apr","May","Jun",

        "Jul","Aug","Sep","Oct","Nov","Dec"

    ];

    const incomeData = new Array(12).fill(0);

    const expenseData = new Array(12).fill(0);

    for(const month in monthlyTotals){

        const monthIndex = Number(month.split("-")[1]) - 1;

        incomeData[monthIndex] = monthlyTotals[month].income;

        expenseData[monthIndex] = monthlyTotals[month].expense;

    }

if(monthlyCompareChartObject){

    monthlyCompareChartObject.destroy();

}

    const ctx =

        document.getElementById("monthlyCompareChart")

        .getContext("2d");

monthlyCompareChartObject = new Chart(ctx,{
        type:"bar",

        data:{

            labels:monthLabels,

            datasets:[

                {

                    label:"Income",

                    data:incomeData,

                    backgroundColor:"#22C55E"

                },

                {

                    label:"Expenses",

                    data:expenseData,

                    backgroundColor:"#EF4444"

                }

            ]

        },

        options:{

            responsive:true,

            maintainAspectRatio:true,

            aspectRatio:1.8

        }

    });

}

/* ========================= */
/* MONTHLY SPENDING TREND */
/* ========================= */

function loadSpendingTrend() {

    const monthlyTotals = getMonthlyTotals();

    const monthLabels = [

        "Jan","Feb","Mar","Apr","May","Jun",

        "Jul","Aug","Sep","Oct","Nov","Dec"

    ];

    const expenseData = new Array(12).fill(0);

    for(const month in monthlyTotals){

        const monthIndex = Number(month.split("-")[1]) - 1;

        expenseData[monthIndex] = monthlyTotals[month].expense;

    }

if(spendingTrendChartObject){

    spendingTrendChartObject.destroy();

}

    const ctx =

        document.getElementById("spendingTrendChart")

        .getContext("2d");

spendingTrendChartObject = new Chart(ctx,{

        type:"line",

        data:{

            labels:monthLabels,

            datasets:[{

                label:"Expenses",

                data:expenseData,

                borderColor:"#EF4444",

                backgroundColor:"rgba(239,68,68,0.15)",

                fill:true,

                tension:0.4

            }]

        },

        options:{

            responsive:true,

            maintainAspectRatio:true,

            aspectRatio:2,

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
/* FINANCIAL INSIGHTS */
/* ========================= */

function loadFinancialInsights() {

    const transactions = getTransactions();

    let income = 0;

    let expense = 0;

    const categories = {};

    transactions.forEach(function (transaction) {

        if (transaction.type === "Income") {

            income += transaction.amount;

        }

        else {

            expense += transaction.amount;

            if (categories[transaction.category]) {

                categories[transaction.category] += transaction.amount;

            }

            else {

                categories[transaction.category] = transaction.amount;

            }

        }

    });

    let highestCategory = "";

    let highestAmount = 0;

    Object.entries(categories).forEach(function (item) {

        if (item[1] > highestAmount) {

            highestAmount = item[1];

            highestCategory = item[0];

        }

    });

    const percentage =

        expense === 0

            ? 0

            : ((highestAmount / expense) * 100).toFixed(1);

    insightOne.textContent =

        `${highestCategory} accounts for ${percentage}% of your expenses.`;

    insightTwo.textContent =

        `Total income is ${formatCurrency(income)}.`;

    insightThree.textContent =

        `Total expenses are ${formatCurrency(expense)}.`;

    const savings = income - expense;

    insightFour.textContent =

        `Current savings are ${formatCurrency(savings)}.`;

}

function refreshInsights() {

    loadSummaryCards();

    loadExpenseChart();

    loadCashFlowChart();

    loadCategoryAnalysis();

    loadMonthlyComparison();

    loadSpendingTrend();

    loadFinancialInsights();

}

function initializeInsights() {

    loadUser();
    refreshInsights();

    loadSummaryCards();

    loadExpenseChart();

    loadCashFlowChart();

    loadCategoryAnalysis();

    loadMonthlyComparison();

    loadSpendingTrend();

    loadFinancialInsights();

    applyTheme();

}
document.addEventListener("DOMContentLoaded", function () {

    initializeInsights();

});