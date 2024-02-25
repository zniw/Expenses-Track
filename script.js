// script.js

// Function to handle form submission
function expense(event) {
    event.preventDefault();

    // Get values from input fields
    var id = document.getElementById('one').value;
    var name = document.getElementById('two').value;
    var amount = document.getElementById('three').value;
    var date = document.getElementById('four').value;

    // Create an object to represent the expense
    var expenseObj = {
        id: id,
        name: name,
        amount: amount,
        date: date
    };

    // Get existing expenses from local storage or create an empty array
    var expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    // Add the new expense to the array
    expenses.push(expenseObj);

    // Save the updated expenses array to local storage
    localStorage.setItem('expenses', JSON.stringify(expenses));

    // Clear the form fields
    document.getElementById('one').value = '';
    document.getElementById('two').value = '';
    document.getElementById('three').value = '';
    document.getElementById('four').value = '';

    // Display the updated expenses
    displayExpenses();
}

// Function to delete an expense
function deleteExpense(id) {
    // Get expenses from local storage
    var expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    // Find index of the expense with the given id
    var index = expenses.findIndex(function (expense) {
        return expense.id === id;
    });

    // Remove the expense from the array
    if (index !== -1) {
        expenses.splice(index, 1);

        // Save the updated expenses array to local storage
        localStorage.setItem('expenses', JSON.stringify(expenses));

        // Display the updated expenses
        displayExpenses();
    }
}

// Function to display expenses
function displayExpenses() {
    // Get the UL element
    var ul = document.getElementById('UL');

    // Clear the existing list
    ul.innerHTML = '';

    // Get expenses from local storage
    var expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    // Loop through the expenses and add them to the list
    expenses.forEach(function (expense) {
        var li = document.createElement('li');
        li.textContent = `ID: ${expense.id}, Name: ${expense.name}, Amount: ${expense.amount}, Date: ${expense.date}`;

        // Add delete button
        var deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = function () {
            deleteExpense(expense.id);
        };
        li.appendChild(deleteButton);

        // Add edit button
        var editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.onclick = function () {
            editExpense(expense.id);
        };
        li.appendChild(editButton);

        ul.appendChild(li);
    });
}

// Function to edit an expense (placeholder)
function editExpense(id) {
    // Implement the logic to edit the expense with the given id
    // You may show a form to edit the details and update the UI and local storage
    console.log('Edit expense with ID: ' + id);
}

// Fetch and display expenses when the page loads
window.onload = function () {
    displayExpenses();
};
// Function to edit an expense
function editExpense(id) {
    // Get expenses from local storage
    var expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    // Find the expense with the given id
    var expenseToEdit = expenses.find(function (expense) {
        return expense.id === id;
    });

    // Check if the expense is found
    if (expenseToEdit) {
        // You can choose how to implement the edit functionality.
        // For simplicity, let's prompt the user for new values and update the expense.

        var newName = prompt('Enter a new name:', expenseToEdit.name);
        var newAmount = prompt('Enter a new amount:', expenseToEdit.amount);
        var newDate = prompt('Enter a new date:', expenseToEdit.date);

        // Update the expense with new values
        expenseToEdit.name = newName || expenseToEdit.name;
        expenseToEdit.amount = newAmount || expenseToEdit.amount;
        expenseToEdit.date = newDate || expenseToEdit.date;

        // Save the updated expenses array to local storage
        localStorage.setItem('expenses', JSON.stringify(expenses));

        // Display the updated expenses
        displayExpenses();
    }
}
