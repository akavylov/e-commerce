import React from 'react';

const Button = ({text, onClick, color = 'gray', classname=''}) => {
    return (
        <button className={`text-white ${classname} rounded-lg bg-${color}-400 hover:bg-${color}-500 px-5 py-1 mr-1 duration-300`}
        onClick={onClick}
        >
            {text}
        </button>
    );
};

export default Button;