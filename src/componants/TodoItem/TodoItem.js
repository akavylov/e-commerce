import React, {useContext, useState} from 'react';
import {t, TodoContext} from "../../Context/TodoContext";
import Button from "../Common/Button/Button";

const TodoItem = ({it}) => {
    const [isEdit, setIsEdit] = useState(false)
    const [todoText, setTodoText] = useState(it.text)
    const {dispatch} = useContext(TodoContext)

    const saveTodo = () => {
        setIsEdit(false)
        dispatch({type: t.EDIT_TODO, id: it.id, text: todoText})
    }

    const saveEnter = (e) => {
        if (e.key === 'Enter') {
            saveTodo()
        }
    }

    return (
        <div className='flex justify-between py-3 px-6 tod-row'>
            <input checked={it.isDone} type="checkbox" onChange={(e) => dispatch({type: "CHECK_TODO", isDone: e.target.checked, id: it.id})}/>
            <div className='px-6 flex justify-between'>
                {
                    isEdit
                    ? <input onKeyDown={saveEnter} autoFocus={true} value={todoText} onChange={(e) => setTodoText(e.target.value)} type="text"/>
                    : <span className="todo-text inline-block">{it.text}</span>
                }
            </div>
            <div>
                {
                    isEdit
                    ? <Button color="green" text="Save" onClick={saveTodo} />
                    : <Button color="yellow" text="Edit" onClick={() => setIsEdit(true)} />
                }
                <Button color="red" text="Delete" onClick={() => dispatch({type: t.DELETE_TODO, id: it.id})}/>
            </div>
        </div>
    );
};

export default TodoItem;