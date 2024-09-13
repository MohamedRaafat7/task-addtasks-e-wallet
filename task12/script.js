       
        let balanceElement = document.getElementById('balance');
        let transactionList = document.getElementById('transaction-list');
        let addFundsForm = document.getElementById('add-funds-form');
        let withdrawFundsForm = document.getElementById('withdraw-funds-form');
        let amountInput = document.getElementById('amount');
        let withdrawAmountInput = document.getElementById('withdraw-amount');
        let balance = 1234.56; 
        function updateBalance(newBalance) {
            balanceElement.textContent = `$${newBalance.toFixed(2)}`;
        }

        function addTransaction(description, amount) {
            let li = document.createElement('li');
            li.textContent = `${description} - $${amount.toFixed(2)}`;
            transactionList.insertBefore(li, transactionList.firstChild); 
        }

        addFundsForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            let amount = parseFloat(amountInput.value);
            if (isNaN(amount) || amount <= 0) {
                alert('Please enter a valid amount.');
                return;
            }

            balance += amount;
            updateBalance(balance);
            addTransaction('Deposit', amount);

            amountInput.value = ''; 
        });

        withdrawFundsForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            let amount = parseFloat(withdrawAmountInput.value);
            if (isNaN(amount) || amount <= 0) {
                alert('Please enter a valid amount.');
                return;
            }

            if (amount > balance) {
                alert('Insufficient balance.');
                return;
            }

            balance -= amount;
            updateBalance(balance);
            addTransaction('Withdrawal', amount);

            withdrawAmountInput.value = ''; 
        });

        
        updateBalance(balance);