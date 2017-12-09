import {
    ADD_TODO, REMOVE_TODO, MARK_RESOLVED, MARK_UNRESOLVED, SWITCH_MODAL, PASS_TODO, REMOVE_ALL, FETCHING_TODOS,
} from '../constants/todo.constants';
import axios from 'axios';
import {URL} from "../envieronment/configs";

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
export function removeAll() {
    return (dispatch) => {
        dispatch({
            type: REMOVE_ALL,
        })
    }
}

export function fetchTodo() {
    return (dispatch) => {
        dispatch({
            type: FETCHING_TODOS,
        });
    }
}