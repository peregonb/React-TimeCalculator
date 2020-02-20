import React, {useEffect, useState} from "react";
import backspace from "../../assets/img/backspase.svg";
import {Button} from "./Button";
import * as math from 'mathjs';

export const Calculator = () => {

    let [inputValue, setInputValue] = useState("");
    let [prevValue, setPrevValue] = useState("");
    let [outputValue, setOutputValue] = useState("");
    let [historyValue, setHistoryValue] = useState("");
    let [operator, setOperator] = useState("");
    let [error, setError] = useState("");
    let [operatorDisabled, setOperatorDisabled] = useState("");
    let [equalDisabled, setEqualDisabled] = useState("");


    useEffect(() => {
        console.table({inputValue, prevValue, outputValue, historyValue, operator, error, operatorDisabled, equalDisabled})
    }, [inputValue, prevValue, outputValue, historyValue, operator, error, operatorDisabled, equalDisabled]);

    const insert = (arr, index, newItem) => [
        ...arr.slice(0, index),
        newItem,
        ...arr.slice(index)
    ];

    const numberClick = (num) => {
        if (!(inputValue === "000" && num === "0")) {
            setError("");
            setOperatorDisabled("");
            let numbers;
            numbers = inputValue.match(/[:]/) ? (inputValue.split(/[:]/)[0].concat(inputValue.split(/[:]/)[1])) + num : inputValue + num;
            let transform = (num) => parseInt(num).toString(),
                numbersTransformed = transform(numbers);
            if (numbersTransformed.length < 9) {
                setInputValue(numbers);
                let arrNumbers;
                arrNumbers = () => {
                    if (numbersTransformed.length === 1) {
                        return "00" + numbersTransformed;
                    } else if (numbersTransformed.length === 2) {
                        return "0" + numbersTransformed;
                    } else if (numbersTransformed.length >= 3) {
                        return numbersTransformed;
                    }
                };
                let arr1 = Array.from(arrNumbers());
                let result = insert(arr1, arr1.length - 2, ":").join('');
                setOutputValue(result);
            } else {
                setError("Maximum 8 digits accepted")
            }
        }

    };

    const clear = () => {
        setInputValue("");
        setOutputValue("");
        setHistoryValue("");
        setError("");
        setOperator("");
        setPrevValue("");
        setOperatorDisabled("");
        setEqualDisabled("");
    };

    const backspaceClick = () => {
        let spliced = outputValue.split(/[:]/)[0].concat(outputValue.split(/[:]/)[1]).slice(),
            result,
            length = spliced.length;

        if (outputValue.length > 4) {
            result = spliced.slice(0, length - 3) + ":" + spliced.slice(length - 3, length - 1);
        } else if (outputValue.length === 4) {
            result = "0:" + spliced.slice(length - 3, length - 1);
        } else if (outputValue.length === 3) {
            result = "0:" + spliced.slice(length - 2, length - 1);
        } else if (outputValue.length <= 2) {
            result = ""
        }
        setOutputValue(result);
        setInputValue(result);
    };

    useEffect(() => {
        setPrevValue(historyValue + " " + operator);
    }, [historyValue, operator]);

    useEffect(() => {
        if (operator !== "") {
            setOperatorDisabled(" pressed");
        }
    }, [outputValue]);


    const operatorClick = (op) => {
        setInputValue("");
        setOperator(op);
        setHistoryValue(outputValue);
        setEqualDisabled("");
    };

    const equalClick = () => {
        let convertToMinutes = (num) => {
                let hours = num.split(/[:]/)[0];
                let minutes = num.split(/[:]/)[1];
                return parseInt(math.evaluate((parseInt(hours) * 60) + parseInt(minutes)));
            },
            minutesResult = (num1, operator, num2) => {
                return math.evaluate(parseInt(num1) + operator + parseInt(num2));
            },
            convertToExpression = (num) => {
                let hours = Math.floor(num / 60);
                let minutes = num - hours * 60;
                if (minutes.toString().length === 1) {
                    minutes = '0' + minutes;
                }
                return hours + ":" + minutes;
            };
        if (operator !== "" && outputValue !== "") {
            let result = convertToExpression(minutesResult(convertToMinutes(historyValue), operator, convertToMinutes(outputValue)));
            if (result.match(/[-]/)) {
                setError("Time couldn't be negative");
            }
            setInputValue(convertToMinutes(result).toString());
            setOutputValue(result);
            setHistoryValue("");
            setOperator("");
            setEqualDisabled(" pressed");
            setOperatorDisabled("");
        }
    };


    return (
        <div className="App">
            <span className="errorMessage">{error}</span>
            <span className="prevValue">{prevValue}</span>
            <input readOnly={true} placeholder={"0:00"} className="input big" value={outputValue}/>
            <div className="section">
                <Button value="7" onClick={() => {
                    numberClick("7")
                }}/>
                <Button value="8" onClick={() => {
                    numberClick("8")
                }}/>
                <Button value="9" onClick={() => {
                    numberClick("9")
                }}/>
                <Button value={<img src={backspace} alt={"backspace"}/>} onClick={() => {
                    backspaceClick();
                }}/>
                <Button value="4" onClick={() => {
                    numberClick("4")
                }}/>
                <Button value="5" onClick={() => {
                    numberClick("5")
                }}/>
                <Button value="6" onClick={() => {
                    numberClick("6")
                }}/>
                <Button classList={operatorDisabled} value="-" onClick={() => {
                    operatorClick("-")
                }}/>
                <Button value="1" onClick={() => {
                    numberClick("1")
                }}/>
                <Button value="2" onClick={() => {
                    numberClick("2")
                }}/>
                <Button value="3" onClick={() => {
                    numberClick("3")
                }}/>
                <Button classList={operatorDisabled} value="+" onClick={() => {
                    operatorClick("+")
                }}/>
                <Button value="0" classList="double" onClick={() => {
                    numberClick("0")
                }}/>
                <Button value="C" onClick={() => {
                    clear();
                }}/>
                <Button classList={equalDisabled} value="=" onClick={() => {
                    equalClick();
                }}/>
            </div>
        </div>
    )
};
