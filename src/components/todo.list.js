import React, {Component} from 'react';
import {Button, Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {connect} from 'react-redux';
import {addTodo, markResolved, markUnresolved, removeAll, removeTodo} from "../actions/todo.actions";
import NavigationBar from "react-native-navbar";
import SwipeView from "react-native-swipeview/lib/index";
import {Badge, Icon} from 'react-native-elements';

@connect(store => ({
        todos: store.todos.todos,
        count: store.todos.count,
    }),
    dispatch => ({
        hadnleAddTodoClick: (todo) => dispatch(addTodo(todo)),
        markResolved: (id) => dispatch(markResolved(id)),
        deleteTodo: (id) => dispatch(removeTodo(id)),
        markUnresolved: (id) => dispatch(markUnresolved(id)),
        removeAll: () => dispatch(removeAll()),
    })
)
export default class TodoList extends Component {

    _keyExtractor = (item, index) => item.id;
    state = {
        i: 1,
    };

    scrollView = (item, index) => {
        let isCompleted = item.completed;
        return <SwipeView key={index}
                          renderVisibleContent={() => <Text
                              style={isCompleted ? styles.itemCrossedOut : styles.item}>{item.text}</Text>}
                          leftOpenValue={Dimensions.get('window').width / 2}
                          swipeDuration={650}
                          rightOpenValue={-Dimensions.get('window').width}
                          swipeToOpenPercent={40}
                          renderLeftView={() =>
                              !isCompleted ?
                                  <Text style={styles.rowLeft}>Completed</Text> :
                                  <Text style={styles.rowLeft}>Uncompleted</Text>
                          }
                          onSwipedRight={() => this.markResolvedNotResolved(item.id, isCompleted)}
                          onSwipedLeft={() => this.props.deleteTodo(item.id)}
                          renderRightView={() => <Text style={styles.rowRight}>Delete</Text>}
        />
    };

    markResolvedNotResolved = (id, completed) => {
        completed ? this.props.markUnresolved(id) : this.props.markResolved(id);
    };

    render() {
        const titleConfig = {
            title: 'One more todo app',
            style: styles.headerTitle
        };

        return (
            <View style={styles.container}>
                <NavigationBar title={titleConfig}
                               leftButton={this.iconBtnConfig()}
                               rightButton={this.rghBtnConf()}
                />

                <FlatList data={this.props.todos}
                          keyExtractor={this._keyExtractor}
                          style={styles.flatList}
                          enableEmptySections={true}
                          renderItem={({item, index}) => this.scrollView(item, index)}/>
                <View style={styles.btnAdd}>
                    <TouchableOpacity>
                        <Icon name='plus' size={22} raised
                              color={'#384ab4'}
                              type='font-awesome'
                              onPress={() => this.handleAddTodo()}/>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    rghBtnConf = () => {
        return <Badge value = {'Todos: ' + this.props.count}
                      containerStyle = {{backgroundColor: 'violet', marginRight: 5, marginTop : 8}}
        />
    };

    iconBtnConfig = () => {
        return <Icon name='remove'
                     raised
                     color={'#384ab4'}
                     size={17}
                     type='font-awesome'
                     onPress={() => this.props.removeAll()}
        />
    };

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
    itemCrossedOut: {
        padding: 10,
        fontSize: 18,
        height: 44,
        color: '#841584',
        textDecorationLine: 'line-through'
    },
    btnAdd: {
        position: 'absolute',
        top: Dimensions.get('window').height * 0.93,
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