import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
import {t} from '../../Context/TodoContext'
import {TodoContext} from "../../Context/TodoContext";
import TodoItem from "../../componants/TodoItem/TodoItem";
import Button from "../../componants/Common/Button/Button";

const Main = () => {
    const [todoText, setTodoText] = useState('')
    const [sort, setSort] = useState(false)
    const {todos, dispatch} = useContext(TodoContext)

    const refTodo = useRef(null)

    const addTodo = () => {
        setTodoText("")
        dispatch({type: t.ADD_TODO, text: todoText})
    }

    const sortTodo = () => {
        dispatch({type: t.SORT_TODO, sort})
        setSort(!sort)
    }
    const deleteAll = useCallback(() => {
        const confirm = window.confirm("You really?")
        if (confirm) {
            dispatch({type: t.DELETE_ALL})
        }
    }, [dispatch])

     useEffect(() => {
         window.addEventListener('keydown', (e) => {
              if (e.key === 'Delete') {
                 deleteAll()
             }
         })
     }, [deleteAll])

    const handle = (e) => {
        if (e.key === 'Enter') {
            addTodo()
        } else if (e.key === 'Escape') {
            refTodo.current.blur()
            setTodoText("")
        }
    }

    return (
        <div className='todos border-2 border-gray-100 '>
            <div className='flex bg-gray-200 text-center justify-between font-semibold px-6 py-3'>
                <Button onClick={sortTodo} text="Sort" color="blue"/>
                <div className="text-center">Todos ({todos.length})</div>
                <div>{!!todos.length && <Button onClick={deleteAll}  text="Delete all" color="red"/>}</div>
            </div>
            <div className='flex px-6'>
                <input
                    ref={refTodo}
                    onKeyDown={handle}
                    value={todoText}
                    onChange={(e) => setTodoText(e.target.value)}
                    className='rounded-l-lg w-full py-1 px-4 border-2 border-gray-200 my-2 '
                    type="text"
                    placeholder="Enter todo here"
                />
                 <Button text="Add" onClick={addTodo} classname="rounded-l mt-1.5 mb-1.5"/>
            </div>
            <div>
                {
                    todos.map(it => {
                        return (
                            <TodoItem it={it} key={it.id}/>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default Main;