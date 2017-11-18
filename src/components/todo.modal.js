import React, {Component} from 'react';
import {Modal, Text, TouchableHighlight, View, StyleSheet,Dimensions} from "react-native";
import {connect} from "react-redux";
import {markResolved, removeTodo, markUnresolved, switchModal} from "../actions/todo.actions";

@connect(store => ({
        modalVisible: store.todos.modalVisible
    }),
    dispatch => ({
        markResolved: (id) => dispatch(markResolved(id)),
        markUnResolved: (id) => dispatch(markUnresolved(id)),
        removeTodo: (id) => dispatch(removeTodo(id)),
        switchModal: () => dispatch(switchModal())
    })
)
export default class TodoModal extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View>
                <Modal
                    animationType="slide"
                    visible={this.props.modalVisible}
                    presentationStyle='formSheet'
                >
                    <View style={styles.container}>
                        <TouchableHighlight
                            style={this.props.todo.completed ? styles.noHlight : ''}
                            onPress={() => {
                                this.handleMarkResolved()
                            }}>
                            <Text style={styles.highlight}>Resolved</Text>
                        </TouchableHighlight>

                        <TouchableHighlight onPress={() => {
                            this.handleMarkUnResolved()
                        }} style={!this.props.todo.completed ? styles.noHlight : ''} >

                            <Text style={styles.highlight}>Unresolved</Text>
                        </TouchableHighlight>

                        <TouchableHighlight onPress={() => {
                            this.handleRemoveTodo()
                        }}>
                            <Text style={styles.highlight}>Remove</Text>
                        </TouchableHighlight>

                        <TouchableHighlight onPress={() => this.props.switchModal()}>
                            <Text style={styles.highlight}>Cancel</Text>
                        </TouchableHighlight>

                    </View>
                </Modal>
            </View>
        )
    }

    handleMarkResolved = () => {
        this.props.markResolved(this.props.todo.id);
        this.props.switchModal();
    };

    handleMarkUnResolved = () => {
        this.props.markUnResolved(this.props.todo.id);
        this.props.switchModal();
    };

    handleRemoveTodo = () => {
        this.props.removeTodo(this.props.todo.id);
        this.props.switchModal();
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    highlight: {
        fontSize: 30
    },
    noHlight: {
        display: 'none'
    },
    modal: {
        width: 100,
        height: 100
    }
});