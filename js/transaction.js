console.log("Transaction Page Loaded");

/* ========================= */
/* ELEMENTS */
/* ========================= */

const transactionBody =
    document.getElementById("transaction_body");

const addTransactionBtn =
    document.getElementById("open_modal");

const transactionModal =
    document.getElementById("transaction_modal");

const closeModalBtn =
    document.getElementById("close_modal");

const saveTransactionBtn =
    document.getElementById("save_transaction");

const searchInput =
    document.getElementById("search_transaction");

const categoryFilter =
    document.getElementById("category_filter");

const typeFilter =
    document.getElementById("type_filter");

const sortFilter =
    document.getElementById("sort_filter");

const totalTransactions =
    document.getElementById("total_transactions");

const monthlyTransactions =
    document.getElementById("monthly_transactions");

const transactionIncome =
    document.getElementById("transaction_income");

const transactionExpense =
    document.getElementById("transaction_expense");

const exportButton =
    document.getElementById("export_csv");
/* ========================= */
/* EDIT MODE */
/* ========================= */

let editingTransactionId = null;

/* ========================= */
/* LOAD TRANSACTIONS */
/* ========================= */

function loadTransactions() {

    transactionBody.innerHTML = "";

    let filteredTransactions = [...getTransactions()];

    filteredTransactions = searchTransactions(filteredTransactions);

    filteredTransactions = filterCategory(filteredTransactions);

    filteredTransactions = filterType(filteredTransactions);

    filteredTransactions = sortTransactions(filteredTransactions);

    filteredTransactions.forEach(function (transaction) {

        createTransactionRow(transaction);


    });
    loadTransactionSummary();

}

/* ========================= */
/* SUMMARY CARDS */
/* ========================= */

function loadTransactionSummary() {

    const transactions = getTransactions();

    let income = 0;

    let expense = 0;

    let thisMonth = 0;

    const today = new Date();

    transactions.forEach(function (transaction) {

        if (transaction.type === "Income") {

            income += transaction.amount;

        }

        else {

            expense += transaction.amount;

        }

        const transactionDate = new Date(transaction.date);

        if (

            transactionDate.getMonth() === today.getMonth() &&

            transactionDate.getFullYear() === today.getFullYear()

        ) {

            thisMonth++;

        }

    });

    totalTransactions.textContent =

        transactions.length;

    monthlyTransactions.textContent =

        thisMonth;

    transactionIncome.textContent =

        formatCurrency(income);

    transactionExpense.textContent =

        formatCurrency(expense);

}
/* ========================= */
/* EXPORT CSV */
/* ========================= */

function exportTransactions() {

    const transactions = getTransactions();

    let csv =

        "Date,Title,Category,Type,Amount,Payment Method\n";

    transactions.forEach(function (transaction) {

        csv +=

            `${transaction.date},` +

            `${transaction.title},` +

            `${transaction.category},` +

            `${transaction.type},` +

            `${transaction.amount},` +

            `${transaction.paymentMethod || ""}\n`;

    });

    const blob =

        new Blob(

            [csv],

            { type: "text/csv" }

        );

    const url =

        URL.createObjectURL(blob);

    const link =

        document.createElement("a");

    link.href = url;

    link.download =

        "transactions.csv";

    link.click();

    URL.revokeObjectURL(url);

}

function createTransactionRow(transaction) {

    const row = document.createElement("tr");
    row.innerHTML = `
<td>${transaction.date}</td>

<td title="${transaction.notes || ''}">
    ${transaction.title}
</td>

<td>${transaction.category}</td>

<td>${transaction.type}</td>

<td>
<span class="payment_method ${transaction.paymentMethod.replace(/\s+/g,'_').toLowerCase()}">
${transaction.paymentMethod}
</span>
</td>

<td>${formatCurrency(transaction.amount)}</td>

<td>

<button class="view_btn"
onclick="viewTransaction(${transaction.id})">
View
</button>

<button class="duplicate_btn"
onclick="duplicateTransaction(${transaction.id})">
Duplicate
</button>

<button class="edit_btn"
onclick="editTransaction(${transaction.id})">
Edit
</button>

<button class="delete_btn"
onclick="openDeleteModal(${transaction.id})">
Delete
</button>

</td>
`;

    transactionBody.appendChild(row);

}
/* ========================= */
/* ADD TRANSACTION */
/* ========================= */

