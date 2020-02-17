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

export default class Check extends Component {

    constructor(props) {
        super(props);

        this.state = {
            checked: false
        }

        this._toggleIcon = this._toggleIcon.bind(this);
    }

    _toggleIcon() {
        this.setState({
            checked: !this.state.checked
        }, () => {
            if (this.props.onPress) {
                this.props.onPress(this.state.checked);
            }
        });
    }

    render() {
        let icon = this.state.checked ? (
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
                <TouchableOpacity
                    style={styles.button}
                    onPress={this._toggleIcon}
                >
                    {icon}
                    <Text style={styles.text}>{this.props.text}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 5
    },
    button: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        marginLeft: 8,
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
        color: '#6c6d71'
    }
});
