import React from "react";

export const Button = ({classList, value, onClick}) => {
    const buttonClick = e => {
        e.persist();
        e.target.classList.add('active');
        setTimeout(() => e.target.classList.remove('active'), 70);
    }

    return (
        <div className={`button ${classList ? classList : ''}`.trim()}
             onClick={e => {
                 buttonClick(e);
                 onClick();
             }}>
            {value}
        </div>
    )
};