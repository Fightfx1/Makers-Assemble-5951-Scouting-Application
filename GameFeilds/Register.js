import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    TouchableOpacity
} from 'react-native';

import Input from '../components/text-input.js'




export default class Register extends Component {
    render()
    {
        return(
        <ScrollView>
                <Text>
                    ברוכים הבאים למערכת הסקאוטינג
                </Text>
                <Input
                    text="שם משתמש:"
                    multiline={true}
                    placeholder=""
                    onChange={(value) => this.props.set(value.text)}
                />
                
                
                <TouchableOpacity style={styles.submit_btn} onPress={() => this.props.Login()}>
                    <Text style={styles.submitText}>SUBMIT</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.submit_btn} onPress={(e) => this.props.BackToLogin(e)}>
                    <Text style={styles.submitText}>Back</Text>
                </TouchableOpacity>
        </ScrollView>
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