import React from 'react';
import {StyleSheet} from 'react-native';
import TodoList from "./src/components/todo.list";
import {Provider} from "react-redux";
import configureStore from "./src/store/todo.store";

const ARTICLES = [
    {
        name: "test article",
        id: 1,
        content: 'test content tp display 1'
    },
    {
        name: "test article 2",
        id: 2,
        content: 'test content tp display 2'
    },
    {
        name: "test article 3",
        id: 3,
        content: 'test content tp display 3'
    },
    {
        name: "test article 4",
        id: 4,
        content: 'test content tp display 4'
    },
];

const store = configureStore();

export default class App extends React.Component {

    render() {

        return (
            <Provider store={store}>
                <TodoList/>
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent:'center'
    }
});
