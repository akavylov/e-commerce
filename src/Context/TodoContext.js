import React, {createContext, useReducer} from "react";
import {nanoid} from "nanoid";

export const TodoContext = createContext()

export const t = {
    ADD_TODO: "ADD_TODO",
    DELETE_TODO: "DELETE_TODO",
    EDIT_TODO: "EDIT_TODO",
    CHECK_TODO: "CHECK_TODO",
    DELETE_ALL: "DELETE_ALL",
    SORT_TODO: "SORT_TODO"
}

const todoReducer = (state, action) => {
    let newState
    switch (action.type) {
        case t.ADD_TODO:
            if (!action.text.trim()) return state
            const newTodo = {
                id: nanoid(),
                isDone: false,
                category: action.category,
                created: Date.now(),
                text: action.text
            }
            newState = action.sort ? [...state, newTodo] : [newTodo, ...state]
            localStorage.setItem("todos", JSON.stringify(newState))
            return newState

        case t.DELETE_TODO:
            newState = state.filter(it => it.id !== action.id)
            localStorage.setItem("todos", JSON.stringify(newState))
            return newState

        case t.EDIT_TODO:
            newState = state.map(todo => (
                todo.id === action.id ? {...todo, text: action.text} : todo
            ))
            localStorage.setItem("todos", JSON.stringify(newState))
            return newState

        case t.CHECK_TODO:
            newState = state.map(todo => (
                todo.id === action.id ? {...todo, isDone: action.isDone} : todo
            ))
            localStorage.setItem("todos", JSON.stringify(newState))
            return newState

        case t.DELETE_ALL:
            localStorage.removeItem("todos")
            return []

        case t.SORT_TODO:
            newState = [...state].sort((a,b) => {
                return action.sort ? a.created - b.created : b.created - a.created
            })
            localStorage.setItem("todos", JSON.stringify(newState))
            return newState
        default: return state
    }
}
const initialState = JSON.parse(localStorage.getItem("todos")) || []

const TodoProvider = ({children}) => {
    const [todos, dispatch] = useReducer(todoReducer, initialState)

    return (
        <TodoContext.Provider value={{todos, dispatch}}>
            {children}
        </TodoContext.Provider>
    )
}

export default TodoProvider