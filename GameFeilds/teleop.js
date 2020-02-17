import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Text
} from 'react-native';

import Stepper from '../components/stepper.js'
import Check from '../components/check.js'

export default class Teleop extends Component {

    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={styles.input}>
                    <Stepper
                        text="כדורים לנמוך"
                        onChange={(value) => this.props.set('Low', value, 'teleop')}
                    />
                    <Text>
                        
                    </Text>
                    <Stepper
                        text="כדורים למשושה"
                        onChange={(value) => this.props.set('Hex', value, 'teleop')}
                    />
                    <Text>
                        
                    </Text>
                    <Stepper
                        text="כדורים לחור במשושה"
                        onChange={(value) => this.props.set('Hole', value, 'teleop')}
                    />
                    <Text>
                        
                    </Text>
                    <Check
                        text="סיבב את הרולטה"
                        onPress={(value) => this.props.set('Spin_Wheel', value, 'teleop')}
                    />
                    <Text>
                        
                    </Text>
                    <Check
                        text="סיבב לפי צבע"
                        onPress={(value) => this.props.set('Color', value, 'teleop')}
                    />
                </View>
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
        fontSize: 16,
    },
    input: {
        marginTop: 5
    }
});
