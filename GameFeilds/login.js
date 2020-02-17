import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    TouchableOpacity
} from 'react-native';
import { Header } from 'react-native-elements';
import Input from '../components/text-input.js'




export default class AtherGame extends Component {
    render()
    {
        return(
        <View>
            <ScrollView>
                <TouchableOpacity style={styles.submit_btn} onPress={() => this.props.restart()}>
                        <Text style={styles.submitText}>Antehr Game</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 7
    },
    heading: {
        color: '#545454',
        fontSize: 16
    },
    input: {
        marginTop: 5
    },
    submit_btn: {
        marginTop: 20,
        height: 45,
        backgroundColor: '#0089ff',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    submitText: {
        fontSize: 16,
        color: '#ffffff',
        marginVertical: 7
    }
});