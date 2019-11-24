import React from "react";
import * as math from 'mathjs';
import "./App.scss";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            valueInput: 0,
            valueHidden: 0,
            ifOperator: false,
            operator: null,
            valueHistory: 0,
            timeFunc: false,
            targetClass: null
        };
        this.newRef = React.createRef();
    }


    clearValue = () => {
        this.setState({
            valueInput: 0,
            valueHidden: 0,
            ifOperator: false,
            operator: null,
            valueHistory: 0,
            timeFunc: false
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

    }

    number = num => {
        let number = parseFloat(num);
        let matched = (num) => {
            if (num.toString().match(/0./) === null) {
                return false
            } else return num.match(/0./).length
        }

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
                this.setState({
                    valueInput: this.state.valueInput + num,
                });
            }
        }

        if (this.state.ifOperator === false) {
            baseFunc();
        } else {
            baseFunc();
            this.setState({
                valueInput: number,
                ifOperator: false
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
                operator: op
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
        } else {
            let settings = (statement) => {
                this.setState({
                    valueHidden: 0,
                    valueInput: statement + 'М',
                    ifOperator: false,
                    valueHistory: this.state.valueInput + "=" + statement + 'М',
                    operator: null
                });
            }
            if (this.ifHour(this.state.valueInput) && !this.ifMinute(this.state.valueInput)) {
                // debugger
                let HoursToMin = this.state.valueInput.replace(/Ч/, '*60');
                let statement = math.evaluate(HoursToMin);
                settings(statement);
            } else if (this.ifBoth(this.state.valueInput)) {
                // debugger
                let HoursToMin = this.state.valueInput.replace(/Ч/, '*60+').replace(/М/, '.0');
                let statement = math.evaluate(HoursToMin);
                settings(statement);
            }

        }


        this.scrollEnd(this.newRef.current);
    };

    scrollEnd = (elem) => {
        elem.scrollLeft = elem.scrollWidth
    }


    ifHour = (num) => {
        if (num.toString().match(/Ч/) === null) {
            return false
        } else {
            console.log(num.toString().match(/Ч/))
            return num.toString().match(/Ч/).length
        }
    }
    ifMinute = (num) => {
        if (num.toString().match(/М/) === null) {
            return false
        } else return num.toString().match(/М/).length
    }
    ifBoth = (num) => {
        if (num.toString().match(/Ч/) === null) {
            return false
        } else if (num.toString().match(/М/) === null) {
            return false;
        } else return num.toString().match(/Ч/).length
    }
    hour = () => {
        if (!this.ifHour(this.state.valueInput)) {
            this.setState({
                valueInput: this.state.valueInput + "Ч",
                timeFunc: true
            });
        }

    }
    minute = () => {
        if (!this.ifMinute(this.state.valueInput)) {
            this.setState({
                valueInput: this.state.valueInput + "М",
                timeFunc: true
            });
        }

    }
    addClass = (e) => {
        e.target.classList.add('active');
        this.setState({
            targetClass: e.target
        });
    }
    removeClass = (el) => {
        el.classList.remove('active');
    }
    buttonClick = (e) => {
        this.addClass(e);
        setTimeout(() => {
            this.removeClass(this.state.targetClass);
            this.setState({targetClass: null});
        }, 100)
    }


    render() {
        window.state = this.state;
        return (
            <div className="App">
                <div className="input">{this.state.valueInput}</div>
                <input ref={this.newRef} readOnly type="text" className="output" value={this.state.valueHistory}/>
                <div className="section">
                    <div className="button" onClick={(e) => {
                        this.clearValue();
                        this.buttonClick(e)
                    }}>
                        C
                    </div>
                    <div className="button" onClick={(e) => {
                        this.hour();
                        this.buttonClick(e)
                    }}>Ч
                    </div>
                    <div className="button" onClick={(e) => {
                        this.minute();
                        this.buttonClick(e)
                    }}>М
                    </div>
                    <div className="button" operator="/" onClick={e => {
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
                    <div className="button" operator="*" onClick={e => {
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
                    <div className="button" onClick={(e) => {
                        this.dot();
                        this.buttonClick(e)
                    }}>,
                    </div>
                    <div className="button" onClick={(e) => {
                        this.equal();
                        this.buttonClick(e)
                    }}>=
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
