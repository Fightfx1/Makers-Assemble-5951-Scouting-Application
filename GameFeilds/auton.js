import React, { Component } from 'react';
import { I18nManager } from 'react-native';
import { Header } from 'react-native-elements';
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    Slider
} from 'react-native';

import Check from '../components/check'
import Stepper from '../components/stepper.js';

export default class Auton extends Component {
    render() {
        return (
            
                <ScrollView style={styles.container}>
                    <View style={styles.input}>
                        <Stepper
                            text="כמות הכדורים שהרבוט התחיל איתם " 
                            onChange={(value) => this.props.set('Starting_Number_Of_Power_Cells', value, 'Autonomous')}

                        />
                        <Check
                            text="הרובוט עבר את הקו בסוף האוטונומי"
                            onPress={(value) => this.props.set('Spin_Wheel', value, 'Autonomous')}
                        />

                        <Stepper
                            text = "כדורים לנמוך"
                            onChange={(value) => this.props.set('Low', value, 'Autonomous')}
                        />

                        <Stepper
                            text = "כדורים למשושה"
                            onChange={(value) => this.props.set('Hex', value, 'Autonomous')}
                        />

                        <Stepper
                            text = "כדורים לחור במשושה"
                            onChange={(value) => this.props.set('Hole', value, 'Autonomous')}
                        />

                    </View>
                </ScrollView>
           
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 7,
        transform: [{scaleX: I18nManager.isRTL ? -1 : 1}]
    },

    heading: {
        color: '#545454',
        fontSize: 16,
    },
    input: {
        marginTop: 5
    }
});
