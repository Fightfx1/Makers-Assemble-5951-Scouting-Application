import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Animated,
    Easing
} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default class Input extends Component {

    render() {
        if(this.props.style != undefined)
        {
            return (
                <View style={styles.container}>
                    <Text style={styles.text}>{ " " + this.props.text}</Text>
                    <View style={styles.button}>
                    <TextInput
                        style={this.props.style}
                        onChangeText={(text) => this.props.onChange({text})}
                        placeholder={this.props.placeholder}
                        placeholderTextColor={'#c0c2c5'}
                        keyboardType={this.props.type}
                        multiline={this.props.multiline}
                        underlineColorAndroid={'transparent'}
                    />
                    </View>
                </View>
            );
        }
        else
        {
            return (
                <View style={styles.container}>
                    <Text style={styles.text}>{ " " + this.props.text}</Text>
                    <View style={styles.button}>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => this.props.onChange({text})}
                        placeholder={this.props.placeholder}
                        placeholderTextColor={'#c0c2c5'}
                        keyboardType={this.props.type}
                        multiline={this.props.multiline}
                        underlineColorAndroid={'transparent'}
                    />
                    </View>
                </View>
            );
        }
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
    input: {
        height: 40,
        borderColor: '#707174',
        borderBottomWidth: 1.5,
        color: '#36373d',
        fontSize: 16
    }
});