const transactionTitle =
    document.getElementById("transaction_title");

const transactionCategory =
    document.getElementById("transaction_category");

const transactionAmount =
    document.getElementById("transaction_amount");

const transactionType =
    document.getElementById("transaction_type");

const transactionDate =
    document.getElementById("transaction_date");

const paymentMethod =
    document.getElementById("payment_method");

const transactionNotes =
    document.getElementById("transaction_notes");
const transactionRecurring =
    document.getElementById("transaction_recurring");

function openTransactionModal() {

    editingTransactionId = null;

    transactionTitle.value = "";

    transactionCategory.value = "";

    transactionAmount.value = "";

    transactionType.value = "Expense";

    transactionDate.value = "";
    paymentMethod.value = "UPI";

    transactionNotes.value = "";
    transactionRecurring.value ="No";

    transactionModal.style.display = "flex";

}
function closeTransactionModal() {

    transactionModal.style.display = "none";

}
function saveTransaction() {
    console.log("Save button clicked");

    if (transactionTitle.value === "") {

        alert("Enter transaction title.");

        return;

    }

    if (transactionAmount.value === "") {

        alert("Enter amount.");

        return;

    }

    if (transactionDate.value === "") {

        alert("Select a date.");

        return;

    }

    const transaction = {

        id: editingTransactionId || Date.now(),

        title: transactionTitle.value,

        category: transactionCategory.value,

        amount: Number(transactionAmount.value),

        type: transactionType.value,

        paymentMethod: paymentMethod.value,

        notes: transactionNotes.value,
        recurring: transactionRecurring.value,


        date: transactionDate.value

    };

    if (editingTransactionId) {

        updateTransaction(transaction);

    }

    else {

        addTransaction(transaction);

    }

    editingTransactionId = null;

    loadTransactions();

    closeTransactionModal();

}


addTransactionBtn.addEventListener("click", function () {

    openTransactionModal();

});

closeModalBtn.addEventListener("click", function () {

    closeTransactionModal();

});

saveTransactionBtn.addEventListener("click", function () {

    saveTransaction();

});
exportButton.addEventListener(

    "click",

    exportTransactions

);

function viewTransaction(id) {

    const transactions =

        getTransactions();

    const transaction =

        transactions.find(function (item) {

            return item.id === id;

        });

    if (!transaction) {

        return;

    }

    viewTitle.textContent =

        transaction.title;

    viewCategory.textContent =

        transaction.category;

    viewType.textContent =

        transaction.type;

    viewAmount.textContent =

        formatCurrency(transaction.amount);

    viewPayment.textContent =

        transaction.paymentMethod;

    viewDate.textContent =

        transaction.date;

    viewNotes.textContent =

        transaction.notes || "No Notes";

    viewModal.style.display =

        "flex";

}

/* ========================= */
/* DELETE TRANSACTION */
/* ========================= */

let deleteTransactionId = null;

const deleteModal =
    document.getElementById("delete_transaction_modal");

const cancelDelete =
    document.getElementById("cancel_delete");

const confirmDelete =
    document.getElementById("confirm_delete");
const viewModal =
    document.getElementById("view_transaction_modal");

const closeView =
    document.getElementById("close_view");

const viewTitle =
    document.getElementById("view_title");

const viewCategory =
    document.getElementById("view_category");

const viewType =
    document.getElementById("view_type");

const viewAmount =
    document.getElementById("view_amount");

const viewPayment =
    document.getElementById("view_payment");

const viewDate =
    document.getElementById("view_date");

const viewNotes =
    document.getElementById("view_notes");
