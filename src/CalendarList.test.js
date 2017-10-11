import {View, VirtualizedList} from 'react-native';
import {findAllWithType, isComponentOfType, findWithType} from 'react-shallow-testutils';
import TestHelper from './TestHelper';
import Calendar from './CalendarList';

describe('Calendar', () => {
    it('has the correct displayName', () => {
        expect(Calendar.displayName).toEqual('CalendarList');
    });

    const today = '2017-09-11';
    const baseProps = {
        startDate: '2017-09-11',
        monthsCount: 12,
        mondayWeekStart: false,
        rowHeight: 40,
        headerHeight: 50,
        onDatePress: jest.fn(),
    };
    let instance;

    describe('behaviour', () => {
        describe('layout calculations for optimizations', () => {
            describe('not Loaded', () => {
                beforeEach(() => {
                    jest.useFakeTimers();
                    instance = new Calendar();
                    instance.props = baseProps;
                    instance.state.loaded = false;
                    instance.render(); // builds the data for calendar
                    instance.setState = jest.fn();
                });

                it('does not render a Virtualized List', () => {
                    expect(findAllWithType(instance.render(), VirtualizedList).length).toBe(0);
                });
            });

            describe('Loaded', () => {
                beforeEach(() => {
                    instance = new Calendar();
                    instance.state.loaded = false;
                    instance.props = baseProps;
                    instance.render(); // builds the data for calendar
                    instance.state.loaded = true; // setState does not work
                    instance.setState = jest.fn();
                    instance.flatlist = {scrollToIndex: jest.fn()};
                    instance.forceUpdate = jest.fn();
                    debugger;
                });

                it('renders a Virtualized List', () => {
                    expect(findAllWithType(instance.render(), VirtualizedList).length).toBe(1);
                });
                it('Virtualized list will render correct months', () => {
                    const list = findWithType(instance.render(), VirtualizedList);
                    expect(list.props.getItemCount()).toBe(13);
                });
                it('calculates the correct layout height', () => {
                    const layoutItem = instance.getItemLayout(instance.cachedCalendars, 0);
                    expect(layoutItem.length).toBe(instance.cachedCalendars[0].monthBoxHeight);
                });
                it('calculates the correct offset', () => {
                    const layoutItem = instance.getItemLayout(instance.cachedCalendars, 2);
                    expect(layoutItem.offset).toBe(instance.cachedCalendars[2].layoutOffset);
                });
                it('updates viewable cells', () => {
                    instance.onViewableItemsChanged({viewableItems: [{item: instance.cachedCalendars[4]}, {item: instance.cachedCalendars[5]}]});
                    expect(instance.cachedCalendars[4].inViewport).toBeTruthy();
                    expect(instance.cachedCalendars[5].inViewport).toBeTruthy();
                });
            });
        });

        describe('month item rendering', () => {
            it('Virtualized list renders item passing the correct day rows', () => {
                let renderedMonthBox;
                let data;

                instance = new Calendar();
                instance.state.loaded = false;
                instance.props = baseProps;
                instance.render(); // builds the data for calendar
                instance.state.loaded = true;
                data = {item: instance.cachedCalendars[0]};

                renderedMonthBox = instance.renderItem(data);

                expect(renderedMonthBox.props.dayRows).toBe(data.item.dayRows);
            });
        });

        it('recalculates the container width correctly as multiple of 7', () => {
            instance = new Calendar();
            const widthNotMultipleOfSeven = 353;
            const fixedWidth = 350;
            instance.setState = jest.fn();
            instance.updateDimensions({nativeEvent: {layout: {width: widthNotMultipleOfSeven}}});
            expect(instance.setState).toHaveBeenCalledWith({magicWidth: fixedWidth});
        });
    });

    describe('rendering', () => {
        let rendered;
        const render = TestHelper.getRenderFunction(Calendar, baseProps);

        beforeEach(() => {
            rendered = render();
        });

        it('has a View root component', () => {
            expect(isComponentOfType(rendered, View)).toBe(true);
        });

        it('has a View as second root component', () => {
            expect(isComponentOfType(rendered.props.children, View)).toBe(true);
        });

        it('matches snapshot', () => {
            expect(rendered).toMatchSnapshot();
        });
    });
});
