import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Text
} from 'react-native';

import Selector from '../components/selector.js'
import Input from '../components/text-input.js'

export default class PreMatch extends Component {
    constructor(props) {
        super(props);

        this.state = {
            alliances: [
                {
                    text: "BLUE",
                    color: "#0089ff",
                    selected: true
                }, {
                    text: "RED",
                    color: "#D93E46",
                    selected: false
                }
            ],
            positions: [
                {
                    text: "1",
                    color: "#555555",
                    selected: true
                }, {
                    text: "2",
                    color: "#555555",
                    selected: false
                }, {
                    text: "3",
                    color: "#555555",
                    selected: false
                }
            ]
        }

        this._switchAlliance = this._switchAlliance.bind(this);
        this._switchPosition = this._switchPosition.bind(this);
    }

    _switchAlliance(selection) {
        var alliances = this.state.alliances.slice(0);

        let that = this;
        this.state.alliances.forEach(function (team, i) {
            alliances[i].selected = (team.text == selection) ? true : false
        });

        this.setState(alliances);
        this.props.set('color', selection)

    }

    _switchPosition(selection) {
        var positions = this.state.positions.slice(0);

        let that = this;
        this.state.positions.forEach(function (position, i) {
            positions[i].selected = (position.text == selection) ? true : false
        });

        this.setState(positions);
        this.props.set('position', selection)

    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={styles.input}>
                    <Selector
                        text="ALLIANCE:"
                        items={this.state.alliances}
                        switchSelection={(sel) => this._switchAlliance(sel)}
                    />
                    <Selector
                        text="POSITION:"
                        items={this.state.positions}
                        switchSelection={(sel) => this._switchPosition(sel)}
                    />
                    <Input
                        text="TEAM:"
                        placeholder="5951"
                        type="numeric"
                        onChange={(text) => this.props.set('TeamNumber', text.text)}
                    />
                    <Input
                        text="MATCH NUMBER:"
                        placeholder="123"
                        onChange={(text) => this.props.set('match', text.text)}
                    />
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    heading: {
        color: '#888888',
        fontSize: 16,
        fontWeight: '500'
    },
    input: {
        marginTop: 3
    }

});
