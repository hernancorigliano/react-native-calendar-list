/*
 * Calendar Helper
 * Hernan Corigliano 2017
 */
// Utility function that calculates the total days in a month, how many blank days in first row, and how many day rows the month has.
function calculateMonthCommonData(year, month, mondayStart) {
    const daysInMonths = [31, (((year%4==0)&&(year%100!=0))||(year%400==0)) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const monthFix = month < 10 ? '0'+month : month;

    // Set Layout values and offsets for the FlatList
    // Calculate number of rows in the box
    // Must use dates at 12 o' clock to avoid dayligth saving issues on calculating days of week. (I.E. 1st October 2017 gives different value of date)
    const firstDayOfMonth = new Date(`${year}-${monthFix}-01T12:30:00`);
    const firstWeekDay = firstDayOfMonth.getDay(); // 0 Sunday - 6 Saturday
    const daysInMonth = daysInMonths[month-1];
    let whiteBoxesFirstRow = firstWeekDay;

    if (mondayStart) {
        if (whiteBoxesFirstRow !== 0) {
            whiteBoxesFirstRow -= 1;
        } else {
            whiteBoxesFirstRow = 6; // you will have 6 boxes behind
        }
    }

    const rowsInMonth = whiteBoxesFirstRow + daysInMonth > 35 ? 6 : 5;
    return {daysInMonth, rowsInMonth, whiteBoxesFirstRow};
}

function getMonths(from, monthCount, dayNamesCustom, monthNamesCustom, mondayStartCustom, headerHeight, rowHeight) {
    const monthNames = monthNamesCustom ? monthNamesCustom : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dic'];
    const dayNames = (dayNamesCustom ? dayNamesCustom : ['S', 'M', 'T', 'W', 'T', 'F', 'S']).slice();
    const mondayStart = mondayStartCustom ? mondayStartCustom : false;
    const monthsData = [];


    // Shift days headers if week is Monday start
    if (mondayStart) {
        const elem = dayNames.shift();
        dayNames.push(elem);
    }

    // Calculate requested months
    var startDate = new Date(from + 'T12:30:00'); // avoid Daylight saving issues
    let thisMonth = startDate.getMonth() + 1;
    let thisYear = startDate.getFullYear();
    let lastOffset = 0;

    for (let i = 0; i <= monthCount; i += 1) {
        // Generate Calendar data
        const title = `${monthNames[thisMonth - 1]} ${thisYear}`;
        const {rowsInMonth, daysInMonth, whiteBoxesFirstRow} = calculateMonthCommonData(thisYear, thisMonth, mondayStart);
        const monthBoxHeight = headerHeight + (rowHeight * (1 + rowsInMonth)); // Title + DayofWeek + Rows

        // Arrange data structure for rows and days
        const dayRows = [];
        let day = 1; // Pointer to day in iteration
        let column = 0; // Pointer to weekDay in iteration
        let boxes = [];

        // Fill White Boxes on first Row
        for (let k = 0; k < whiteBoxesFirstRow; k += 1) {
            boxes.push({reactKey: `e${column}`, isEmpty: true, day});
            column += 1;
        }

        // Fill Days
        while (day <= daysInMonth) {
            // Starting new row?
            if (column === 0) {
                boxes = [];
            }

            const fixMonth = thisMonth < 10 ? '0'+thisMonth : thisMonth;
            const fixDay = day < 10 ? '0'+day : day;
            const thisDate = `${thisYear}-${fixMonth}-${fixDay}`;
            boxes.push({
                reactKey: `month${i}row${dayRows.length}column${column}`,
                isEmpty: false,
                day,
                dateObject: thisDate
            });
            day += 1;
            column += 1;

            // Finished - fill last row
            if (day > daysInMonth) {
                // I finished the buttons, are there holes left to fill?
                while (column < 7) {
                    boxes.push({reactKey: `e${column}`, isEmpty: true, day});
                    column += 1;
                }
            }

            // Done with this row
            if (column === 7) {
                dayRows.push({boxes, reactKey: `month${i}row${dayRows.length}`});
                column = 0;
            }
        }

        // Done with this MonthBox
        monthsData.push(
            {
                index: i,
                monthBoxHeight,
                layoutOffset: lastOffset,
                key: `${thisYear}_${thisMonth}`,
                title,
                dayNames,
                dayRows,
                inViewport: true, // For Calendar optimization
            });

        lastOffset += monthBoxHeight;

        // Move to next Month
        thisMonth++;
        if (thisMonth === 13) {
            thisYear++;
            thisMonth = 1;
        }
    }

    return monthsData;
}

export default {
    getMonths,
};
