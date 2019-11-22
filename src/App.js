import React from "react";
import "./App.scss";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            valueInput: 0,
            valueHidden: 0,
            ifOperator: false,
            operator: null
        };
    }


    clearValue = () => {
        this.setState({
            valueInput: 0,
            valueHidden: 0,
            ifOperator: false,
            operator: null
        });
    };
    number = num => {
        let baseFunc = () => {
            if (parseInt(this.state.valueInput) === 0 && !((this.state.valueInput + "").indexOf(".") > 0)) {
                this.setState({
                    valueInput: "" + parseInt(num) + ""
                });
            } else {
                this.setState({
                    valueInput: this.state.valueInput + "" + num + ""
                });
            }
        }

        if (this.state.ifOperator === false) {
            baseFunc();
        } else {
            baseFunc();
            this.setState({
                valueInput: num,
                ifOperator: false
            });

        }
    };
    dot = () => {
        if (!((this.state.valueInput + "").indexOf(".") > 0)) {
            if (parseInt(this.state.valueInput) === 0) {
                this.setState({
                    valueInput: "0."
                });
            } else {
                this.setState({
                    valueInput: this.state.valueInput + "."
                });
            }
        }
    };
    plus = () => {
        if (this.state.valueHidden === 0) {
            if (parseInt(this.state.valueInput) === 0) {
                this.clearValue()
            } else {
                this.setState({
                    valueHidden: this.state.valueInput,
                    ifOperator: true,
                    operator: "+"
                });
            }
        } else {
            if (parseInt(this.state.valueInput) === 0) {
                this.clearValue()
            } else {
                this.setState({
                    valueHidden: parseInt(this.state.valueHidden) + parseInt(this.state.valueInput),
                    valueInput: parseInt(this.state.valueHidden) + parseInt(this.state.valueInput),
                    ifOperator: true,
                    operator: "+"
                });
            }
        }

    };

    equal = () => {
        this.plus();
        this.setState({
            valueHidden: 0,
            ifOperator: false,
            operator: null
        });
    };

    render() {
        window.state = this.state;
        document.addEventListener('click', function () {
            console.log(window.state)
        }, false);
        return (
            <div className="App">
                <div className="input">{this.state.valueInput}</div>
                <div className="section">
                    <div className="button" onClick={this.clearValue}>
                        C
                    </div>
                    <div className="button">Ч</div>
                    <div className="button">М</div>
                    <div className="button">÷</div>
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
                    <div className="button">×</div>
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
                    <div className="button">-</div>
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
                    <div className="button" onClick={this.plus}>+</div>
                    <div className="button" onClick={e => {
                        this.number(e.target.innerHTML)
                    }}>0
                    </div>
                    <div className="button" onClick={e => {
                        this.number(e.target.innerHTML)
                    }}>00
                    </div>
                    <div className="button" onClick={this.dot}>,
                    </div>
                    <div className="button" onClick={this.equal}>=</div>
                </div>
            </div>
        );
    }
}

export default App;
