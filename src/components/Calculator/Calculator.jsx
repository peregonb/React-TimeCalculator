import React, {useEffect, useState} from "react";
import backspace from "../../assets/img/backspase.svg";
import settingsImg from "../../assets/img/settings.svg";
import {Button} from "./Button";
import * as math from 'mathjs';
import Settings from "../Settings/Settings";

export const Calculator = () => {
    const pressedClassName = " pressed";

    let [inputValue, setInputValue] = useState("");
    let [prevValue, setPrevValue] = useState("");
    let [outputValue, setOutputValue] = useState("");
    let [historyValue, setHistoryValue] = useState("");
    let [operator, setOperator] = useState("");
    let [error, setError] = useState("");
    let [openPopup, setOpenPopup] = useState(false);
    let [equalDisabled, setEqualDisabled] = useState("");
    let [operatorDisabled, setOperatorDisabled] = useState(pressedClassName);
    let [backspaceAndOperatorDisabled, setBackspaceAndOperatorDisabled] = useState("");

    useEffect(() => {
        console.table({
            inputValue,
            prevValue,
            outputValue,
            historyValue,
            operator,
            error,
            equalDisabled,
            operatorDisabled,
            backspaceAndOperatorDisabled
        })
    }, [inputValue, prevValue, outputValue, historyValue, operator, error, equalDisabled, operatorDisabled, backspaceAndOperatorDisabled]);

    const insert = (arr, index, newItem) => [
        ...arr.slice(0, index),
        newItem,
        ...arr.slice(index)
    ];

    const numberClick = (num) => {
        if (!(inputValue === "000" && num === "0")) {
            setError("");
            setBackspaceAndOperatorDisabled("");
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
        setEqualDisabled("");
        setOperatorDisabled(pressedClassName);
        setBackspaceAndOperatorDisabled("");
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

    const operatorClick = (op) => {
        if (outputValue !== "") {
            setInputValue("");
            setOperator(op);
            setOutputValue("");
            setHistoryValue(outputValue);
            setEqualDisabled("");

            equalClick();
        } else {
            setOperator(op);
        }
    };

    const convertToMinutes = (num) => {
        let hours = num.split(/[:]/)[0];
        let minutes = num.split(/[:]/)[1];
        return parseInt(math.evaluate((parseInt(hours) * 60) + parseInt(minutes)));
    };

    const minutesResult = (num1, operator, num2) => {
        return math.evaluate(parseInt(num1) + operator + parseInt(num2));
    };

    const convertToExpression = (num) => {
        let hours = Math.floor(num / 60);
        let minutes = num - hours * 60;
        if (minutes.toString().length === 1) {
            minutes = '0' + minutes;
        }
        return hours + ":" + minutes;
    };

    const equalClick = () => {
        if (operator !== "" && outputValue !== "") {
            let result = convertToExpression(minutesResult(convertToMinutes(historyValue), operator, convertToMinutes(outputValue)));
            if (result.match(/[-]/)) {
                setError("Time couldn't be negative");
                setOutputValue('NaN');
                setBackspaceAndOperatorDisabled(pressedClassName);
                setInputValue("");
            } else {
                setInputValue(convertToMinutes(result).toString());
                setOutputValue(result);
            }
            setHistoryValue("");
            setOperator("");
            setEqualDisabled(pressedClassName);
        }
    };


    return (
        <>
            <div className={`calculator${openPopup ? ' hidden': ''}`}>
                <img className="settings" src={settingsImg} alt="settings" onClick={() => {setOpenPopup(!openPopup)}}/>
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
                    <Button classList={backspaceAndOperatorDisabled} value={<img src={backspace} alt={"backspace"}/>}
                            onClick={() => {
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
                    <Button classList={operatorDisabled + backspaceAndOperatorDisabled} value="-" onClick={() => {
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
                    <Button classList={operatorDisabled + backspaceAndOperatorDisabled} value="+" onClick={() => {
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

            <Settings openPopup={openPopup}/>
        </>
    )
};