function openDeleteModal(id) {

    deleteTransactionId = id;

    deleteModal.style.display = "flex";

}
function closeDeleteModal() {

    deleteModal.style.display = "none";

}
function confirmTransactionDelete() {

    if (deleteTransactionId == null) {

        return;

    }

    deleteTransaction(deleteTransactionId);

    deleteTransactionId = null;

    loadTransactions();

    closeDeleteModal();

}
cancelDelete.addEventListener("click", function () {

    closeDeleteModal();

});

confirmDelete.addEventListener("click", function () {

    confirmTransactionDelete();

});
/* ========================= */
/* SEARCH */
/* ========================= */

function searchTransactions(transactionList) {

    const keyword =

        searchInput.value.toLowerCase();

    if (keyword === "") {

        return transactionList;

    }

    return transactionList.filter(function (transaction) {

        return transaction.title

            .toLowerCase()

            .includes(keyword);

    });

}
/* ========================= */
/* CATEGORY FILTER */
/* ========================= */

function filterCategory(transactionList) {

    if (categoryFilter.value === "All Categories") {

        return transactionList;

    }

    return transactionList.filter(function (transaction) {

        return transaction.category ===

            categoryFilter.value;

    });

}
/* ========================= */
/* TYPE FILTER */
/* ========================= */

function filterType(transactionList) {

    if (typeFilter.value === "All Types") {

        return transactionList;

    }

    return transactionList.filter(function (transaction) {

        return transaction.type ===

            typeFilter.value;

    });

}
/* ========================= */
/* SORT */
/* ========================= */

function sortTransactions(transactionList) {

    const list = [...transactionList];

    switch (sortFilter.value) {

        case "Newest":

            list.sort(function (a, b) {

                return new Date(b.date) -

                    new Date(a.date);

            });

            break;

        case "Oldest":

            list.sort(function (a, b) {

                return new Date(a.date) -

                    new Date(b.date);

            });

            break;

        case "Highest":

            list.sort(function (a, b) {

                return b.amount - a.amount;

            });

            break;

        case "Lowest":

            list.sort(function (a, b) {

                return a.amount - b.amount;

            });

            break;

    }

    return list;

}
searchInput.addEventListener(

    "keyup",

    loadTransactions

);

categoryFilter.addEventListener(

    "change",

    loadTransactions

);

typeFilter.addEventListener(

    "change",

    loadTransactions

);

sortFilter.addEventListener(

    "change",

    loadTransactions

);

window.addEventListener("click", function (event) {

    if (event.target === transactionModal) {

        closeTransactionModal();

    }
    if (event.target === deleteModal) {

        closeDeleteModal();

    }
    if (event.target === viewModal) {

        viewModal.style.display = "none";

    }

});
function editTransaction(id) {

    const transactions = getTransactions();

    const transaction = transactions.find(function (item) {

        return item.id == id;

    });


    if (!transaction) {

        return;

    }

    editingTransactionId = transaction.id;

    transactionTitle.value = transaction.title;

    transactionCategory.value = transaction.category;

    transactionAmount.value = transaction.amount;

    transactionType.value = transaction.type;
    paymentMethod.value = transaction.paymentMethod;

    transactionNotes.value = transaction.notes;
    transactionRecurring.value =

        transaction.recurring || "No";

    transactionDate.value = transaction.date;

    transactionModal.style.display = "flex";

}
function duplicateTransaction(id) {

    const transactions =

        getTransactions();

    const transaction =

        transactions.find(function (item) {

            return item.id === id;

        });

    if (!transaction) {

        return;

    }

    const duplicate = {

        ...transaction,

        id: Date.now(),

        date: new Date()

            .toISOString()

            .split("T")[0]

    };

    addTransaction(duplicate);

    loadTransactions();

}

closeView.addEventListener(

    "click",

    function () {

        viewModal.style.display =

            "none";

    }

);
/* ========================= */
/* INITIALIZE */
/* ========================= */

function initializeTransaction() {

    loadTransactions();

    if (typeof applyTheme === "function") {

        applyTheme();

    }

}

document.addEventListener("DOMContentLoaded", function () {

    initializeTransaction();

});