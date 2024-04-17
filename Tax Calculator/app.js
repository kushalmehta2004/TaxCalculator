// Function to calculate tax and overall income based on the provided parameters

function calculateTaxAndIncome(grossIncome, extraIncome, age, deductions) {
    let totalIncome = grossIncome + extraIncome - deductions;
    let taxRate = 0;

    if (totalIncome > 800000) {
        if (age === "<40") {
            taxRate = 0.3;
        } else if (age === "40-59") {
            taxRate = 0.4;
        } else if (age === "≥60") {
            taxRate = 0.1;
        }
    }

    let tax = taxRate * (totalIncome - 800000);
    let overallIncome = totalIncome - tax;

    return {
        tax: tax,
        overallIncome: overallIncome
    };
}

// Function to validate form fields and calculate tax
function validateAndCalculateTax(event) {
    event.preventDefault();

    let grossIncome = parseFloat(document.getElementById("grossIncome").value);
    let extraIncome = parseFloat(document.getElementById("extraIncome").value);
    let deductions = parseFloat(document.getElementById("deductions").value);
    let age = document.getElementById("age").value;
    let inputs = document.querySelectorAll('input[type="text"]');
    let isValid = true;

    inputs.forEach(function (input) {
        let inputValue = input.value.trim();
        if (inputValue === "" || !/^\d+(\.\d+)?$/.test(inputValue)) {
            let errorIcon = input.nextElementSibling;
            errorIcon.style.display = "inline";
            isValid = false;
        } else {
            let errorIcon = input.nextElementSibling;
            errorIcon.style.display = "none";
        }
    });

    if (age === "") {
        isValid = false;
        showErrorMessage(document.getElementById("age"));
    } else {
        hideErrorMessage(document.getElementById("age"));
    }

    if (!isValid) {
        event.preventDefault();
    }

    if (isValid) {

        let taxAndIncome = calculateTaxAndIncome(grossIncome, extraIncome, age, deductions);
        let taxAmount = taxAndIncome.tax;
        let postTaxIncome = taxAndIncome.overallIncome;

        document.getElementById("taxResult").innerHTML = "Tax Amount = <b> ₹ " + taxAmount.toFixed(2) + "</b>";

        let modal = new bootstrap.Modal(document.getElementById("taxResultModal"));
        modal.show();
    }
}

function showErrorMessage(inputElement) {
    let errorIcon = inputElement.nextElementSibling;
    errorIcon.style.display = "inline";
}

function hideErrorMessage(inputElement) {
    let errorIcon = inputElement.nextElementSibling;
    errorIcon.style.display = "none";
}

function validateInput(event) {
    let inputElement = event.target;
    let inputValue = inputElement.value.trim();

    if (inputElement.id === 'age' && inputElement.value !== "") {
        hideErrorMessage(inputElement);
    } else if (!/^\d+(\.\d+)?$/.test(inputValue)) {
        let errorIcon = inputElement.nextElementSibling;
        errorIcon.style.display = "inline";
    } else {
        hideErrorMessage(inputElement);
    }
}


document.getElementById("grossIncome").addEventListener("input", validateInput);
document.getElementById("extraIncome").addEventListener("input", validateInput);
document.getElementById("deductions").addEventListener("input", validateInput);
document.getElementById("age").addEventListener("change", validateInput);

document.getElementById("taxForm").addEventListener("submit", validateAndCalculateTax);

var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
})

let darkMode = false; // Initialize dark mode as false initially

function changeMode() {
    const mode = document.getElementById("mode");

    if (!darkMode) {
        // If not in dark mode, switch to dark mode
        document.body.style.backgroundColor = '#023047';
        // You can also apply other style changes for dark mode here
        darkMode = true; // Update mode to dark
    } else {
        // If in dark mode, switch to light mode
        document.body.style.backgroundColor = '#8ecae6';
        // You can also apply other style changes for light mode here
        darkMode = false; // Update mode to light
    }
}


function reset() {
    document.getElementById("grossIncome").value = "";
    document.getElementById("extraIncome").value = "";
    document.getElementById("deductions").value = "";
    document.getElementById("age").innerHTML = "";
}

