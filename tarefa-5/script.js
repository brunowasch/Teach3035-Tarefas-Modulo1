const displayBox = document.getElementById("display")
const display = document.querySelector("#display .result")
const numbersGrid = document.getElementById("numbers")
const operatorsGrid = document.getElementById("operators")
const btnClearAll = document.getElementById("clearAll")
const btnClearEntry = document.getElementById("clearOperation")
const btnDelete = document.getElementById("clearLastNumber")
const btnEqual = document.getElementById("equal")

let currentValue = "0"
let previousValue = null
let currentOperator = null
let shouldOverwrite = false
let expressionValue = ""

displayBox.style.overflow = "hidden"
display.style.width = "100%"
display.style.textAlign = "right"
display.style.padding = "0.5rem"
display.style.fontSize = "2rem"
updateDisplay()

function updateDisplay() {
    const content = expressionValue ? expressionValue + (shouldOverwrite ? "" : currentValue) : currentValue
    display.textContent = content
}

function visibleLength(s) {
    return s.length
}

function appendDigit(digit) {
    if (shouldOverwrite) {
        currentValue = digit === "." ? "0." : digit
        shouldOverwrite = false
        return updateDisplay()
    }
    if (digit === "." && currentValue.includes(".")) {
        return
    }
    if (currentValue === "0" && digit !== ".") {
        currentValue = digit
    } else {
        currentValue += digit
    }
    if (visibleLength(currentValue) > 14) {
        currentValue = currentValue.slice(0, currentValue.length - 1)
    }
    updateDisplay()
}

function setOperator(symbol) {
    if (currentOperator && !shouldOverwrite) {
        compute()
    }
    previousValue = parseFloat(currentValue)
    currentOperator = symbol
    expressionValue = currentValue + " " + symbol + " "
    shouldOverwrite = true
    updateDisplay()
}

function clearAll() {
    currentValue = "0"
    previousValue = null
    currentOperator = null
    shouldOverwrite = false
    expressionValue = ""
    updateDisplay()
}

function clearEntry() {
    currentValue = "0"
    shouldOverwrite = false
    updateDisplay()
}

function deleteLast() {
    if (shouldOverwrite) {
        currentValue = "0"
        shouldOverwrite = false
    } else {
        currentValue = currentValue.length > 1 ? currentValue.slice(0, -1) : "0"
    }
    updateDisplay()
}

function toggleSign() {
    if (currentValue === "0" || currentValue === "Error") {
        return
    }
    currentValue = currentValue.startsWith("-") ? currentValue.slice(1) : "-" + currentValue
    updateDisplay()
}

function compute() {
    if (previousValue === null || currentOperator === null) {
        return
    }
    const a = previousValue
    const b = parseFloat(currentValue)
    let result
    switch (currentOperator) {
        case "+":
        result = a + b
        break
        case "-":
        result = a - b
        break
        case "*":
        result = a * b
        break
        case "/":
        if (b === 0) {
            currentValue = "Error"
            previousValue = null
            currentOperator = null
            expressionValue = ""
            shouldOverwrite = true
            return updateDisplay()
        }
        result = a / b
        break
        default:
        return
    }
    const formatted = formatResult(result)
    expressionValue = ""
    currentValue = formatted
    previousValue = null
    currentOperator = null
    shouldOverwrite = true
    updateDisplay()
}

function formatResult(n) {
    if (!Number.isFinite(n)) {
        return "Error"
    }
    let s = n.toString()
    if (visibleLength(s) <= 14) {
        return s
    }
    s = n.toPrecision(12)
    if (s.includes("e")) {
        return s
    }
    if (visibleLength(s) > 14) {
        s = n.toExponential(8)
    }
    return s
}

numbersGrid.addEventListener("click", (e) => {
    const btn = e.target.closest("button")
    if (!btn) {
        return
    }
    const label = btn.textContent.trim()
    if (btn.classList.contains("number")) {
        return appendDigit(label)
    }
    if (btn.id === "clearAll") {
        return clearAll()
    }
    if (btn.id === "clearOperation") {
        return clearEntry()
    }
    if (btn.id === "clearLastNumber") {
        return deleteLast()
    }
    if (label === ".") {
        return appendDigit(".")
    }
    if (label === "+/-") {
        return toggleSign()
    }
})

operatorsGrid.addEventListener("click", (e) => {
    const btn = e.target.closest("button")
    if (!btn) {
        return
    }
    const label = btn.textContent.trim()
    if (btn.id === "equal" || label === "=") {
        return compute()
    }
    if (["+","-","*","/"].includes(label)) {
        return setOperator(label)
    }
})

window.addEventListener("keydown", (e) => {
    const k = e.key
    if (k === ".") {
        return appendDigit(".")
    }
    if (k === "Enter" || k === "=") {
        return compute()
    }
    if (k === "Backspace") {
        return deleteLast()
    }
    if (k === "Delete") {
        return clearEntry()
    }
    if (k >= "0" && k <= "9") {
        return appendDigit(k)
    }
    if (k === "+") {
        return setOperator("+")
    }
    if (k === "-") {
        return setOperator("-")
    }
    if (k === "*") {
        return setOperator("*")
    }
    if (k === "/") {
        return setOperator("/")
    }
})