[![Build Status](https://travis-ci.org/hernancorigliano/react-native-calendar-list.svg?branch=v1.0.0)](https://travis-ci.org/hernancorigliano/react-native-calendar-list) [![npm version](https://badge.fury.io/js/react-native-calendar-list.svg)](https://badge.fury.io/js/react-native-calendar-list)

# react-native-calendar-list
A cross platform optimized customizable CalendarList component for React Native.

[![NPM](https://nodei.co/npm/react-native-calendar-list.png)](https://npmjs.com/package/react-native-calendar-list)


## Installation

`$ npm install react-native-calendar-list --save`

## Examples

![exmple 1](https://github.com/hernancorigliano/react-native-calendar-list/blob/v1.0.1/images/e1.png) ![exmple 2](https://github.com/hernancorigliano/react-native-calendar-list/blob/v1.0.1/images/e2.png)


Also check example app with some calendar styling and behaviour [here](https://github.com/hernancorigliano/react-native-calendar-list/tree/v1.0.1/example/TEST_APP)

## Why another calendar list?

Short answer: The most famous react native calendar package out there did has many issues with performance.
So this calendar list is optimized for fast renders, fast state update and scrolling experience.
It uses Direct Manipulation to avoid reconciliation algorythm from react, this improving performance.

## Usage

```html
<CalendarList
        startDate={'2017-02-01'}
        monthsCount={12}
        onDatePress={this.dayPressed}
        initialNumToRender={3}
        rowHeight={40}
        headerHeight={40} />
```

## Props

| Prop | Description | Default |
|---|---|---|
|**`startDate`**| example '2017-10-01'. The day is not important. Calendar will start from this month and year. |*None*|
|**`monthsCount`**| How many months to show from the startDate ahead. |*None*|
|**`mondayWeekStart`**| This sets the week start on monday. |`false`|
|**`dayNames`**| Array of names to override the day names in the week row. Example value: `['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi','Sa']`. Note: Always first item of array is the Sunday name, ignore `mondayWeekStart`  |*English names*|
|**`monthNames`**| Array of names to override the month names in the header. Example value: `['Jan', 'Feb', 'Mar','Abr','May','Jun','Jul','Ago', 'Sep','Oct','Nov','Dic']`.  |*English names*|
|**`onDatePress`**| Callback function invoked on a date press. Will call this func with a single parameter, the date in ISO format `'YYYY-MM-DD'`  |*None*|
|**`rowHeight`**| Day Row height. Required to make optimizations.  |*None*|
|**`headerHeight`**| Month title height. Required to make optimizations. |*None*|
|**Styling**|   |*None*|
|**`marks`**| An object with ISO dates as keys to style specific dates. Example:  `{"2017-02-20": markStyle, "2017-02-01": markStyle }`. The expected object in each date is like this: `{dayTextStyle: {color: 'white', fontSize: 14, fontWeight: 'bold'}, dayBackgroundColor: '#08a'}`. Only the text style and the backgroundColor of the button can be styled.   |*None*|
|**`showVerticalScrollIndicator`**| `VirtualizedList` prop   |`true`|
|**`enableAutoScrollOnMonthPress`**| Makes the month header tappable and performs scroll to the month when tapped.  |*false*|
|**`enableFixVisualLinesArtifacts`**| Calendar will adjust it's width in order to be multiple of 7 an avoid RN line artifacts. Use it if you see some weird glitching lines in the calendar.  |*None*|
|**`dayBackgroundColor`**| Day box button background color.   |`#fff`|
|**`headerBackgroundColor`**| Month header background color  |`grey`|
|**`weekHeaderBoxStyle`**| week day names box style. |*None*|
|**`headerTextStyle`**| Month header text style  |*None*|
|**`weekHeaderTextStyle`**| Month header background color  |*None*|
|**`dayTextStyle`**| Day button text style |*None*|
|**`initialNumToRender`**| `VirtualizedList` prop. Tune for required performance.  |*None*|

## License

The MIT License.

See [LICENSE](LICENSE)