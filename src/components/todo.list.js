import React, {Component} from 'react';
import {Button, Dimensions, FlatList, StyleSheet, Text, View} from "react-native";
import {connect} from 'react-redux';
import {addTodo, passTodoID, passTodoModal, switchModal} from "../actions/todo.actions";
import Header from "./header";
import TodoModal from "./todo.modal";

@connect(store => ({
        todos: store.todos.todos,
        count: store.todos.count
    }),
    dispatch => ({
        hadnleAddTodoClick: (todo) => dispatch(addTodo(todo)),
        switchModal: () => dispatch(switchModal()),
        passTodoModal: (todo) => dispatch(passTodoModal(todo)),
    })
)
export default class TodoList extends Component {

    _keyExtractor = (item, index) => item.id;
    state = {
        i: 1,
    };

    render() {
        return (
            <View>
                <View>
                    <Header/>
                    <FlatList data={this.props.todos}
                              keyExtractor={this._keyExtractor}
                              renderItem={({item, index}) => <Text key={index} style={styles.item}
                                                                   onPress={(item) => this.showModal(item)}>{item.text}</Text>}/>
                </View>
                <View style = {styles.btnAdd}>
                    <Button onPress={() => this.handleAddTodo()} title = 'add todo' style={styles.btn}/>
                </View>
                {/*<TodoModal/>*/}
            </View>

        )
    }

    showModal(item) {
        console.log( item,'showing modal...');
        // this.props.passTodoModal(todo);
        // this.props.switchModal();
    }

    handleAddTodo = () => {
        this.setState({i: this.state.i + 1});
        let todo = {
            id: this.state.i,
            text: 'hardcode todo id ' + this.state.i,
            completed: false
        };
        this.props.hadnleAddTodoClick(todo);
    }
}

const styles = StyleSheet.create({
    todoText: {
        flex: 1,
        padding: 10,
        fontSize: 18,
        height: 44
    },
    noTODO: {
        flex: 1,
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        paddingTop: 22
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
        color: '#841584',
    },
    btnAdd: {
        position: 'absolute',
        top: Dimensions.get('window').height * 0.95,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btn: {
    }
});