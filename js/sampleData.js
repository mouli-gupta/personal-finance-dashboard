const defaultUsers = [

{
    username:"vasu",
    password:"vasu123",

    profile:{
        fullName:"Vasu Gupta",
        username:"vasu",
        email:"vasu@gmail.com",
        phone:"+91 9876543210",
        country:"India",
        memberSince:"2026-12"
    },

    goals:{
        totalSavings:850000,
        savingsGoal:1000000,
        monthlyTarget:30000,
        targetDate:"Dec 2026"
    },

    preferences:{
        currency:"INR (₹)",
        theme:"Light",
        language:"English",
        notification:true
    },

    transactions:[

{
id:1,
title:"Salary",
category:"Income",
amount:240000,
type:"Income",
paymentMethod:"Bank Transfer",
notes:"January salary",
recurring:"Monthly",
date:"2026-01-01"
},

{
id:2,
title:"Rent",
category:"Housing",
amount:40000,
type:"Expense",
paymentMethod:"Bank Transfer",
notes:"Apartment rent",
recurring:"Monthly",
date:"2026-01-02"
},

{
id:3,
title:"Groceries",
category:"Food",
amount:7200,
type:"Expense",
paymentMethod:"UPI",
notes:"Monthly groceries",
recurring:"Monthly",
date:"2026-01-03"
},

{
id:4,
title:"Electricity",
category:"Utilities",
amount:3200,
type:"Expense",
paymentMethod:"UPI",
notes:"Electricity bill",
recurring:"Monthly",
date:"2026-01-04"
},

{
id:5,
title:"Internet",
category:"Utilities",
amount:999,
type:"Expense",
paymentMethod:"Credit Card",
notes:"Fiber broadband",
recurring:"Monthly",
date:"2026-01-05"
},

{
id:6,
title:"Fuel",
category:"Transport",
amount:3400,
type:"Expense",
paymentMethod:"UPI",
notes:"Fuel refill",
recurring:"Monthly",
date:"2026-01-06"
},

{
id:7,
title:"SIP",
category:"Investment",
amount:25000,
type:"Expense",
paymentMethod:"Net Banking",
notes:"Mutual fund SIP",
recurring:"Monthly",
date:"2026-01-07"
},

{
id:8,
title:"Netflix",
category:"Entertainment",
amount:649,
type:"Expense",
paymentMethod:"Credit Card",
notes:"Subscription",
recurring:"Monthly",
date:"2026-01-08"
},

{
id:9,
title:"Bonus",
category:"Income",
amount:35000,
type:"Income",
paymentMethod:"Bank Transfer",
notes:"Performance bonus",
recurring:"No",
date:"2026-01-10"
},

{
id:10,
title:"Restaurant",
category:"Food",
amount:1800,
type:"Expense",
paymentMethod:"Credit Card",
notes:"Dinner",
recurring:"No",
date:"2026-01-12"
},

{
id:11,
title:"Amazon",
category:"Shopping",
amount:4500,
type:"Expense",
paymentMethod:"Credit Card",
notes:"Electronics",
recurring:"No",
date:"2026-01-14"
},

{
id:12,
title:"Gym",
category:"Healthcare",
amount:2000,
type:"Expense",
paymentMethod:"Debit Card",
notes:"Membership",
recurring:"Monthly",
date:"2026-01-15"
},

{
id:13,
title:"Dividend",
category:"Income",
amount:6200,
type:"Income",
paymentMethod:"Bank Transfer",
notes:"Dividend",
recurring:"No",
date:"2026-01-17"
},

{
id:14,
title:"Flight",
category:"Travel",
amount:9500,
type:"Expense",
paymentMethod:"Credit Card",
notes:"Delhi trip",
recurring:"No",
date:"2026-01-18"
},

{
id:15,
title:"Hotel",
category:"Travel",
amount:6200,
type:"Expense",
paymentMethod:"Credit Card",
notes:"Business stay",
recurring:"No",
date:"2026-01-19"
},

{
id:16,
title:"Uber",
category:"Transport",
amount:650,
type:"Expense",
paymentMethod:"UPI",
notes:"Airport",
recurring:"No",
date:"2026-01-20"
},

{
id:17,
title:"Medicine",
category:"Healthcare",
amount:850,
type:"Expense",
paymentMethod:"UPI",
notes:"Medicines",
recurring:"No",
date:"2026-01-22"
},

{
id:18,
title:"Shopping",
category:"Shopping",
amount:6800,
type:"Expense",
paymentMethod:"Credit Card",
notes:"Clothes",
recurring:"No",
date:"2026-01-24"
},

{
id:19,
title:"Freelancing",
category:"Income",
amount:18000,
type:"Income",
paymentMethod:"Bank Transfer",
notes:"Side project",
recurring:"No",
date:"2026-01-26"
},

{
id:20,
title:"Coffee",
category:"Food",
amount:320,
type:"Expense",
paymentMethod:"UPI",
notes:"Cafe",
recurring:"No",
date:"2026-01-28"
}

]

},

{
    username:"rahul",
    password:"rahul123",

    profile:{
        fullName:"Rahul Sharma",
        username:"rahul",
        email:"rahul@gmail.com",
        phone:"+91 9876543211",
        country:"India",
        memberSince:"March 2023"
    },

    goals:{
        totalSavings:420000,
        savingsGoal:800000,
        monthlyTarget:30000,
        targetDate:"2027-06"
    },

    preferences:{
        currency:"INR (₹)",
        theme:"Dark",
        language:"English",
        notification:true
    },

    transactions:[

{
id:21,
title:"Salary",
category:"Income",
amount:120000,
type:"Income",
paymentMethod:"Bank Transfer",
notes:"Monthly salary",
recurring:"Monthly",
date:"2026-01-01"
},

{
id:22,
title:"Rent",
category:"Housing",
amount:28000,
type:"Expense",
paymentMethod:"Bank Transfer",
notes:"Apartment rent",
recurring:"Monthly",
date:"2026-01-02"
},

{
id:23,
title:"Groceries",
category:"Food",
amount:5200,
type:"Expense",
paymentMethod:"UPI",
notes:"Groceries",
recurring:"Monthly",
date:"2026-01-03"
},

{
id:24,
title:"Electricity",
category:"Utilities",
amount:2400,
type:"Expense",
paymentMethod:"UPI",
notes:"Electricity bill",
recurring:"Monthly",
date:"2026-01-04"
},

{
id:25,
title:"Internet",
category:"Utilities",
amount:999,
type:"Expense",
paymentMethod:"Credit Card",
notes:"Broadband",
recurring:"Monthly",
date:"2026-01-05"
},

{
id:26,
title:"Fuel",
category:"Transport",
amount:2600,
type:"Expense",
paymentMethod:"UPI",
notes:"Fuel",
recurring:"Monthly",
date:"2026-01-06"
},

{
id:27,
title:"SIP",
category:"Investment",
amount:10000,
type:"Expense",
paymentMethod:"Net Banking",
notes:"Investment",
recurring:"Monthly",
date:"2026-01-07"
},

{
id:28,
title:"Netflix",
category:"Entertainment",
amount:649,
type:"Expense",
paymentMethod:"Credit Card",
notes:"Subscription",
recurring:"Monthly",
date:"2026-01-08"
},

{
id:29,
title:"Marketing Bonus",
category:"Income",
amount:25000,
type:"Income",
paymentMethod:"Bank Transfer",
notes:"Bonus",
recurring:"No",
date:"2026-01-10"
},

{
id:30,
title:"Restaurant",
category:"Food",
amount:2400,
type:"Expense",
paymentMethod:"Credit Card",
notes:"Dinner",
recurring:"No",
date:"2026-01-12"
},

{
id:31,
title:"Myntra",
category:"Shopping",
amount:3900,
type:"Expense",
paymentMethod:"Credit Card",
notes:"Clothes",
recurring:"No",
date:"2026-01-13"
},

{
id:32,
title:"Gym",
category:"Healthcare",
amount:1800,
type:"Expense",
paymentMethod:"Debit Card",
notes:"Membership",
recurring:"Monthly",
date:"2026-01-14"
},

{
id:33,
title:"Dividend",
category:"Income",
amount:3200,
type:"Income",
paymentMethod:"Bank Transfer",
notes:"Dividend",
recurring:"No",
date:"2026-01-16"
},

{
id:34,
title:"Movie",
category:"Entertainment",
amount:980,
type:"Expense",
paymentMethod:"Credit Card",
notes:"PVR",
recurring:"No",
date:"2026-01-17"
},

{
id:35,
title:"Flight",
category:"Travel",
amount:7200,
type:"Expense",
paymentMethod:"Credit Card",
notes:"Mumbai trip",
recurring:"No",
date:"2026-01-19"
},

{
id:36,
title:"Hotel",
category:"Travel",
amount:5400,
type:"Expense",
paymentMethod:"Credit Card",
notes:"Hotel stay",
recurring:"No",
date:"2026-01-20"
},

{
id:37,
title:"Uber",
category:"Transport",
amount:560,
type:"Expense",
paymentMethod:"UPI",
notes:"Airport",
recurring:"No",
date:"2026-01-21"
},

{
id:38,
title:"Medicine",
category:"Healthcare",
amount:540,
type:"Expense",
paymentMethod:"UPI",
notes:"Medicines",
recurring:"No",
date:"2026-01-23"
},

{
id:39,
title:"Amazon",
category:"Shopping",
amount:5200,
type:"Expense",
paymentMethod:"Credit Card",
notes:"Accessories",
recurring:"No",
date:"2026-01-25"
},

{
id:40,
title:"Coffee",
category:"Food",
amount:420,
type:"Expense",
paymentMethod:"UPI",
notes:"Starbucks",
recurring:"No",
date:"2026-01-27"
}

]

}

];