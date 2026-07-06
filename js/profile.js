console.log("Profile Page Loaded");
/* ========================= */
/* PROFILE ELEMENTS */
/* ========================= */

const profileName = document.getElementById("profile_name");

const profileUsername = document.getElementById("profile_username");

const profileEmail = document.getElementById("profile_email");

const memberSince = document.getElementById("member_since");

/* ========================= */
/* FINANCIAL SUMMARY */
/* ========================= */

const currentBalance = document.getElementById("current_balance");

const monthlyIncome = document.getElementById("monthly_income");

const monthlyExpense = document.getElementById("monthly_expense");

const monthlySavings = document.getElementById("monthly_savings");

const savingRate = document.getElementById("saving_rate");
const financialMonth =
    document.getElementById("financial_month");

financialMonth.addEventListener("change", function () {

    loadFinancialSummary();

});/* ========================= */
/* GOALS */
/* ========================= */

const totalSaving = document.getElementById("total_savings");

const savingGoal = document.getElementById("saving_goal");

const monthlyTarget = document.getElementById("monthly_target");

const targetDate = document.getElementById("target_date");

/* ========================= */
/* PREFERENCES */
/* ========================= */

const currencySelect = document.getElementById("currency_select");

const themeSelect = document.getElementById("theme_select");

const languageSelect = document.getElementById("language_select");

const notificationToggle = document.getElementById("notification_toggle");
function loadProfile(){


    const user = getProfile();
    console.log(user);

    profileName.textContent = user.fullName;

    profileUsername.textContent = user.username;

    profileEmail.textContent = user.email;

    memberSince.textContent = user.memberSince;

}
function loadFinancialSummary(){

const currentMonth = new Date().getMonth();

const selectedMonth =
    Number(financialMonth.value);

const summary =
    getDashboardSummary(selectedMonth);
    currentBalance.textContent = formatCurrency(summary.balance);

    monthlyIncome.textContent = formatCurrency(summary.income);

    monthlyExpense.textContent = formatCurrency(summary.expense);

    monthlySavings.textContent = formatCurrency(summary.savings);

    savingRate.textContent = summary.savingsRate + "%";

}
financialMonth.addEventListener("change", function(){

    loadFinancialSummary();

});
function loadGoals(){

    const goal = getGoals();

    totalSaving.textContent = formatCurrency(goal.totalSavings);

    savingGoal.textContent = formatCurrency(goal.savingsGoal);

    monthlyTarget.textContent = formatCurrency(goal.monthlyTarget);

    targetDate.textContent = goal.targetDate;
    if(goal.totalSavings > goal.savingsGoal){

    totalSaving.style.color = "#4CAF50";


}

else{

    totalSaving.style.color = "";

}

}
function loadPreferences(){

    const preference = getPreferences();

    currencySelect.value = preference.currency;

    themeSelect.value = preference.theme;

    languageSelect.value = preference.language;

    notificationToggle.checked = preference.notification;

}



/* ========================= */
/* EDIT PROFILE */
/* ========================= */

const editProfileBtn = document.getElementById("edit_profile_btn");

const editProfileModal = document.getElementById("edit_profile_modal");

const editName = document.getElementById("edit_name");

const editUsername = document.getElementById("edit_username");

const editEmail = document.getElementById("edit_email");

const editPhone = document.getElementById("edit_phone");

const editCountry = document.getElementById("edit_country");

const cancelEdit = document.getElementById("cancel_edit");

