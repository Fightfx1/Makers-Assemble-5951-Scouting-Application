import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    Animated,
    Easing
} from 'react-native';

export default class ValueDisplay extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>{this.props.text}</Text>
                <Text style={styles.value}>{this.props.value}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 5
    },
    text: {
        fontSize: 16,
        color: '#36373d'
    },
    value: {
        color: '#6c6d71',
        fontSize: 17,
        paddingVertical: 5
    }
});
