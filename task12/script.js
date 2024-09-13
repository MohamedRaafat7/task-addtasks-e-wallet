
let balanceElement = document.getElementById('balance');
let transactionList = document.getElementById('transaction-list');
let addFundsForm = document.getElementById('add-funds-form');
let withdrawFundsForm = document.getElementById('withdraw-funds-form');
let amountInput = document.getElementById('amount');
let withdrawAmountInput = document.getElementById('withdraw-amount');


let balance = parseFloat(localStorage.getItem('balance')) || 0;
let transactions = JSON.parse(localStorage.getItem('transactions')) || [];


balanceElement.textContent = balance.toFixed(2);
updateTransactionList();




// Function to add balance
function addbalance() {
    let amount = parseFloat(amountInput.value);
    if (!isNaN(amount) && amount > 0) {
        balance += amount;
        transactions.push(`Added $${amount.toFixed(2)}`);
        updateLocalStorage();
        updateUI();
        amountInput.value = ''; // Clear input
    } else {
        alert("Please enter a valid amount.");
    }
}

// Function to withdraw funds
function withdrawFunds() {
    let withdrawAmount = parseFloat(withdrawAmountInput.value);
    if (!isNaN(withdrawAmount) && withdrawAmount > 0 && withdrawAmount <= balance) {
        balance -= withdrawAmount;
        transactions.push(`Withdrew $${withdrawAmount.toFixed(2)}`);
        updateLocalStorage();
        updateUI();
        withdrawAmountInput.value = ''; // Clear input
    } else if (withdrawAmount > balance) {
        alert("Insufficient funds.");
    } else {
        alert("Please enter a valid amount.");
    }
}

// Function to update 
function updateUI() {
    balanceElement.textContent = balance.toFixed(2);
    updateTransactionList();
}

// Function to update transaction 
function updateTransactionList() {
    let listItems = '';
    for (let i = 0; i < transactions.length; i++) {
        listItems += `<li>* ${transactions[i]}  <button  onclick="deleteTransaction(${i})">Delete</button> </li>
       `;

    }
    transactionList.innerHTML = listItems;
}


// Function to save balance and transactions to localStorage
function updateLocalStorage() {
    localStorage.setItem('balance', balance);
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

function deleteTransaction(index) {
    if (confirm("Are you sure you want to delete this transaction?")) {
        
        let transaction = transactions[index];
        if (transaction.startsWith('Added')) {
            let amount = parseFloat(transaction.replace('Added $', ''));
            balance -= amount; 
        } else if (transaction.startsWith('Withdrew')) {
            let amount = parseFloat(transaction.replace('Withdrew $', ''));
            balance += amount; 
        }
        
       
        transactions.splice(index, 1);
        
        
        updateLocalStorage();
        updateUI();
    }
}


