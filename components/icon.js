import React, { Component } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Text
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

export default class IconButton extends Component {

    render() {
        return (
            <TouchableOpacity
                style={styles.container}
                onPress={this.props.onPress}
            >
                <Ionicons style={styles.icon} name="ios-add" size={32} />
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        color: 'white',
        marginRight: 18
    }
});
