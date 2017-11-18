import {ADD_TODO, REMOVE_TODO, MARK_RESOLVED, MARK_UNRESOLVED, SWITCH_MODAL} from '../constants/todo.constants';

export function addTodo(todo) {
    return (dispatch) => {
        dispatch({
            type : ADD_TODO,
            payload:todo
        })
    }
}

export function removeTodo(id) {
    return (dispatch) => {
        dispatch({
            type: REMOVE_TODO,
            payload:id
        })
    }
}

export function markResolved(id) {
    return (dispatch) => {
        dispatch({
            type: MARK_RESOLVED,
            payload:id
        })
    }
}

export function markUnresolved(id) {
    return (dispatch) => {
        dispatch({
            type: MARK_UNRESOLVED,
            payload:id
        })
    }
}

export function switchModal() {
    return (dispatch) => {
        dispatch({
            type: SWITCH_MODAL
        })
    }
}