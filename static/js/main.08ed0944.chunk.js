(this["webpackJsonpreact-time-calculator"]=this["webpackJsonpreact-time-calculator"]||[]).push([[0],{17:function(e,t,a){e.exports=a(25)},22:function(e,t,a){},23:function(e,t,a){},25:function(e,t,a){"use strict";a.r(t);var n=a(1),r=a.n(n),l=a(8),o=a.n(l),u=(a(22),a(9)),s=a(10),i=a(14),c=a(11),p=a(15),v=a(27),m=(a(23),function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(i.a)(this,Object(c.a)(t).call(this,e))).clearValue=function(){a.setState({valueInput:0,valueHidden:0,ifOperator:!1,operator:null,valueHistory:0}),a.scrollEnd(a.newRef.current)},a.number=function(e){var t=function(){0!==parseInt(a.state.valueInput)||(a.state.valueInput+"").indexOf(".")>0?a.setState({valueInput:a.state.valueInput+e,valueHistory:a.state.valueHistory+e}):a.setState({valueInput:parseInt(e),valueHistory:parseInt(e)})};!1===a.state.ifOperator?t():(t(),a.setState({valueInput:e,ifOperator:!1})),a.scrollEnd(a.newRef.current)},a.dot=function(){(a.state.valueInput+"").indexOf(".")>0||(0===parseInt(a.state.valueInput)?a.setState({valueInput:"0."}):a.setState({valueInput:a.state.valueInput+"."})),a.scrollEnd(a.newRef.current)},a.mathOperator=function(e){0===a.state.valueHidden?0===parseInt(a.state.valueInput)?a.clearValue():a.setState({valueHidden:a.state.valueInput,ifOperator:!0,operator:e,valueHistory:a.state.valueHistory+e}):0===parseInt(a.state.valueInput)?a.clearValue():a.setState({valueHidden:v.a(parseFloat(a.state.valueHidden)+a.state.operator+parseFloat(a.state.valueInput)).split(8),valueInput:v.a(parseFloat(a.state.valueHidden)+a.state.operator+parseFloat(a.state.valueInput)).split(8),ifOperator:!0,operator:e}),a.scrollEnd(a.newRef.current)},a.equal=function(){0===parseInt(a.state.valueInput)?a.clearValue():a.setState({valueHidden:v.a(parseFloat(a.state.valueHidden)+a.state.operator+parseFloat(a.state.valueInput)),valueInput:v.a(parseFloat(a.state.valueHidden)+a.state.operator+parseFloat(a.state.valueInput)),ifOperator:!1,valueHistory:a.state.valueHistory+"="+v.a(parseFloat(a.state.valueHidden)+a.state.operator+parseFloat(a.state.valueInput))}),a.setState({valueHidden:0,ifOperator:!1,operator:null}),a.scrollEnd(a.newRef.current)},a.scrollEnd=function(e){e.scrollLeft=e.scrollWidth},a.state={valueInput:0,valueHidden:0,ifOperator:!1,operator:null,valueHistory:0},a.newRef=r.a.createRef(),a}return Object(p.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){window.state=this.state}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"App"},r.a.createElement("div",{className:"input"},this.state.valueInput),r.a.createElement("input",{ref:this.newRef,readOnly:!0,type:"text",className:"output",value:this.state.valueHistory}),r.a.createElement("div",{className:"section"},r.a.createElement("div",{className:"button",onClick:this.clearValue},"C"),r.a.createElement("div",{className:"button"},"\u0427"),r.a.createElement("div",{className:"button"},"\u041c"),r.a.createElement("div",{className:"button",operator:"/",onClick:function(t){e.mathOperator(t.target.getAttribute("operator"))}},"\xf7"),r.a.createElement("div",{className:"button",onClick:function(t){e.number(t.target.innerHTML)}},"7"),r.a.createElement("div",{className:"button",onClick:function(t){e.number(t.target.innerHTML)}},"8"),r.a.createElement("div",{className:"button",onClick:function(t){e.number(t.target.innerHTML)}},"9"),r.a.createElement("div",{className:"button",operator:"*",onClick:function(t){e.mathOperator(t.target.getAttribute("operator"))}},"\xd7"),r.a.createElement("div",{className:"button",onClick:function(t){e.number(t.target.innerHTML)}},"4"),r.a.createElement("div",{className:"button",onClick:function(t){e.number(t.target.innerHTML)}},"5"),r.a.createElement("div",{className:"button",onClick:function(t){e.number(t.target.innerHTML)}},"6"),r.a.createElement("div",{className:"button",onClick:function(t){e.mathOperator(t.target.innerHTML)}},"-"),r.a.createElement("div",{className:"button",onClick:function(t){e.number(t.target.innerHTML)}},"1"),r.a.createElement("div",{className:"button",onClick:function(t){e.number(t.target.innerHTML)}},"2"),r.a.createElement("div",{className:"button",onClick:function(t){e.number(t.target.innerHTML)}},"3"),r.a.createElement("div",{className:"button",onClick:function(t){e.mathOperator(t.target.innerHTML)}},"+"),r.a.createElement("div",{className:"button",onClick:function(t){e.number(t.target.innerHTML)}},"0"),r.a.createElement("div",{className:"button",onClick:function(t){e.number(t.target.innerHTML)}},"00"),r.a.createElement("div",{className:"button",onClick:this.dot},","),r.a.createElement("div",{className:"button",onClick:this.equal},"=")))}}]),t}(r.a.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(m,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[17,1,2]]]);
//# sourceMappingURL=main.08ed0944.chunk.js.map