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

export default class Selector extends Component {

    constructor(props) {
        super(props);

        this.state = {
            opacity: 1,
        }
    }

    render() {
        itemsListArr = this.props.items.map(itemInfo => (
                <TouchableOpacity
                    key={itemInfo.text}
                    style={itemInfo.selected ? [styles.itemSelected, {backgroundColor: itemInfo.color}] : styles.item}
                    onPress={() => {this.props.switchSelection(itemInfo.text)}}
                >
                    <Text style={itemInfo.selected ? [styles.itemText, {color: 'white'}] : styles.itemText}>{itemInfo.text}</Text>
                </TouchableOpacity>
        ));

        return (
            <View style={styles.container}>
                <Text style={styles.text}>{this.props.text}</Text>
                <View style={styles.selector}>
                    {itemsListArr}
                </View>
            </View>
        );
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
    selector: {
        flexDirection: 'row',
        marginTop: 7,
        height: 35
    },
    item: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,

        backgroundColor: '#fcfcfc',
        borderRadius: 7
    },
    itemSelected: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,

        backgroundColor: '#D93E46',
        borderRadius: 5
    },
    itemSelectedBlue: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,

        backgroundColor: '#0089ff',
        borderRadius: 5
    },
    itemText: {
        fontSize: 16,
        color: '#c0c2c5'
    }
});
