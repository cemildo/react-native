import React, {Component} from 'react';
import {Text, View, StyleSheet} from "react-native";
import {connect} from 'react-redux';

@connect(store => ({
    count: store.todos.count
}))
export default class Header extends Component {

    render() {
        return (
            <View>
                <View stye={styles.header}>
                    <Text style={styles.todoCount}>Todo count {this.props.count}</Text>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    header: {
        flex: 1,
        flexDirection: 'row',
        height: 50,
    },
    todoCount: {
        borderRadius: 3,
        borderWidth: 0.5,
        borderColor: 'blue',
        fontSize: 20,
        textAlign: 'right',
        paddingRight: 5,
        paddingTop: 15
    },
    name: {
        fontSize: 20,
        paddingTop: 15,
        paddingLeft: 5,
    }
});