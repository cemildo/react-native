import React, {Component} from 'react';
import {Button, Dimensions, FlatList, StyleSheet, Text, View} from "react-native";
import {connect} from 'react-redux';
import {addTodo} from "../actions/todo.actions";
import NavigationBar from "react-native-navbar";
import SwipeView from "react-native-swipeview/lib/index";

@connect(store => ({
        todos: store.todos.todos,
        count: store.todos.count,
    }),
    dispatch => ({
        hadnleAddTodoClick: (todo) => dispatch(addTodo(todo)),
    })
)
export default class TodoList extends Component {

    _keyExtractor = (item, index) => item.id;
    state = {
        i: 1,
    };

    scrollView = (item,index) => {
        return <SwipeView key = {index}
                          renderVisibleContent={() => <Text style={styles.item}>{item.text}</Text>}
                          leftOpenValue={Dimensions.get('window').width / 2}
                          swipeDuration={650}
                          rightOpenValue={-Dimensions.get('window').width}
                          swipeToOpenPercent={40}
                          renderLeftView={() =>
                              !item.completed ?
                              <Text style = {styles.rowLeft}>Completed</Text> :
                                  <Text style = {styles.rowLeft}>Uncompleted</Text>
                          }
                          renderRightView={() => <Text style = {styles.rowRight}>Delete</Text>}
        />
    };

    render() {
        const rightButtonConfig = {
            title: 'Count of todos : '+ this.props.count.toString(),
            disabled: true,
            tintColor: '#BC5EC5',
        };

        const titleConfig = {
            title: 'One more todo app',
            style: styles.headerTitle
        };

        return (
            <View style={styles.container}>
                    <NavigationBar title={titleConfig}
                                   rightButton={rightButtonConfig}
                    />

                    <FlatList data={this.props.todos}
                              keyExtractor={this._keyExtractor}
                              style={styles.flatList}
                              enableEmptySections={true}
                              renderItem={({item, index}) => this.scrollView(item,index)}/>
                <View style = {styles.btnAdd}>
                    <Button onPress={() => this.handleAddTodo()} title = 'add todo'/>
                </View>
            </View>
        )
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

    },
    headerTitle: {
        fontSize: 20
    },
    noTODO: {
        flex: 1,
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        paddingTop: 20
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
    flatList: {
        paddingTop: 22
    },
    rowLeft: {
        flex: 1,
        padding: 10,
        fontSize: 18,
        height: 44,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: 'green'
    },
    rowRight: {
        flex: 1,
        padding: 10,
        fontSize: 18,
        height: 44,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: '#FE4D33'
    },
});