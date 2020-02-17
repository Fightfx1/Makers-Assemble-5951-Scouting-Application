import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    Animated,
    Easing
} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default class InactiveCheck extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let icon = this.props.checked ? (
            <MaterialCommunityIcons
                onstyle={styles.checked}
                name="checkbox-marked"
                size={24}
            />
        ) : (
            <MaterialCommunityIcons
                style={styles.unchecked}
                name="checkbox-blank-outline"
                size={24}
            />
        );

        return (
            <View style={styles.container}>
                {icon}
                <Text style={styles.text}>{this.props.text}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 5,
        flexDirection: 'row',
        alignItems: 'center'
    },
    unchecked: {
        color: '#6c6d71'
    },
    checked: {
        color: '#009688'
    },
    text: {
        top: -1,
        marginLeft: 8,
        fontSize: 16,
        color: '#36373d'
    }
});
