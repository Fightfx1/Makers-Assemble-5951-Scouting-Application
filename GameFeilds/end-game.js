import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    TouchableOpacity
} from 'react-native';

import Check from '../components/check.js'
import Input from '../components/text-input.js' 
export default class EndGame extends Component {

    render() {
        return (
            <ScrollView style={styles.container}>
                <Check
                    text="הרובוט ניסה לטפס"
                    onPress={(value) => this.props.set('Tried_To_Climb', value, 'EndGame')}
                />
                <Check
                    text="הרבוט הצליח לטפס"
                    onPress={(value) => this.props.set('Succeeded_Climb', value, 'EndGame')}
                />
                <Check
                    text="הרובוט חנה באזור הנדנדה"
                    onPress={(value) => this.props.set('Park', value, 'EndGame')}
                />
                <Check
                    text="הפעיל את מכולל המגן"
                    onPress={(value) => this.props.set('Generator_Switch_Level', value, 'EndGame')}
                />
                <Check
                    text="האם הרובוט הפסיק לשחק או איבד תקשורת"
                    onPress={(value) => this.props.set('Was_Broken_or_dc', value, 'EndGame')}
                />
                <Input
                    text="COMMENTS:"
                    multiline={true}
                    placeholder="Spun in circles in auton."
                    onChange={(value) => this.props.set('comments', value.text, '')}
                />
                <TouchableOpacity style={styles.submit_btn} onPress={() => this.props.submit()}>
                    <Text style={styles.submitText}>SUBMIT</Text>
                </TouchableOpacity>
            </ScrollView>
        );
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
