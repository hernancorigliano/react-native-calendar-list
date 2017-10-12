import React, {Component} from 'react';
import {
    StyleSheet,
    View
} from 'react-native';
import CalendarList from 'react-native-calendar-list';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
});

const markStyle = {dayTextStyle: {color: 'white', fontSize: 14, fontWeight: 'bold'}, dayBackgroundColor: '#0a1'};

export default class ExampleB extends Component {

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
                    monthsCount={40}
                    mondayWeekStart={true}
                    dayNames={['D', 'L', 'M','M','J','V','S']}
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
                    dayBackgroundColor={'#000'}
                    headerBackgroundColor={'#444'}
                    weekHeaderBoxStyle={ { borderBottomWidth: 0.5, borderBottomColor: '#f80', backgroundColor: 'black' } }
                    headerTextStyle={{fontSize: 15, color: 'white'}}
                    weekHeaderTextStyle={{fontSize: 11, color: '#f80'}}
                    dayTextStyle={{ fontSize: 14, color: 'white' }}
                    // Performance
                    initialNumToRender={3}
                    rowHeight={30}
                    headerHeight={30}
                />
            </View>
        );
    }
}
