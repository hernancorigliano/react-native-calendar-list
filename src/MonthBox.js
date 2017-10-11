import React, {Component} from 'react';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import DayBox from './DayBox';
import WeekHeaderBox from './WeekHeaderBox';

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
    },
    rowMonthHeader: {
        flexDirection: 'row',
        backgroundColor: '#DDD',
        justifyContent: 'center',
        alignItems: 'center',
    },
    rowMonthHeaderText: {
        flexDirection: 'row',
        fontSize: 14,
    },
    rowDaysOfWeek: {
        flexDirection: 'row',
    },
});

export default class MonthBox extends Component {
    static displayName = 'MonthBox';
    componentRefs = [];

    shouldComponentUpdate(newProps) {
        if (this.props.inViewport || newProps.inViewport) {
            // UPDATE NATIVE elements bypassing the react render and reconciliation (this improves performance significantly on calendar state updates)
            this.componentRefs.forEach(r => {
                const {bStyle, dTextStyle} = this.getStyles(newProps.marks, newProps.dayTextStyle, newProps.dayBackgroundColor, r.boxData);
                r.component.setNativeProps({boxStyle: bStyle, textStyle: dTextStyle});
            });
            // force new props
            this.props = newProps;
        }

        return false; // never Update, we control the native props updates.
    }

    getStyles(marks, dayTextStyle, dayBackgroundColor, boxData) {
        let bStyle = dayBackgroundColor ? {backgroundColor: dayBackgroundColor} : {};
        let dTextStyle = dayTextStyle ? dayTextStyle : {};


        if (boxData && marks) {
            const mark = marks[boxData.dateObject];

            if (mark) {
                bStyle = mark.dayBackgroundColor ? {backgroundColor: mark.dayBackgroundColor} : {};
                dTextStyle = mark.dayTextStyle ? mark.dayTextStyle : {};
            }
        }

        return {bStyle, dTextStyle};
    }

    render() {
        const {index, title, dayNames, dayRows, rowHeight, headerHeight, OnDayPress, OnHeaderPress, marks, dayTextStyle, dayBackgroundColor, headerTextStyle, headerBackgroundColor, weekHeaderTextStyle, weekHeaderBoxStyle} = this.props;

        // Render & Update components
        const componentRows = dayRows.map(rowData => {
            const boxes = rowData.boxes.map(boxData => {

                const {bStyle, dTextStyle} = this.getStyles(marks, dayTextStyle, dayBackgroundColor, boxData);

                if (boxData.isEmpty) {
                    return <DayBox key={boxData.reactKey} isEmpty boxStyle={bStyle}/>;
                }

                return (<DayBox
                    ref={r => this.componentRefs.push({component: r, boxData})}
                    key={boxData.reactKey}
                    day={boxData.day}
                    boxStyle={bStyle}
                    textStyle={dTextStyle}
                    onPress={() => OnDayPress(boxData.dateObject)}
                />);
            });

            return <View key={rowData.reactKey} style={[styles.row, {height: rowHeight}]}>{boxes}</View>;
        });

        // Custom Styling
        const hColorStyle = headerBackgroundColor ? {backgroundColor: headerBackgroundColor} : {};
        const hTextStyle = headerTextStyle ? headerTextStyle : {};

        return (
            <View>
                <TouchableOpacity style={[styles.rowMonthHeader, {height: headerHeight}, hColorStyle]}
                                  onPress={() => OnHeaderPress(index)}>
                    <Text style={[styles.rowMonthHeaderText, hTextStyle]}>{title}</Text>
                </TouchableOpacity>
                <View style={[styles.rowDaysOfWeek, {height: rowHeight}]}>
                    {dayNames.map((name,i) => <WeekHeaderBox key={i} weekDayName={name} rowHeight={rowHeight}
                                                         boxStyle={weekHeaderBoxStyle}
                                                         textStyle={weekHeaderTextStyle}/>)}
                </View>
                {componentRows}
            </View>);
    }
}
