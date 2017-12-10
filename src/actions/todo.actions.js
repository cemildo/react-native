import {
    ADD_TODO, REMOVE_TODO, MARK_RESOLVED, MARK_UNRESOLVED, REMOVE_ALL, FETCHING_TODOS,
    TODOS_FETCHED, FETCH_ERROR,
} from '../constants/todo.constants';
import axios from 'axios';
import {URL} from "../envieronment/configs";

const headers = {
    'Content-Type': 'application/json',
};

export function addTodo(todo) {
    return (dispatch) => {
        axios.post(URL + '/todos/add', todo, {headers: headers}).then(response => {
            dispatch({
                type: ADD_TODO,
                payload: response.data
            })
        }).catch(err => {
            dispatch({
                type: FETCH_ERROR,
                payload: err
            })
        });
    }
}

export function removeTodo(id) {
    return (dispatch) => {
        axios.post(URL + `/todos/delete/${id}`, null, {headers: headers}).then(response => {
            dispatch({
                type: REMOVE_TODO,
                payload: response.data
            })
        }).catch(error => {
            dispatch({
                type: FETCH_ERROR,
                payload: error.response
            });
        });
    }
}

export function markResolved(id) {
    return (dispatch) => {
        axios.post(URL + `/todos/complete/${id}`, null, {headers: headers}).then(response => {
            dispatch({
                type: MARK_RESOLVED,
                payload: response.data
            })
        }).catch(error => {
            dispatch({
                type: FETCH_ERROR,
                payload: error
            })
        });
    }
}

export function markUnresolved(id) {
    return (dispatch) => {
        axios.post(URL + `/todos/uncomplete/${id}`, null, {headers: headers}).then(response => {
            dispatch({
                type: MARK_UNRESOLVED,
                payload: response.data
            })
        }).catch(error => {
            dispatch({
                type: FETCH_ERROR,
                payload: error
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
        axios.get(URL + '/todos/').then(response => {
            dispatch({type: TODOS_FETCHED, payload: response.data});
        }).catch(error => {
            dispatch({type: FETCH_ERROR, payload: error});
        });
    };
}