import Helper from './CalendarHelper';

describe('CalendarHelper', () => {
    describe('Calendar building', () => {
            it('Builds the requested number of months ahead', () => {
                const months = Helper.getMonths(
                    '2015-04-01',
                    4,
                    null,
                    null,
                    false,
                    40,
                    40,
                );
                expect(months.length).toBe(5);
            });
            it('Sets the correct custom title', () => {
                const months = Helper.getMonths(
                    '2015-03-01',
                    2,
                    null,
                    ['J', 'F', 'Mar','A','M','Jun','Jul', 'Ago', 'Sep','Oct','Nov','Dic'],
                    false,
                    40,
                    40,
                );
                const month = months[0];
                expect(month.title).toBe('Mar 2015');
            });
            it('Sets the correct custom days of week', () => {
                const dayNames = ['Dos', 'Lun', 'Ma', 'Mi', 'Ju', 'Vi','Sa'];
                const months = Helper.getMonths(
                    '2015-03-01',
                    2,
                    dayNames,
                    null,
                    false,
                    40,
                    40,
                );
                const month = months[0];
                expect(month.dayNames).toEqual(dayNames);
            });

            it('Sets the correct layout offset for rendering', () => {
                const months = Helper.getMonths(
                    '2015-03-01',
                    4,
                    null,
                    ['J', 'F', 'Mar','A','M','Jun','Jul', 'Ago', 'Sep','Oct','Nov','Dic'],
                    false,
                    40,
                    50,
                );
                const month1 = months[0];
                const month2 = months[1];
                const month3 = months[2];
                const month4 = months[3];
                const finalOffset = month1.monthBoxHeight + month2.monthBoxHeight + month3.monthBoxHeight;

                expect(month4.layoutOffset).toBe(finalOffset);
            });

            describe('Months data', () => {
                let months;
                beforeEach(() => {
                    months = Helper.getMonths('2017-09-22', 2, null, null, true, 50, 40);
                });

                it('Calculates correct months days September ', () => {
                    const september = months[0];
                    expect(september.dayRows.length).toBe(5);
                });

                it('Calculates correct day rows days October ', () => {
                    const october = months[1];
                    expect(october.dayRows.length).toBe(6);
                });

                it('Calculates correct day rows October (with different starting Day of week) ', () => {
                    months = Helper.getMonths('2017-09-22', 2, null, null, false, 50, 40);
                    const october = months[1];
                    expect(october.dayRows.length).toBe(5);
                });

                it('Calculates correct empty spaces ', () => {
                    const september = months[0];
                    const emptyDays = september.dayRows[0].boxes.filter(d => d.isEmpty);
                    expect(emptyDays.length).toBe(4);
                });


                it('Calculates correct days for Leap year February', () => {
                    months = Helper.getMonths('2020-02-01', 2, null, null, false, 50, 40);
                    const feb = months[0];
                    let days = 0;
                    feb.dayRows.forEach(row => {
                        row.boxes.forEach(box => {
                            if (!box.isEmpty) {
                                days += 1;
                            }
                        });
                    });

                    expect(days).toBe(29);
                });

                it('Calculates correct days for non Leap year February', () => {
                    months = Helper.getMonths('2018-02-01', 2, null, null, false, 50, 40);
                    const feb = months[0];
                    let days = 0;
                    feb.dayRows.forEach(row => {
                        row.boxes.forEach(box => {
                            if (!box.isEmpty) {
                                days += 1;
                            }
                        });
                    });

                    expect(days).toBe(28);
                });
            });

    });
});
