import React, {Component} from 'react';
import {
    StyleSheet,
    View
} from 'react-native';
import CalendarList from 'react-native-calendar-list';


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

const markStyle = {dayTextStyle: {color: 'white', fontSize: 14, fontWeight: 'bold'}, dayBackgroundColor: '#08a'};

export default class ExampleA extends Component {

    constructor(props) {
        super(props);

        this.state = {marks: {"2017-02-20": markStyle, "2017-02-01": markStyle}};
        this.dayPressed = this.dayPressed.bind(this);
    }

    dayPressed(date) {
        const newMarks = {...this.state.marks};
        newMarks[date] = markStyle;

        this.setState({marks: newMarks});
    }

    render() {
        return (
            <View style={styles.container}>
                <CalendarList
                    // Dates
                    startDate={'2017-02-01'}
                    monthsCount={10}
                    mondayWeekStart={false}
                    dayNames={['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi','Sa']}
                    monthNames={['January', 'February', 'March','Abr','May','Jun','Jul', 'Ago', 'Sep','Oct','Nov','Dic']}
                    // Selection
                    onDatePress={this.dayPressed}
                    marks={this.state.marks}
                    // Styling
                    showVerticalScrollIndicator
                    enableAutoScrollOnMonthPress
                    enableAutoScrollOnDayPress
                    enableFixVisualLinesArtifacts={true}
                    // Colors and Text Styling
                    dayBackgroundColor={'#fff'}
                    headerBackgroundColor={'#CCC'}
                    weekHeaderBoxStyle={ { borderBottomWidth: 0.5, borderBottomColor: 'grey' } }
                    headerTextStyle={{fontSize: 15, color: 'black'}}
                    weekHeaderTextStyle={{fontSize: 14, color: '#000'}}
                    dayTextStyle={{ fontSize: 14 }}
                    // Performance
                    initialNumToRender={3}
                    rowHeight={40}
                    headerHeight={42}
                />
            </View>
        );
    }
}
