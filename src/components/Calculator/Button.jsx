import React, {useRef} from "react";

export const Button = props => {
    const ref = useRef();
    const buttonClick = () => {
        let classList = ref.current.classList;
        classList.add("active");
        setTimeout(() => {
            classList.remove("active");
        }, 70);
    };

    return (
        <div ref={ref}
             className={`button${props.classList ? " " + props.classList : ""}`}
             onClick={() => {
                 buttonClick();
                 props.onClick();
             }}>
            {props.value}
        </div>
    )
};