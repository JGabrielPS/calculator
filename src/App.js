import { useState, useEffect } from "react";

import {
  MdHistory,
  MdOutlineDarkMode,
  MdOutlineBackspace,
  MdLightMode,
} from "react-icons/md";

import { useDarkMode } from "./useDarkMode";

import styles from "./App.module.css";

function App() {
  const [theme, toggleTheme] = useDarkMode();
  const [calculations, setCalculations] = useState([]);
  const [result, setResult] = useState(0);

  const operators = ["+", "-", "*", "/", "%", "+/-", "AC", "E"];

  const evaluateResult = (n) => {
    const displayLength = 12;
    const length = (n + "").length;
    return length > displayLength
      ? +(n + "").slice(0, -(length - displayLength))
      : n;
  };

  useEffect(() => {
    if (calculations.length === 0) {
      setResult(0);
      return;
    }

    let lastInput = calculations[calculations.length - 1];
    console.log(
      "🚀 ~ file: App.js ~ line 24 ~ useEffect ~ lastInput",
      lastInput
    );

    if (lastInput === "") return;

    let tempResult = 0;
    console.log(calculations, calculations.length);

    if (!operators.includes(lastInput)) {
      tempResult = evaluateResult(eval(calculations.join("")));
      setResult(tempResult);
      return;
    }

    if (calculations.length > 1 && operators.includes(lastInput)) {
      console.log("Entre en segunda condicion");
      const tempCalculations = calculations.slice(0, -1);
      console.log(
        "🚀 ~ file: App.js ~ line 33 ~ useEffect ~ tempCalculations",
        tempCalculations
      );
      tempResult = evaluateResult(eval(tempCalculations.join("")));
      setResult(tempResult);
    }
  }, [calculations]);

  const handleCalculations = (e) => {
    let input = e.target.innerHTML === "x" ? "*" : e.target.innerHTML;

    if (
      result !== 0 &&
      calculations.length === 1 &&
      calculations[calculations.length - 1] === ""
    ) {
      setCalculations([result, input]);
      return;
    }

    if (
      operators.includes(calculations[calculations.length - 1]) &&
      operators.includes(input)
    ) {
      setCalculations([...calculations.slice(0, -1), input]);
    } else {
      setCalculations([...calculations, input]);
    }
  };

  const handleFunctions = (input) => {
    console.log("🚀 ~ file: App.js ~ line 36 ~ handleFunctions ~ input", input);
    if (input === "AC") {
      setCalculations([]);
      return;
    }

    if (input === "E") {
      setCalculations(calculations.slice(0, -1));
      return;
    }

    if (input === "=") {
      setCalculations([""]);
      return;
    }

    if (input === "+/-") {
      if (
        calculations[calculations.length - 1] === "*" ||
        calculations[calculations.length - 1] === "/"
      ) {
        setCalculations([...calculations, `(${input})`]);
        return;
      }
    }
  };

  return (
    <div
      className={`${styles.container} ${
        theme ? styles.containerLight : styles.containerDark
      }`}
    >
      <div
        className={`${styles.calculator} ${
          theme ? styles.calculatorLight : styles.calculatorDark
        }`}
      >
        <div className={styles.header}>
          <button type="button" className={styles.headerButton}>
            <MdHistory />
          </button>
          <button
            type="button"
            className={styles.headerButton}
            onClick={toggleTheme}
          >
            {theme ? <MdOutlineDarkMode /> : <MdLightMode />}
          </button>
        </div>
        <div className={styles.display}>
          <div className={styles.displayContainer}>
            <small className={styles.lastOperation}>
              {calculations.map((input) => {
                if (operators.includes(input)) {
                  if (input === "*") return ` x `;
                  else return ` ${input} `;
                } else return input;
              })}
            </small>
          </div>
          <div className={styles.displayContainer}>
            <h1 className={styles.currentOperation}>{result}</h1>
          </div>
        </div>
        <div className={styles.keyboard}>
          <button
            type="button"
            className={`${styles.keyboardButton} ${styles.rounded} ${
              theme || styles.roundedDark
            } ${styles.ac}`}
            onClick={() => handleFunctions("AC")}
          >
            AC
          </button>
          <button
            type="button"
            className={`${styles.keyboardButton} ${styles.rounded} ${
              theme || styles.roundedDark
            } ${styles.backspace}`}
            onClick={() => handleFunctions("E")}
          >
            <MdOutlineBackspace />
          </button>
          <button
            type="button"
            className={`${styles.keyboardButton} ${styles.sign}`}
            onClick={() => handleFunctions("+/-")}
          >
            +/-
          </button>
          <button
            type="button"
            className={`${styles.keyboardButton} ${styles.point}`}
            onClick={handleCalculations}
          >
            .
          </button>
          <button
            type="button"
            className={`${styles.keyboardButton} ${styles.rounded} ${
              styles.operation
            } ${theme || styles.operationDark} ${styles.divider}`}
            onClick={handleCalculations}
          >
            /
          </button>
          <button
            type="button"
            className={`${styles.keyboardButton} ${styles.rounded} ${
              styles.operation
            } ${theme || styles.operationDark} ${styles.module}`}
            onClick={handleCalculations}
          >
            %
          </button>
          <button
            type="button"
            className={`${styles.keyboardButton} ${styles.rounded} ${
              styles.operation
            } ${theme || styles.operationDark} ${styles.addition}`}
            onClick={handleCalculations}
          >
            +
          </button>
          <button
            type="button"
            className={`${styles.keyboardButton} ${styles.rounded} ${
              styles.operation
            } ${theme || styles.operationDark} ${styles.substraction}`}
            onClick={handleCalculations}
          >
            -
          </button>
          <button
            type="button"
            className={`${styles.keyboardButton} ${styles.rounded} ${
              styles.operation
            } ${theme || styles.operationDark} ${styles.multiplication}`}
            onClick={handleCalculations}
          >
            x
          </button>
          <button
            type="button"
            className={`${styles.keyboardButton} ${styles.rounded} ${
              styles.operation
            } ${theme || styles.operationDark} ${styles.result}`}
            onClick={() => handleFunctions("=")}
          >
            =
          </button>
          <button
            type="button"
            className={`${styles.keyboardButton} ${styles.one}`}
            onClick={handleCalculations}
          >
            1
          </button>
          <button
            type="button"
            className={`${styles.keyboardButton} ${styles.two}`}
            onClick={handleCalculations}
          >
            2
          </button>
          <button
            type="button"
            className={`${styles.keyboardButton} ${styles.three}`}
            onClick={handleCalculations}
          >
            3
          </button>
          <button
            type="button"
            className={`${styles.keyboardButton} ${styles.four}`}
            onClick={handleCalculations}
          >
            4
          </button>
          <button
            type="button"
            className={`${styles.keyboardButton} ${styles.five}`}
            onClick={handleCalculations}
          >
            5
          </button>
          <button
            type="button"
            className={`${styles.keyboardButton} ${styles.six}`}
            onClick={handleCalculations}
          >
            6
          </button>
          <button
            type="button"
            className={`${styles.keyboardButton} ${styles.seven}`}
            onClick={handleCalculations}
          >
            7
          </button>
          <button
            type="button"
            className={`${styles.keyboardButton} ${styles.eight}`}
            onClick={handleCalculations}
          >
            8
          </button>
          <button
            type="button"
            className={`${styles.keyboardButton} ${styles.nine}`}
            onClick={handleCalculations}
          >
            9
          </button>
          <button
            type="button"
            className={`${styles.keyboardButton} ${styles.zero}`}
            onClick={handleCalculations}
          >
            0
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
