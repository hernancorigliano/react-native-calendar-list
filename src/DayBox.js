import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const CALENDAR_ROW_HEIGHT = 50;

const styles = StyleSheet.create({
    box: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dayText: {
        textAlign: 'center',
    },
});

export default class DayBox extends Component {
    static displayName = 'DayBox';
    button;
    text;
    currentMode;

    constructor(props) {
        super(props);
        this.handleDayPress = this.handleDayPress.bind(this);
    }

    setNativeProps(newProps: Props) {
        // Directly update the Native View, without using render()
        const {boxStyle, textStyle} = newProps;
        this.button.setNativeProps({style: boxStyle});
        this.text.setNativeProps({style: textStyle});
    }

    shouldComponentUpdate() {
        return false; // Native updates only
    }

    handleDayPress() {
        this.props.onPress();
    }

    render() {
        const {day, isEmpty, boxStyle, textStyle}: Props = this.props;

        if (isEmpty) {
            return (<View style={[styles.box, boxStyle]}/>);
        }

        return (<TouchableOpacity style={[styles.box, boxStyle]} onPress={this.handleDayPress} ref={r => {
            this.button = r;
        }}>
            <Text style={[styles.dayText, textStyle]} ref={r => {
                this.text = r;
            }}>{day}</Text>
        </TouchableOpacity>);
    }
}