const saveEdit = document.getElementById("save_edit");
function openEditProfile(){

    const user = getProfile();

    editName.value = user.fullName;

    editUsername.value = user.username;

    editEmail.value = user.email;

    editPhone.value = user.phone;

    editCountry.value = user.country;

    editProfileModal.style.display = "flex";

}
function closeEditProfile(){

    editProfileModal.style.display = "none";

}
function saveProfileChanges(){
    const users = getUsers();

const currentUser = getCurrentUser();

const usernameExists = users.some(function(user){

    return user.username===editUsername.value &&

    user.username!==currentUser.username;

});

if(usernameExists){

    alert("Username already exists.");

    return;

}
if(editName.value.trim()===""){

    alert("Please enter your full name.");

    return;

}

if(editUsername.value.trim()===""){

    alert("Please enter a username.");

    return;

}

if(editEmail.value.trim()===""){

    alert("Please enter an email.");

    return;

}
const emailPattern =

/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if(!emailPattern.test(editEmail.value.trim())){

    alert("Please enter a valid email address.");

    return;

}
if(editPhone.value.trim()===""){

    alert("Please enter a phone number.");

    return;

}
const phonePattern = /^[0-9]{10}$/;

if(!phonePattern.test(editPhone.value.trim())){

    alert("Phone number must contain exactly 10 digits.");

    return;

}

if(editCountry.value.trim()===""){

    alert("Please enter your country.");

    return;

}

    const updatedProfile = {

        fullName: editName.value,

        username: editUsername.value,

        email: editEmail.value,

        phone: editPhone.value,

        country: editCountry.value

    };

    updateProfile(updatedProfile);

    loadProfile();

    closeEditProfile();

}
editProfileBtn.addEventListener("click",function(){

    openEditProfile();

});

cancelEdit.addEventListener("click",function(){

    closeEditProfile();

});

saveEdit.addEventListener("click",function(){

    saveProfileChanges();

});

/* ========================= */
/* CHANGE PASSWORD */
/* ========================= */

const changePasswordBtn = document.getElementById("change_password_btn");

const passwordModal = document.getElementById("password_modal");

const currentPassword = document.getElementById("current_password");

const newPassword = document.getElementById("new_password");

const confirmPassword = document.getElementById("confirm_password");

const cancelPassword = document.getElementById("cancel_password");

const savePassword = document.getElementById("save_password");



function openPasswordModal(){

    currentPassword.value="";

    newPassword.value="";

    confirmPassword.value="";

    passwordModal.style.display="flex";

}
function closePasswordModal(){

    passwordModal.style.display="none";

}
function updatePassword(){

    const user =

    getCurrentUser();

    if(currentPassword.value!==user.password){

        alert("Current password is incorrect.");

        return;

    }

const passwordPattern =

/^(?=.*[A-Za-z])(?=.*\d).{6,}$/;

if(!passwordPattern.test(newPassword.value)){

    alert(

        "Password must be at least 6 characters and contain both letters and numbers."

    );

    return;

}

    if(newPassword.value!==confirmPassword.value){

        alert("Passwords do not match.");

        return;

    }

    user.password =

    newPassword.value;

    saveUsers();

    alert("Password updated successfully.");

    closePasswordModal();

}
changePasswordBtn.addEventListener("click",function(){

    openPasswordModal();

});

cancelPassword.addEventListener("click",function(){

    closePasswordModal();

});

savePassword.addEventListener("click",function(){

    updatePassword();

});

/* ========================= */
/* FINANCIAL GOALS */
/* ========================= */

const editGoalBtn = document.getElementById("edit_goal_btn");

const goalModal = document.getElementById("goal_modal");

const editTotalSaving = document.getElementById("edit_total_saving");

const editSavingGoal = document.getElementById("edit_saving_goal");

const editMonthlyTarget = document.getElementById("edit_monthly_target");

const editTargetDate = document.getElementById("edit_target_date");

const cancelGoal = document.getElementById("cancel_goal");

const saveGoal = document.getElementById("save_goal");
function openGoalModal(){

    const goal = getGoals();

    editTotalSaving.value = goal.totalSavings;

    editSavingGoal.value = goal.savingsGoal;

    editMonthlyTarget.value = goal.monthlyTarget;

    editTargetDate.value = goal.targetDate;

    goalModal.style.display = "flex";

}
function closeGoalModal(){

    goalModal.style.display = "none";

}
function saveGoalChanges(){
    if(Number(editTotalSaving.value) < 0){

    alert("Total savings cannot be negative.");

    return;

}

if(Number(editSavingGoal.value) <= 0){

    alert("Savings goal must be greater than zero.");

    return;

}

if(Number(editMonthlyTarget.value) <= 0){

    alert("Monthly target must be greater than zero.");

    return;

}

if(editTargetDate.value===""){

    alert("Please select a target date.");

    return;

}

    const updatedGoals = {

        totalSavings: Number(editTotalSaving.value),

        savingsGoal: Number(editSavingGoal.value),

        monthlyTarget: Number(editMonthlyTarget.value),

        targetDate: editTargetDate.value

    };

updateGoals(updatedGoals);

loadGoals();

loadFinancialSummary();

closeGoalModal();

}
editGoalBtn.addEventListener("click",function(){

    openGoalModal();

});

