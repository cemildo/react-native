import {
    ADD_TODO, REMOVE_TODO, MARK_RESOLVED, MARK_UNRESOLVED, SWITCH_MODAL, PASS_TODO, REMOVE_ALL, FETCHING_TODOS,
    TODOS_FETCHED, FETCH_ERROR,
} from '../constants/todo.constants';
import axios from 'axios';
import {URL} from "../envieronment/configs";

export function addTodo(todo) {
    return (dispatch) => {
        axios.post(URL+ '/todos/add',todo).then(response => {
            dispatch({
                type: ADD_TODO,
                payload:response.data
            }).catch(error => {
                dispatch({
                    type: FETCH_ERROR,
                    payload: error
                })
            })
        });
    }
}

export function removeTodo(id) {
    return (dispatch) => {
        axios.post(URL+ `/todos/remove/${id}`).then(response => {
            dispatch({
                type: REMOVE_TODO,
                payload:response.data
            }).catch(error => {
                dispatch({
                    type: FETCH_ERROR,
                    payload: error
                })
            })
        });
    }
}

export function markResolved(id) {
    return (dispatch) => {
        axios.post(URL + `/todos/complete/${id}`).then(response => {
            dispatch({
                type: MARK_RESOLVED,
                payload: response.data
            }).catch(error => {
                dispatch({
                    type: FETCH_ERROR,
                    payload: error
                })
            })
        });
    }
}

export function markUnresolved(id) {
    return (dispatch) => {
        axios.post(URL + `/todos/uncomplete/${id}`).then(response => {
            dispatch({
                type: MARK_UNRESOLVED,
                payload: response.data
            }).catch(error => {
                dispatch({
                    type: FETCH_ERROR,
                    payload: error
                })
            })
        });
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
        dispatch({type: FETCHING_TODOS});
        axios.get(URL + 'todos/').then(response => {
            dispatch({type: TODOS_FETCHED, payload: response.data});
        }).catch(error => {
            dispatch({type: FETCH_ERROR, payload: error});
        });
    };
}