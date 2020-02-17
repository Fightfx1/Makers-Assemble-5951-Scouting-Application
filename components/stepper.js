import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    Animated,
    Easing
} from 'react-native';

export default class Stepper extends Component {

    constructor(props) {
        super(props);

        this.state = {
            value: 0
        }

        this.change = this.change.bind(this);
    }

    change(delta) {
        let value = this.state.value + delta < 0 ? 0 : this.state.value + delta;

        if (this.props.max != undefined && value > this.props.max) {
            value = this.props.max;
        }

        this.setState({ value }, () => {
            if (this.props.onChange) {
                this.props.onChange(this.state.value);
            }
        });
   }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>{this.props.text}</Text>
                <View style={styles.button}>
                    <TouchableOpacity
                        style={styles.minus}
                        onPress={() => this.change(-1)}
                    >
                        <Text style={styles.icon}>–</Text>
                    </TouchableOpacity>
                    <Text style={styles.value}> {this.state.value} </Text>
                    <TouchableOpacity
                        style={styles.plus}
                        onPress={() => this.change(1)}
                    >
                        <Text style={styles.icon}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 7
    },
    text: {
        fontSize: 16,
        color: '#c0c2c5'
    },
    button: {
        flexDirection: 'row-reverse',
        height: 22,
        alignItems: 'center',
        marginTop: 6,
        marginBottom: 8
    },
    value: {
        color: '#36373d',
        paddingHorizontal: 10,
        paddingTop: 11,
        fontSize: 24
    },
    minus: {
        paddingTop: 6,
        paddingHorizontal: 4
    },
    plus: {
        paddingTop: 6,
        paddingHorizontal: 4
    },
    icon: {
        color: '#7b7b82',
        fontSize: 34,
        fontWeight: '300'
    }
});
