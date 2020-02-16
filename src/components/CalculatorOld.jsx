import React from "react";
import * as math from 'mathjs';
import {Redirect} from "react-router-dom";

class CalculatorOld extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            valueInput: 0,
            valueHidden: 0,
            ifOperator: false,
            operator: null,
            valueHistory: 0,
            timeFunc: false,
            targetClass: null,
            timeFuncClass: "",
            hourDisable: false,
            minuteDisable: false,
            equalDisable: false,
            error: ""
        };
        this.newRef = React.createRef();
    };


    clearValue = () => {
        this.setState({
            valueInput: 0,
            valueHidden: 0,
            ifOperator: false,
            operator: null,
            valueHistory: 0,
            timeFunc: false,
            timeFuncClass: "",
            hourDisable: false,
            minuteDisable: false,
            equalDisable: false,
            error: ""
        });

        this.scrollEnd(this.newRef.current);
    };


    ifDot = (str) => {
        const regex = /\W/g;
        let m;
        let arr = [];

        while ((m = regex.exec(str)) !== null) {
            if (m.index === regex.lastIndex) {
                regex.lastIndex++;
            }
            arr.push(m);
            return arr.length;
        }

    };

    number = num => {
        let number = parseFloat(num);
        let matched = (num) => {
            if (num.toString().match(/0./) === null) {
                return false
            } else return num.match(/0./).length
        };
        let baseFunc = () => {
            if (number === 0 && !this.state.valueInput) {
                this.setState({
                    valueInput: num,
                });
            } else if (parseInt(this.state.valueInput) === 0 && !matched(this.state.valueInput)) {
                this.setState({
                    valueInput: num,
                });
            } else if (matched(this.state.valueInput)) {
                this.setState({
                    valueInput: this.state.valueInput + num,
                });
            } else {
                (async () => {
                    let response = await this.setState({valueInput: this.state.valueInput + num});
                    if (this.state.valueInput === "7452") {
                        this.setState({redirect: true});
                    }
                    return response;
                })();
            }
        };
        if (this.state.ifOperator === false) {
            baseFunc();
        } else {
            baseFunc();
            this.setState({
                valueInput: number,
                ifOperator: false,
                hourDisable: false,
                minuteDisable: false
            });
        }

        this.scrollEnd(this.newRef.current);
    };
    dot = () => {
        if (!this.ifDot(this.state.valueInput)) {
            this.setState({
                valueInput: this.state.valueInput + "."
            });
        }
        this.scrollEnd(this.newRef.current);
    };
    mathOperator = (op) => {
        if (this.state.valueHidden === 0) {
            this.setState({
                valueHidden: this.state.valueInput,
                ifOperator: true,
                operator: op,
            });
        } else {
            let statement = math.evaluate(parseFloat(this.state.valueHidden) + this.state.operator + parseFloat(this.state.valueInput));
            this.setState({
                valueHidden: statement,
                valueInput: statement,
                ifOperator: true,
                valueHistory: statement,
                operator: op,
                equalDisable: false
            });

        }
        this.scrollEnd(this.newRef.current);
    };
    equal = () => {
        if (this.state.timeFunc === false) {
            let statement = math.evaluate(parseFloat(this.state.valueHidden) + this.state.operator + parseFloat(this.state.valueInput));
            this.setState({
                valueHidden: 0,
                valueInput: statement,
                ifOperator: false,
                valueHistory: statement,
                operator: null
            });
            if (this.state.operator === '/' && parseFloat(this.state.valueInput) === 0) {
                this.setState({error: "ну, ты шалун)"})
            }
        } else {
            if (this.state.timeFunc === true && !this.ifAny(this.state.valueInput)) {
                this.setState({error: "Введи переменную часа или минуты"})
            } else {
                let transformExpression = (expression) => {
                    console.log(expression)
                    if (expression.match(/[H]/) && expression.match(/[M]/)) {
                        let re = /[M]/;
                        let arr = expression.split(re);
                        if (arr[1] === "") {
                            return expression;
                        } else {
                            return arr[1] + arr[0] + "M"
                        }
                    } else if (!expression.match(/[H]/) && expression.match(/[M]/)) {
                        return "0H" + expression
                    } else if (expression.match(/[H]/) && !expression.match(/[M]/)) {
                        return expression + "M"
                    } else {
                        return this.setState({equalDisable: true});
                    }
                };
                let toStatement = (firstValue, secondValue) => {
                    let re = /[HM]/;
                    let arr1 = firstValue.split(re);
                    let arr2 = secondValue.split(re);
                    let secondsFirst = (+arr1[0]) * 60 * 60 + (+arr1[1]) * 60;
                    let secondsSecond = (+arr2[0]) * 60 * 60 + (+arr2[1]) * 60;
                    return math.evaluate(parseInt(secondsFirst) + this.state.operator + parseInt(secondsSecond));
                };
                let toDate = (num) => {
                    let hours = parseInt((num / 60) / 60);
                    let minutes = num / 60 - (hours * 60);
                    if (hours === 0 && minutes !== 0) {
                        return minutes + "M"
                    } else if (minutes === 0 && hours !== 0) {
                        return hours + "H"
                    } else if (minutes === 0 && hours === 0) {
                        return 0;
                    } else {
                        return hours + "H" + minutes + "M"
                    }
                };

                let statement = toStatement(transformExpression(this.state.valueHidden), transformExpression(this.state.valueInput));

                this.setState({
                    // valueHidden: this.state.valueInputHistory,
                    valueInput: toDate(statement),
                    // valueHistory: his,
                    equalDisable: true,
                    error: ""
                });
            }
        }


        this.scrollEnd(this.newRef.current);
    };
    scrollEnd = (elem) => {
        elem.scrollLeft = elem.scrollWidth
    };

    ifHour = (num) => {
        if (num.toString().match(/H/) === null) {
            return false
        } else {
            return num.toString().match(/H/).length
        }
    };
    ifMinute = (num) => {
        if (num.toString().match(/M/) === null) {
            return false
        } else return num.toString().match(/M/).length
    };
    ifAny = num => {
        if (num.toString().match(/[HM]/) === null) {
            return false
        } else return num.toString().match(/[HM]/).length
    };

    hour = () => {
        if (!this.ifHour(this.state.valueInput)) {
            this.setState({
                valueInput: this.state.valueInput + "H",
                timeFunc: true,
                timeFuncClass: "time",
                hourDisable: true
            });
        }
    };

    minute = () => {
        if (!this.ifMinute(this.state.valueInput)) {
            this.setState({
                valueInput: this.state.valueInput + "M",
                timeFunc: true,
                timeFuncClass: "time",
                minuteDisable: true
            });
        }
    };


    addClass = (e) => {
        e.target.classList.add('active');
        this.setState({
            targetClass: e.target
        });
    };
    removeClass = (el) => {
        if (el) {
            el.classList.remove('active');
        }
    };
    buttonClick = (e) => {
        this.addClass(e);
        setTimeout(() => {
            this.removeClass(this.state.targetClass);
            this.setState({targetClass: null});
        }, 100)
    };


    render() {
        let app = this.state.redirect ? <Redirect to={process.env.PUBLIC_URL + "/calculator"}/> : (
            <div className={"App " + this.state.timeFuncClass}>
                <span className="errorMessage">{this.state.error}</span>
                <div className="input">{this.state.valueInput}</div>
                <input ref={this.newRef} readOnly type="text" className="output" value={this.state.valueHistory}/>
                <div className="section">
                    <div className="button" onClick={(e) => {
                        this.clearValue();
                        this.buttonClick(e)
                    }}>
                        C
                    </div>
                    <div className={this.state.hourDisable ? "button disabled" : "button"} onClick={(e) => {
                        this.hour();
                        this.buttonClick(e)
                    }}>H
                    </div>
                    <div className={this.state.minuteDisable ? "button disabled" : "button"} onClick={(e) => {
                        this.minute();
                        this.buttonClick(e)
                    }}>M
                    </div>
                    <div className="button ifTimeDisable" operator="/" onClick={e => {
                        this.mathOperator(e.target.getAttribute("operator"));
                        this.buttonClick(e)
                    }}>÷
                    </div>
                    <div className="button" onClick={e => {
                        this.number(e.target.innerHTML);
                        this.buttonClick(e)
                    }}>
                        7
                    </div>
                    <div className="button" onClick={e => {
                        this.number(e.target.innerHTML);
                        this.buttonClick(e)
                    }}>
                        8
                    </div>
                    <div className="button" onClick={e => {
                        this.number(e.target.innerHTML);
                        this.buttonClick(e)
                    }}>
                        9
                    </div>
                    <div className="button ifTimeDisable" operator="*" onClick={e => {
                        this.mathOperator(e.target.getAttribute("operator"));
                        this.buttonClick(e)
                    }}>×
                    </div>
                    <div className="button" onClick={e => {
                        this.number(e.target.innerHTML);
                        this.buttonClick(e)
                    }}>
                        4
                    </div>
                    <div className="button" onClick={e => {
                        this.number(e.target.innerHTML);
                        this.buttonClick(e)
                    }}>
                        5
                    </div>
                    <div className="button" onClick={e => {
                        this.number(e.target.innerHTML);
                        this.buttonClick(e)
                    }}>
                        6
                    </div>
                    <div className="button" onClick={e => {
                        this.mathOperator(e.target.innerHTML);
                        this.buttonClick(e)
                    }}>-
                    </div>
                    <div className="button" onClick={e => {
                        this.number(e.target.innerHTML);
                        this.buttonClick(e)
                    }}>
                        1
                    </div>
                    <div className="button" onClick={e => {
                        this.number(e.target.innerHTML);
                        this.buttonClick(e)
                    }}>
                        2
                    </div>
                    <div className="button" onClick={e => {
                        this.number(e.target.innerHTML);
                        this.buttonClick(e)
                    }}>
                        3
                    </div>
                    <div className="button" onClick={e => {
                        this.mathOperator(e.target.innerHTML);
                        this.buttonClick(e)
                    }}>+
                    </div>
                    <div className="button double" onClick={e => {
                        this.number(e.target.innerHTML);
                        this.buttonClick(e)
                    }}>0
                    </div>
                    <div className="button ifTimeDisable" onClick={(e) => {
                        this.dot();
                        this.buttonClick(e)
                    }}>,
                    </div>
                    <div className={this.state.equalDisable ? "button disabled" : "button"} onClick={(e) => {
                        this.equal();
                        this.buttonClick(e)
                    }}>=
                    </div>
                </div>
            </div>);
        return (
            app
        );
    }

    // componentWillUnmount() {
    //     this.clearValue();
    // }
}

export default CalculatorOld;
