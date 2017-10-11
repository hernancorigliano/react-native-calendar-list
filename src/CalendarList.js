import React, {PureComponent} from 'react';
import {Platform, VirtualizedList, View} from 'react-native';
import MonthBox from './MonthBox';
import Helper from './CalendarHelper';

const CALENDAR_ROW_HEIGHT = 50;
const CALENDAR_ROW_HEADER_HEIGHT = 60;

export default class CalendarList extends PureComponent {
    static displayName = 'CalendarList';

    constructor(props: Props) {
        super(props);

        (this: any).handleDayPress = this.handleDayPress.bind(this);
        (this: any).handleMonthPress = this.handleMonthPress.bind(this);
        (this: any).getItemLayout = this.getItemLayout.bind(this);
        (this: any).renderItem = this.renderItem.bind(this);
        (this: any).updateDimensions = this.updateDimensions.bind(this);
        (this: any).onViewableItemsChanged = this.onViewableItemsChanged.bind(this);

        this.state = {
            magicWidth: 0,
            loaded: false,
        };
    }

    // TODO
    scrollToDate(day, animated) {
        // Auto-scroll logic
        if (this.state.loaded && this.flatlist) {
            const monthIndex = 2; // TODO
            setTimeout(() => {
                this.flatlist.scrollToIndex({
                    index: monthIndex,
                    animated: animated,
                });
            }, 200);
        }
    }

    // Optimize FlatList by providing the right dimensions for the Month box - Also needed for Scrolling to Month
    getItemLayout(data, index) {
        const item = data[index];
        return {length: item.monthBoxHeight, offset: item.layoutOffset, index};
    }

    handleDayPress(date) {
        this.props.onDatePress(date);
    }

    handleMonthPress(itemIndex) {
        if (this.props.enableAutoScrollOnMonthPress) {
            this.flatlist.scrollToIndex({
                index: itemIndex,
                animated: true,
            });
        }
    }

    updateDimensions(event: Object) {
        // Calendar container must have a fixed width and not depend on the calendar. It will loop forever if not.
        // This Fixes line artifacts glitches due to Flexbox rounding values
        const badWidth = (event.nativeEvent.layout.width); // Container width
        const magicWidth = Math.floor(badWidth / 7) * 7; // Closest Divisible by 7

        this.setState({magicWidth});
    }

    flatlist: Object;
    cachedCalendars: Array<Object>;

    renderItem({item}: Object) {
        return (<MonthBox
            index={item.index}
            title={item.title}
            dayNames={item.dayNames}
            dayRows={item.dayRows}
            rowHeight={this.props.rowHeight}
            headerHeight={this.props.headerHeight}
            OnDayPress={this.handleDayPress}
            OnHeaderPress={this.handleMonthPress}
            inViewport={item.inViewport}
            marks={this.props.marks}
            // Custom Styling
            dayTextStyle={this.props.dayTextStyle}
            dayBackgroundColor={this.props.dayBackgroundColor}
            headerTextStyle={this.props.headerTextStyle}
            headerBackgroundColor={this.props.headerBackgroundColor}
            weekHeaderBoxStyle={this.props.weekHeaderBoxStyle}
            weekHeaderTextStyle={this.props.weekHeaderTextStyle}
        />);
    }

    onViewableItemsChanged({viewableItems}) {
        const visibles = viewableItems.map(vi => vi.item.index);

        if (visibles[0] !== 0) {
            visibles.unshift(visibles[0] - 1);
        }
        // is not Last one
        if (visibles[visibles.length - 1] !== this.cachedCalendars.length - 1) {
            visibles.push(visibles[visibles.length - 1] + 1);
        }

        for (let i = 0; i < this.cachedCalendars.length; i += 1) {
            let isVisible = false;
            const id = this.cachedCalendars[i].index;

            if (visibles.indexOf(id) > -1) {
                isVisible = true;
            }

            this.cachedCalendars[i].inViewport = isVisible;
        }

        this.forceUpdate();
        //console.log(this.cachedCalendars.map((c) => c.inViewport))
    }

    render() {
        if (!this.state.loaded) {
            this.cachedCalendars = Helper.getMonths(
                this.props.startDate,
                this.props.monthsCount,
                this.props.dayNames,
                this.props.monthNames,
                this.props.mondayWeekStart,
                this.props.headerHeight,
                this.props.rowHeight
            );

            setTimeout(() => {
                this.setState({loaded: true});
            }, 1);
        }

        // Fix artifacts-glitches
        let fixedWidth = {width: '100%'};
        if (this.props.enableFixVisualLinesArtifacts && this.state.magicWidth !== undefined) {
            fixedWidth = {width: this.state.magicWidth};
        }

        return (
            <View onLayout={this.updateDimensions}>
                <View style={{alignItems: 'center'}}>
                    {this.state.loaded &&
                    <VirtualizedList
                        ref={r => {
                            this.flatlist = r;
                        }}
                        getItemLayout={this.getItemLayout}
                        data={this.cachedCalendars}
                        getItemCount={() => this.cachedCalendars.length}
                        getItem={(data, i) => data[i]}
                        extraData={this.state}
                        renderItem={this.renderItem}
                        showVerticalScrollIndicator={this.props.showVerticalScrollIndicator}
                        style={fixedWidth}
                        // Performance drivers
                        initialNumToRender={this.props.initialNumToRender}
                        // maxToRenderPerBatch={1}
                        // updateCellsBatchingPeriod={1}
                        // windowSize={1}
                        removeClippedSubviews={Platform.select({ios: true, android: false})}
                        onViewableItemsChanged={this.onViewableItemsChanged}
                    />}
                </View>
            </View>
        );
    }
}
