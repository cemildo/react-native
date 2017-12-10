import {
    ADD_TODO, FETCH_ERROR, FETCHING_TODOS, MARK_RESOLVED, MARK_UNRESOLVED, REMOVE_ALL, REMOVE_TODO, TODOS_FETCHED,
} from "../constants/todo.constants";

const INIT_STATE = {
    todos: [],
    count: 0,
    fetchingTodo: false,
    error: null
};

export const todos = (state = INIT_STATE, action) => {
    switch (action.type) {
        case ADD_TODO: {
            return  {...state, todos: [...state.todos, action.payload], count: action.payload.length};
        }
        case REMOVE_TODO: {
            return {
                ...state, todos: [...state.todos,action.payload], count: action.payload.length
            }
        }
        case MARK_RESOLVED: {
            return {
                ...state, todos: [...state.todos, action.payload]
            }
        }
        case MARK_UNRESOLVED: {
            return {
                ...state, todos: [...state.todos, action.payload]
            }
        }
        case REMOVE_ALL : {
            return {...state, todos : [], count : 0}
        }
        case FETCHING_TODOS : {
            return {...state, fetchingTodo:true}
        }
        case TODOS_FETCHED : {
            return {...state, todos : action.payload, count: action.payload.length, fetchingTodo: false}
        }
        case FETCH_ERROR: {
            return {...state, error: action.payload}
        }

        default :
            return state;
    }
};