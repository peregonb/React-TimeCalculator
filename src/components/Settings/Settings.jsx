import React from "react";

export default ({openPopup}) => {
    return (
        <div className={`options${openPopup ? '' : ' hidden'}`}>настройки </div>
    )
}