import {
    ADD_TODO, FETCHING_TODOS, MARK_RESOLVED, MARK_UNRESOLVED, REMOVE_ALL, REMOVE_TODO, TODOS_FETCHED,
} from "../constants/todo.constants";

const INIT_STATE = {
    todos: [],
    count: 0,
    fetchingTodo: false,
};

export const todos = (state = INIT_STATE, action) => {
    switch (action.type) {
        case ADD_TODO: {
            return  {...state, todos: [...state.todos, action.payload], count: state.count + 1};
        }
        case REMOVE_TODO: {
            return {
                ...state, todos: [...state.todos.slice(0, action.payload),
                    ...state.todos.slice(action.payload + 1)], count: state.count - 1
            }
        }
        case MARK_RESOLVED: {
            return {
                ...state, todos: state.todos.map(todo => todo.id === action.payload ?
                    {...todo, completed: true} : todo)
            }
        }
        case MARK_UNRESOLVED: {
            return {
                ...state, todos: state.todos.map(todo => todo.id === action.payload ?
                    {...todo, completed: false} : todo)
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

        default :
            return state;
    }
};