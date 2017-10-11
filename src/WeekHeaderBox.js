import React, { PureComponent } from 'react';
import { Text, View, StyleSheet } from 'react-native';

const CALENDAR_ROW_HEIGHT = 50;

const styles = StyleSheet.create({
    dayOfWeekBox: {
        flex: 1,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dayOfWeekText: {
        textAlign: 'center',
    },
});

export default class WeekHeaderBox extends PureComponent {
    static displayName = 'WeekHeaderBox';

    render() {
        return (
            <View style={[styles.dayOfWeekBox, this.props.boxStyle]}>
                <Text style={[styles.dayOfWeekText, this.props.textStyle]}>{this.props.weekDayName}</Text>
            </View>);
    }
}
