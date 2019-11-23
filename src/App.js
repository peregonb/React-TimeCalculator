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
            valueHistory: 0
        };
        this.newRef = React.createRef();
    }


    clearValue = () => {
        this.setState({
            valueInput: 0,
            valueHidden: 0,
            ifOperator: false,
            operator: null,
            valueHistory: 0
        });

        this.scrollEnd(this.newRef.current);
    };

    ifDot = str => {
        const regex = /\W/g;
        let m;
        while ((m = regex.exec(str)) !== null) {
            if (m.index === regex.lastIndex) {
                regex.lastIndex++;
            }
            m.forEach(() => {return true});
        }
    }

    number = num => {
        let number = parseFloat(num);
        let baseFunc = () => {
            // if (parseInt(this.state.valueInput) === 0 &&
            // (!((this.state.valueInput + "").indexOf(".") > 0))) {
            //     this.setState({
            //         valueInput: parseInt(num),
            //         valueHistory: parseInt(num)
            //     });
            // } else {
            //     this.setState({
            //         valueInput: this.state.valueInput + num,
            //         valueHistory: this.state.valueHistory + num
            //     });
            // }

            if (number === 0) {
                console.log('1')
                this.setState({
                    valueInput: num,
                    // valueHistory: num
                });
            } else if (parseInt(this.state.valueInput) === 0 && this.state.valueInput !== "0.") {
                console.log('3')
                this.setState({
                    valueInput: num,
                    // valueHistory: num
                });
            } else if (this.state.valueInput === "0.") {
                console.log('4')
                this.setState({
                    valueInput: this.state.valueInput + num,
                    // valueHistory: this.state.valueHistory + num
                });
            } else {
                console.log('2')
                this.setState({
                    valueInput: this.state.valueInput + num,
                    // valueHistory: this.state.valueHistory + num
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
            // debugger
            console.log(this.state)
            this.setState({

                valueInput: this.state.valueInput + ".",
                // valueHistory: this.state.valueInput + "."
            });
        }

        this.scrollEnd(this.newRef.current);
    };

    mathOperator = (op) => {

        if (this.state.valueHidden === 0) {
            // if (parseInt(this.state.valueInput) === 0) {
            //     this.clearValue()
            // } else {
            this.setState({
                valueHidden: this.state.valueInput,
                ifOperator: true,
                operator: op,
                // valueHistory: this.state.valueHistory + op
            });
            // }
        } else {
            // if (parseInt(this.state.valueInput) === 0) {
            // this.clearValue();
            // } else {
            // debugger
            let statement = math.evaluate(parseFloat(this.state.valueHidden) + this.state.operator + parseFloat(this.state.valueInput));
            this.setState({
                valueHidden: statement,
                valueInput: statement,
                ifOperator: true,
                operator: op,
                // valueHistory: this.state.valueHistory + "=" + math.evaluate(parseFloat(this.state.valueHidden) + this.state.operator + parseFloat(this.state.valueInput)) + op
            });
            // }
        }

        this.scrollEnd(this.newRef.current);
    };

    equal = () => {
        // if (parseInt(this.state.valueInput) === 0) {
        //     this.clearValue()
        // }
        // else {
        let statement = math.evaluate(parseFloat(this.state.valueHidden) + this.state.operator + parseFloat(this.state.valueInput));
        this.setState({
            valueHidden: statement,
            valueInput: statement,
            ifOperator: false,
            valueHistory: statement
        });
        // }
        this.setState({
            valueHidden: 0,
            ifOperator: false,
            operator: null
        });

        this.scrollEnd(this.newRef.current);
    };

    scrollEnd = (elem) => {
        elem.scrollLeft = elem.scrollWidth
    }

    componentDidMount() {
        window.state = this.state;
    }


    render() {
        return (
            <div className="App">
                <div className="input">{this.state.valueInput}</div>
                <input ref={this.newRef} readOnly type="text" className="output" value={this.state.valueHistory}/>
                <div className="section">
                    <div className="button" onClick={this.clearValue}>
                        C
                    </div>
                    <div className="button">Ч</div>
                    <div className="button">М</div>
                    <div className="button" operator="/" onClick={e => {
                        this.mathOperator(e.target.getAttribute("operator"))
                    }}>÷
                    </div>
                    <div className="button" onClick={e => {
                        this.number(e.target.innerHTML)
                    }}>
                        7
                    </div>
                    <div className="button" onClick={e => {
                        this.number(e.target.innerHTML)
                    }}>
                        8
                    </div>
                    <div className="button" onClick={e => {
                        this.number(e.target.innerHTML)
                    }}>
                        9
                    </div>
                    <div className="button" operator="*" onClick={e => {
                        this.mathOperator(e.target.getAttribute("operator"))
                    }}>×
                    </div>
                    <div className="button" onClick={e => {
                        this.number(e.target.innerHTML)
                    }}>
                        4
                    </div>
                    <div className="button" onClick={e => {
                        this.number(e.target.innerHTML)
                    }}>
                        5
                    </div>
                    <div className="button" onClick={e => {
                        this.number(e.target.innerHTML)
                    }}>
                        6
                    </div>
                    <div className="button" onClick={e => {
                        this.mathOperator(e.target.innerHTML)
                    }}>-
                    </div>
                    <div className="button" onClick={e => {
                        this.number(e.target.innerHTML)
                    }}>
                        1
                    </div>
                    <div className="button" onClick={e => {
                        this.number(e.target.innerHTML)
                    }}>
                        2
                    </div>
                    <div className="button" onClick={e => {
                        this.number(e.target.innerHTML)
                    }}>
                        3
                    </div>
                    <div className="button" onClick={e => {
                        this.mathOperator(e.target.innerHTML)
                    }}>+
                    </div>
                    <div className="button double" onClick={e => {
                        this.number(e.target.innerHTML)
                    }}>0
                    </div>
                    {/*<div className="button" onClick={e => {*/}
                    {/*    this.number(e.target.innerHTML)*/}
                    {/*}}>00*/}
                    {/*</div>*/}
                    <div className="button" onClick={this.dot}>,
                    </div>
                    <div className="button" onClick={this.equal}>=</div>
                </div>
            </div>
        );
    }
}

export default App;
