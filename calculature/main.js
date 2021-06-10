class Calculator {
    constructor(previousOperantTextElement, currrentOperandTextElement) {
      this.previousOperantTextElement = previousOperantTextElement;
      this.currrentOperandTextElement = currrentOperandTextElement;
      this.clear();
    }
    // clear
    clear() {
      this.currentOperand = "";
      this.previousOperand = "";
      this.operation = undefined;
    }
    // delete
    delete() {
      this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }
    // append number
    appendNumber(number) {
      if (number === "." && this.currentOperand.includes(".")) return;
      this.currentOperand = this.currentOperand.toString() + number.toString();
    }
    // choose operation
    chooseOperation(operation) {
      if (this.currentOperand === "") return;
      if (this.previousOperand !== "") {
        this.compute();
      }
      this.operation = operation;
      this.previousOperand = this.currentOperand;
      this.currentOperand = "";
    }
  
    compute() {
      let result;
      const prev = parseFloat(this.previousOperand);
      const current = parseFloat(this.currentOperand);
      if (isNaN(prev) || isNaN(current)) return;
  
      switch (this.operation) {
        case "+":
          result = prev + current;
          break;
        case "-":
          result = prev - current;
          break;
        case "x":
          result = prev * current;
          break;
        case "÷":
          result = prev / current;
          break;
  
        default:
          break;
      }
      this.currentOperand = result;
      this.operation = undefined;
      this.previousOperand = "";
    }
    getDisplayNumber(number) {
      const stringNumber = number.toString();
      const numArr = stringNumber.split(".");
      const integerDigits = parseFloat(numArr[0]);
      const decimalDigits = numArr[1];
      let integerDisplay;
      if (isNaN(integerDigits)) {
        integerDisplay = "";
      } else {
        integerDisplay = integerDigits.toLocaleString("en", {
          maximumFractionDigits: 0,
        });
      }
      if (decimalDigits != null) {
        return `${integerDisplay}.${decimalDigits}`;
      } else {
        return integerDisplay;
      }
    }
    // display values
    updateDisplay() {
      this.currrentOperandTextElement.innerText = this.getDisplayNumber(
        this.currentOperand
      );
      if (this.operation != null) {
        this.previousOperantTextElement.innerText = `${this.getDisplayNumber(
          this.previousOperand
        )} ${this.operation}`;
      } else {
        this.previousOperantTextElement.innerText = this.getDisplayNumber(
          this.previousOperand
        );
      }
    }
  }
  
  const numButtons = document.querySelectorAll("[data-number]");
  const operationBtns = document.querySelectorAll("[data-operation]");
  const equalButton = document.querySelector("[data-equals]");
  const deleteButton = document.querySelector("[data-delete]");
  const allClearBtn = document.querySelector("[data-all-clear]");
  const previousOperantTextElement = document.querySelector(
    "[data-prev-operand]"
  );
  const currrentOperandTextElement = document.querySelector(
    "[data-curr-operand]"
  );
  
  document.addEventListener("DOMContentLoaded", () => {
    const calc = new Calculator(
      previousOperantTextElement,
      currrentOperandTextElement
    );
  
    numButtons.forEach((button) => {
      button.addEventListener("click", () => {
        calc.appendNumber(button.innerText);
        calc.updateDisplay();
      });
    });
    operationBtns.forEach((button) => {
      button.addEventListener("click", () => {
        calc.chooseOperation(button.innerText);
        calc.updateDisplay();
      });
    });
    equalButton.addEventListener("click", () => {
      calc.compute();
      calc.updateDisplay();
    });
    deleteButton.addEventListener("click", () => {
      calc.delete();
      calc.updateDisplay();
    });
    allClearBtn.addEventListener("click", () => {
      calc.clear();
      calc.updateDisplay();
    });
  });