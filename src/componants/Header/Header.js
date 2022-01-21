import React, {useContext} from 'react';
import {TodoContext} from "../../Context/TodoContext";
import {Link} from "react-router-dom";

const Header = () => {
    const {todos} = useContext(TodoContext)

    return (
        <div className='bg-gray-800 text-white flex justify-between items-center py-3 px-5'>
            <Link to="/copy">Copy</Link>
            <Link to="/">Main</Link>
            <div>TodoApp</div>
            <div>Total todos: ({todos.length})</div>
        </div>
    );
};

export default Header;