cancelGoal.addEventListener("click",function(){

    closeGoalModal();

});

saveGoal.addEventListener("click",function(){

    saveGoalChanges();

});

/* ========================= */
/* PREFERENCES */
/* ========================= */

function savePreferenceSettings(){

    const updatedPreferences = {

        currency: currencySelect.value,

        theme: themeSelect.value,

        language: languageSelect.value,

        notification: notificationToggle.checked

    };

    updatePreferences(updatedPreferences);

    loadPreferences();

    applyTheme();

}
currencySelect.addEventListener("change",function(){

    savePreferenceSettings();

});

themeSelect.addEventListener("change",function(){

    savePreferenceSettings();

});

languageSelect.addEventListener("change",function(){

    savePreferenceSettings();

});

notificationToggle.addEventListener("change",function(){

    savePreferenceSettings();

});


/* ========================= */
/* EXPORT TRANSACTIONS */
/* ========================= */

const exportBtn = document.getElementById("export_btn");

function exportTransactions(){

    const transactionList = getTransactions();

    if(transactionList.length===0){

        alert("No transactions available.");

        return;

    }

    let csv = "Title,Category,Amount,Type,Date\n";

    transactionList.forEach(function(transaction){

        csv +=

        transaction.title + "," +

        transaction.category + "," +

        transaction.amount + "," +

        transaction.type + "," +

        transaction.date + "\n";

    });

    const blob = new Blob(

        [csv],

        {

            type:"text/csv"

        }

    );

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = "transactions.csv";

    link.click();

    URL.revokeObjectURL(url);

}

exportBtn.addEventListener("click",function(){

    exportTransactions();

});
/* ========================= */
/* DELETE ACCOUNT */
/* ========================= */

const deleteButton = document.getElementById("delete_account_btn");

const deleteModal = document.getElementById("delete_modal");

const cancelDelete = document.getElementById("cancel_delete");

const confirmDelete = document.getElementById("confirm_delete");
function openDeleteModal(){

    deleteModal.style.display = "flex";

}
function closeDeleteModal(){

    deleteModal.style.display = "none";

}
function deleteAccount(){

    const currentUser =

    getCurrentUser();

    users = users.filter(function(user){

        return user.username!==currentUser.username;

    });

    saveUsers();

    localStorage.removeItem(

        "currentUser"

    );

    alert(

        "Account deleted successfully."

    );

    window.location.href =

    "login.html";

}
deleteButton.addEventListener("click",function(){

    openDeleteModal();

});

cancelDelete.addEventListener("click",function(){

    closeDeleteModal();

});

confirmDelete.addEventListener("click",function(){

    deleteAccount();

});

/* ========================= */
/* TWO FACTOR */
/* ========================= */

const enable2FABtn = document.getElementById("enable_2fa_btn");

const twoFactorStatus = document.getElementById("two_factor_status");



function loadTwoFactor(){

    const user = getCurrentUser();

    const status = user.preferences.twoFactor;

    twoFactorStatus.textContent =

        status ? "Enabled" : "Disabled";

    enable2FABtn.textContent =

        status ? "Disable" : "Enable";

}

enable2FABtn.addEventListener("click",function(){

    const user = getCurrentUser();

    user.preferences.twoFactor =

        !user.preferences.twoFactor;

    saveUsers();

    loadTwoFactor();

});

window.addEventListener("click",function(event){

    if(event.target===editProfileModal){

        closeEditProfile();

    }

    if(event.target===passwordModal){

        closePasswordModal();

    }

    if(event.target===goalModal){

        closeGoalModal();

    }

    if(event.target===deleteModal){

        closeDeleteModal();

    }

});

function initializeProfile(){

    loadProfile();

    loadFinancialSummary();

    loadGoals();

    loadPreferences();

    loadTwoFactor();

}

initializeProfile();
