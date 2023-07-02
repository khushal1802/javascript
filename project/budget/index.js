let totalAmount = 0;
let totalExpenses = 0;
let balance = 0;
let itemArray = [];

const amountInput = document.getElementById('amount-input');
const addAmountBtn = document.getElementById('add-amount-btn');
const addNewAmountBtn = document.getElementById('add-new-amount-btn');
const totalAmountDisplay = document.getElementById('total-amount');

const expenseDescriptionInput = document.getElementById('expense-description');
const expenseAmountInput = document.getElementById('expense-amount');
const addExpenseBtn = document.getElementById('add-expense-btn');
const totalExpensesDisplay = document.getElementById('total-expenses');
const balanceDisplay = document.getElementById('balance');
const balanceMessage = document.getElementById('balance-message');


// Load budget data from local storage if available
loadBudgetData();

addAmountBtn.addEventListener('click', addAmount);
function addAmount() {
    const amount = +amountInput.value;

    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount.');
        return;
    }

    totalAmount += amount;
    totalAmountDisplay.textContent = totalAmount;

    itemArray.push(amount);
    amountInput.value = '';

    calculateBalance();
    saveBudgetData();
}
addNewAmountBtn.addEventListener('click', addNewAmount);

function addNewAmount() {
    const newAmount = parseInt(prompt("Enter new amount"));

    if (isNaN(newAmount) || newAmount <= 0) {
        alert('Please enter a valid amount.');
        return;
    }

    const currentAmount = +totalAmountDisplay.textContent;

    totalAmount = currentAmount + newAmount;
    totalAmountDisplay.textContent = totalAmount;

    itemArray.push(newAmount);
    amountInput.value = '';

    calculateBalance();
    saveBudgetData();
}
addExpenseBtn.addEventListener('click', addExpense);

function addExpense() {
    const description = expenseDescriptionInput.value;
    const amount = +expenseAmountInput.value;

    if (description.trim() === '' || isNaN(amount) || amount <= 0) {
        alert('Please enter a valid description and amount.');
        return;
    }

    totalExpenses += amount;
    totalExpensesDisplay.textContent = totalExpenses;

    const expenseItem = {
        description,
        amount
    };
    itemArray.push(expenseItem);

    expenseDescriptionInput.value = '';
    expenseAmountInput.value = '';

    calculateBalance();
    saveBudgetData();
    displayItems();
}

function calculateBalance() {
    balance = totalAmount - totalExpenses;
    balanceDisplay.textContent = balance;

    if (balance < 0) {
        alert('Warning: Your balance is negative.');
    } 
}

function displayItems() {
    const itemList = document.getElementById('item-list');
    itemList.innerHTML = '';

    itemArray.forEach((item, index) => {
        const listItem = document.createElement('li');
        if (typeof item !== 'number') {
            const descriptionSpan = document.createElement('span');
            descriptionSpan.textContent = item.description;
            const amountSpan = document.createElement('span');
            amountSpan.textContent = ` Rs.${item.amount}`;

            const editBtn = document.createElement('button');
            editBtn.textContent = 'Edit';
            editBtn.addEventListener('click', () => editItem(index));
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.addEventListener('click', () => deleteItem(index));

            listItem.appendChild(descriptionSpan);
            listItem.appendChild(amountSpan);
            listItem.appendChild(editBtn);
            listItem.appendChild(deleteBtn);
        }
        itemList.appendChild(listItem);
    });
}


function editItem(index) {
    const item = itemArray[index];
    if (typeof item === 'object') {
        const newDescription = prompt('Enter new description:', item.description);
        const newAmount = parseFloat(prompt('Enter new amount:', item.amount));
        if (newDescription.trim() !== '' && !isNaN(newAmount) && newAmount > 0) {
            const oldAmount = item.amount;
            item.description = newDescription;
            item.amount = newAmount;

            totalExpenses -= oldAmount; // Subtract old amount
            totalExpenses += newAmount; // Add new amount
            balance = totalAmount - totalExpenses;

            calculateBalance();
            saveBudgetData();
            displayItems();
        } else {
            alert('Invalid input. Please enter a valid description and amount.');
        }
    }
}

function deleteItem(index) {
    const item = itemArray[index];
    if (typeof item === 'object') {
        const confirmDelete = confirm('Are you sure you want to delete this item?');
        if (confirmDelete) {
            const deletedItemAmount = item.amount;
            itemArray.splice(index, 1);
            totalExpenses -= deletedItemAmount; // Subtract deleted item's amount
            balance = totalAmount - totalExpenses;

            calculateBalance();
            saveBudgetData();
            displayItems();
        }
    }
}

function saveBudgetData() {
    const budgetData = {
        //totalAmount,
        //totalExpenses,
        items: itemArray
    };

    localStorage.setItem('budgetData', JSON.stringify(budgetData));
}

function loadBudgetData() {
    const budgetData = JSON.parse(localStorage.getItem('budgetData'));

    if (budgetData) {
      //  totalAmount = budgetData.totalAmount || 0;
       // totalExpenses = budgetData.totalExpenses || 0
        itemArray = budgetData.items || [];

        displayItems();
    }
}