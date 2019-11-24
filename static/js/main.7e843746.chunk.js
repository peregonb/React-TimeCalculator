(this["webpackJsonpreact-time-calculator"]=this["webpackJsonpreact-time-calculator"]||[]).push([[0],{17:function(t,e,n){t.exports=n(25)},22:function(t,e,n){},23:function(t,e,n){},25:function(t,e,n){"use strict";n.r(e);var a=n(1),u=n.n(a),l=n(8),r=n.n(l),o=(n(22),n(9)),i=n(10),c=n(14),s=n(11),m=n(15),v=n(27),p=(n(23),function(t){function e(t){var n;return Object(o.a)(this,e),(n=Object(c.a)(this,Object(s.a)(e).call(this,t))).clearValue=function(){n.setState({valueInput:0,valueHidden:0,ifOperator:!1,operator:null,valueHistory:0,timeFunc:!1}),n.scrollEnd(n.newRef.current)},n.ifDot=function(t){for(var e,n=/\W/g,a=[];null!==(e=n.exec(t));)return e.index===n.lastIndex&&n.lastIndex++,a.push(e),a.length},n.number=function(t){var e=parseFloat(t),a=function(t){return null!==t.toString().match(/0./)&&t.match(/0./).length},u=function(){(0!==e||n.state.valueInput)&&(0!==parseInt(n.state.valueInput)||a(n.state.valueInput))?(a(n.state.valueInput),n.setState({valueInput:n.state.valueInput+t})):n.setState({valueInput:t})};!1===n.state.ifOperator?u():(u(),n.setState({valueInput:e,ifOperator:!1})),n.scrollEnd(n.newRef.current)},n.dot=function(){n.ifDot(n.state.valueInput)||n.setState({valueInput:n.state.valueInput+"."}),n.scrollEnd(n.newRef.current)},n.mathOperator=function(t){if(0===n.state.valueHidden)n.setState({valueHidden:n.state.valueInput,ifOperator:!0,operator:t});else{var e=v.a(parseFloat(n.state.valueHidden)+n.state.operator+parseFloat(n.state.valueInput));n.setState({valueHidden:e,valueInput:e,ifOperator:!0,valueHistory:e,operator:t})}n.scrollEnd(n.newRef.current)},n.equal=function(){if(!1===n.state.timeFunc){var t=v.a(parseFloat(n.state.valueHidden)+n.state.operator+parseFloat(n.state.valueInput));n.setState({valueHidden:0,valueInput:t,ifOperator:!1,valueHistory:t,operator:null})}else{var e=function(t){n.setState({valueHidden:0,valueInput:t+"\u041c",ifOperator:!1,valueHistory:n.state.valueInput+"="+t+"\u041c",operator:null})};if(n.ifHour(n.state.valueInput)&&!n.ifMinute(n.state.valueInput)){var a=n.state.valueInput.replace(/\u0427/,"*60");e(v.a(a))}else if(n.ifBoth(n.state.valueInput)){var u=n.state.valueInput.replace(/\u0427/,"*60+").replace(/\u041c/,".0");e(v.a(u))}}n.scrollEnd(n.newRef.current)},n.scrollEnd=function(t){t.scrollLeft=t.scrollWidth},n.ifHour=function(t){return null!==t.toString().match(/\u0427/)&&(console.log(t.toString().match(/\u0427/)),t.toString().match(/\u0427/).length)},n.ifMinute=function(t){return null!==t.toString().match(/\u041c/)&&t.toString().match(/\u041c/).length},n.ifBoth=function(t){return null!==t.toString().match(/\u0427/)&&(null!==t.toString().match(/\u041c/)&&t.toString().match(/\u0427/).length)},n.hour=function(){n.ifHour(n.state.valueInput)||n.setState({valueInput:n.state.valueInput+"\u0427",timeFunc:!0})},n.minute=function(){n.ifMinute(n.state.valueInput)||n.setState({valueInput:n.state.valueInput+"\u041c",timeFunc:!0})},n.addClass=function(t){t.target.classList.add("active"),n.setState({targetClass:t.target})},n.removeClass=function(t){t.classList.remove("active")},n.buttonClick=function(t){n.addClass(t),setTimeout((function(){n.removeClass(n.state.targetClass),n.setState({targetClass:null})}),100)},n.state={valueInput:0,valueHidden:0,ifOperator:!1,operator:null,valueHistory:0,timeFunc:!1,targetClass:null},n.newRef=u.a.createRef(),n}return Object(m.a)(e,t),Object(i.a)(e,[{key:"render",value:function(){var t=this;return window.state=this.state,u.a.createElement("div",{className:"App"},u.a.createElement("div",{className:"input"},this.state.valueInput),u.a.createElement("input",{ref:this.newRef,readOnly:!0,type:"text",className:"output",value:this.state.valueHistory}),u.a.createElement("div",{className:"section"},u.a.createElement("div",{className:"button",onClick:function(e){t.clearValue(),t.buttonClick(e)}},"C"),u.a.createElement("div",{className:"button",onClick:function(e){t.hour(),t.buttonClick(e)}},"\u0427"),u.a.createElement("div",{className:"button",onClick:function(e){t.minute(),t.buttonClick(e)}},"\u041c"),u.a.createElement("div",{className:"button",operator:"/",onClick:function(e){t.mathOperator(e.target.getAttribute("operator")),t.buttonClick(e)}},"\xf7"),u.a.createElement("div",{className:"button",onClick:function(e){t.number(e.target.innerHTML),t.buttonClick(e)}},"7"),u.a.createElement("div",{className:"button",onClick:function(e){t.number(e.target.innerHTML),t.buttonClick(e)}},"8"),u.a.createElement("div",{className:"button",onClick:function(e){t.number(e.target.innerHTML),t.buttonClick(e)}},"9"),u.a.createElement("div",{className:"button",operator:"*",onClick:function(e){t.mathOperator(e.target.getAttribute("operator")),t.buttonClick(e)}},"\xd7"),u.a.createElement("div",{className:"button",onClick:function(e){t.number(e.target.innerHTML),t.buttonClick(e)}},"4"),u.a.createElement("div",{className:"button",onClick:function(e){t.number(e.target.innerHTML),t.buttonClick(e)}},"5"),u.a.createElement("div",{className:"button",onClick:function(e){t.number(e.target.innerHTML),t.buttonClick(e)}},"6"),u.a.createElement("div",{className:"button",onClick:function(e){t.mathOperator(e.target.innerHTML),t.buttonClick(e)}},"-"),u.a.createElement("div",{className:"button",onClick:function(e){t.number(e.target.innerHTML),t.buttonClick(e)}},"1"),u.a.createElement("div",{className:"button",onClick:function(e){t.number(e.target.innerHTML),t.buttonClick(e)}},"2"),u.a.createElement("div",{className:"button",onClick:function(e){t.number(e.target.innerHTML),t.buttonClick(e)}},"3"),u.a.createElement("div",{className:"button",onClick:function(e){t.mathOperator(e.target.innerHTML),t.buttonClick(e)}},"+"),u.a.createElement("div",{className:"button double",onClick:function(e){t.number(e.target.innerHTML),t.buttonClick(e)}},"0"),u.a.createElement("div",{className:"button",onClick:function(e){t.dot(),t.buttonClick(e)}},","),u.a.createElement("div",{className:"button",onClick:function(e){t.equal(),t.buttonClick(e)}},"=")))}}]),e}(u.a.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(u.a.createElement(p,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()}))}},[[17,1,2]]]);
//# sourceMappingURL=main.7e843746.chunk.js.map