import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    Animated,
    ScrollView
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import InactiveCheck from './inactive-check.js';
import ValueDisplay from './value-display.js';

export default class Match extends Component {

    constructor(props) {
        super(props);

        this.state = {
            open: false,
            rotate: new Animated.Value(0),
            cardHeight: new Animated.Value(0)
        }

        this.toggleCard = this.toggleCard.bind(this);
    }

    toggleCard() {
        if (!this.state.open) {
            Animated.timing(
                this.state.rotate,
                {
                    toValue: 90,
                    duration: 100
                }
            ).start();

            Animated.timing(
                this.state.cardHeight,
                {
                    toValue: 275,
                    duration: 150
                }
            ).start();

        } else {
            Animated.timing(
                this.state.rotate,
                {
                    toValue: 0,
                    duration: 100
                }
            ).start();

            Animated.timing(
                this.state.cardHeight,
                {
                    toValue: 0,
                    duration: 100
                }
            ).start();
        }

        this.setState(previousState => {
            return { open: !previousState.open };
        });
    }

    render() {
        // Set background color based off of "color" prop passed in. If RED, set to red. Else, set to blue.
        var color = this.props.data.color === "RED" ? '#E66840' : '#4D98E4';

        const rotateValue = this.state.rotate.interpolate({
            inputRange: [0, 360],
            outputRange: ['0deg', '360deg']
        })

        return (
            <View style={styles.container}>
                <View style={[styles.heading, {backgroundColor: color}]}>
                    <Text style={styles.team}>Team {this.props.data.team}</Text>
                    <Text style={styles.match}>Match {this.props.data.match} - Position {this.props.data.position}</Text>
                    <Animated.View style={[styles.iconWrapper, { transform: [{ rotate: rotateValue }] }]}>
                        <TouchableOpacity onPress={this.toggleCard} style={{padding: 12}}>
                            <Ionicons style={styles.icon} name="ios-arrow-forward" size={20} />
                        </TouchableOpacity>
                    </Animated.View>
                </View>

                <Animated.View style={[styles.expanded, { height: this.state.cardHeight }]}>
                    <ScrollView>
                        <Text style={styles.dataTitle}>Auton</Text>
                        <View style={styles.data}>
                            <InactiveCheck checked={this.props.data.auton.auton} text="Auton"/>
                            <InactiveCheck checked={this.props.data.auton.passed_baseline} text="Crossed Baseline"/>
                            <InactiveCheck checked={this.props.data.auton.placed_switch} text="Placed Cube on Switch"/>
                            <InactiveCheck checked={this.props.data.auton.placed_opponents_switch} text="Placed Cube on Opponent's Switch"/>
                            <InactiveCheck checked={this.props.data.auton.placed_scale} text="Placed Cube on Scale"/>
                        </View>
                        <Text style={styles.dataTitle}>Teleop</Text>
                        <View style={styles.data}>
                            <ValueDisplay value={this.props.data.teleop.cubes_home_switch} text="Cubes Placed on Home Switch:"/>
                            <ValueDisplay value={this.props.data.teleop.cubes_away_switch} text="Cubes Placed on Away Switch:"/>
                            <ValueDisplay value={this.props.data.teleop.cubes_scale} text="Cubes Placed on Scale:"/>
                            <ValueDisplay value={this.props.data.teleop.cubes_vault} text="Cubes Placed in Vault:"/>
                            <ValueDisplay value={this.props.data.teleop.defense} text="Defense 1-5:"/>
                            <ValueDisplay value={this.props.data.teleop.cubes_dropped} text="Cubes Dropped:"/>
                            <InactiveCheck checked={this.props.data.teleop.fall} text="Tipped Over"/>
                        </View>
                        <Text style={styles.dataTitle}>End Game</Text>
                        <View style={styles.data}>
                            <InactiveCheck checked={this.props.data.end.climber} text="Climbed"/>
                            <ValueDisplay value={this.props.data.end.climb_aid} text="Teams Aided in Climbing:"/>
                            <ValueDisplay value={this.props.data.end.fouls} text="Fouls:"/>
                            <ValueDisplay value={this.props.data.end.score} text="Final Alliance Score:"/>
                            <ValueDisplay value={this.props.data.end.comments} text="Comments:"/>
                        </View>
                    </ScrollView>
                </Animated.View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
        justifyContent: 'center'
    },
    heading: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 15,
        height: 50,
        borderRadius: 4
    },
    team: {
        flex: 1,
        color: 'white',
        fontSize: 16,
        fontWeight: '700'
    },
    match: {
        flex: 2,
        textAlign: 'right',
        fontSize: 16,
        fontWeight: '500',
        color: 'white'
    },
    iconWrapper: {
        flex: .5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        color: 'white'
    },
    expanded: {
        backgroundColor: '#eaedf4',
        flex: 1,
        overflow: 'hidden',
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4
    },
    dataTitle: {
        color: '#6c6d71',
        fontSize: 17,
        fontWeight: '700',
        margin: 10,
        marginLeft: 15,
        marginBottom: 5
    },
    data: {
        marginLeft: 15
    }
});
