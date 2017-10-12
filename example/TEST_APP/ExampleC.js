import React, {Component} from 'react';
import {
    StyleSheet,
    View
} from 'react-native';
import CalendarList from 'react-native-calendar-list';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});

const markStyle = {dayTextStyle: {color: 'black', fontSize: 14, fontWeight: 'bold'}, dayBackgroundColor: '#ffffba'};

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
                    monthsCount={20}
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
                    dayBackgroundColor={'#bae1ff'}
                    headerBackgroundColor={'#ffb3ba'}
                    weekHeaderBoxStyle={ { borderBottomWidth: 0.5, borderBottomColor: '#f80', backgroundColor: '#baffc9' } }
                    weekHeaderTextStyle={{fontSize: 14, color: 'black'}}
                    headerTextStyle={{fontSize: 15, color: 'black'}}

                    dayTextStyle={{ fontSize: 14, color: 'white' }}
                    // Performance
                    initialNumToRender={3}
                    rowHeight={50}
                    headerHeight={40}
                />
            </View>
        );
    }
}
