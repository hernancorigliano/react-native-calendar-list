import { View, TouchableOpacity, Text } from 'react-native';
import { findAll, isComponentOfType, findAllWithType } from 'react-shallow-testutils';
import MonthBox from './MonthBox';
import DayBox from './DayBox';
import Helper from './CalendarHelper';
import TestHelper from './TestHelper';

describe('MonthBox', () => {
    it('has the correct displayName', () => {
        expect(MonthBox.displayName).toEqual('MonthBox');
    });

    describe('rendering', () => {
        const cachedCalendars = Helper.getMonths('2020-02-01', 2, null, null, false, 50, 40);
        const firstMonth = cachedCalendars[0];
        let rendered;
        let render;
        const baseProps = {
            index: 0,
            title: firstMonth.title,
            dayNames: firstMonth.dayNames,
            dayRows: firstMonth.dayRows,
            inViewport: false,
            OnDayPress: jest.fn(),
            OnHeaderPress: jest.fn(),
        };

        beforeEach(() => {
            baseProps.OnDayPress = jest.fn();
            baseProps.OnHeaderPress = jest.fn();
            render = TestHelper.getRenderFunction(MonthBox, baseProps);
        });

        it('has a View root component as root', () => {
            rendered = render();
            expect(isComponentOfType(rendered, View)).toBe(true);
        });

        it('has a touchable header', () => {
            rendered = render();
            const header = rendered.props.children[0];
            expect(isComponentOfType(header, TouchableOpacity)).toBe(true);
        });

        it('Header touch callback is called', () => {
            rendered = render();
            const header = rendered.props.children[0];
            header.props.onPress();
            expect(baseProps.OnHeaderPress).toHaveBeenCalledWith(baseProps.index);
        });

        it('renders the correct Month Name as text', () => {
            rendered = render();
            const text = rendered.props.children[0].props.children;
            expect(isComponentOfType(text, Text)).toBe(true);
            expect(text.props.children).toBe(firstMonth.title);
        });

        it('renders the days of week headers in correct order', () => {
            rendered = render();
            expect(findAll(rendered, e => e && e.type && e.type.displayName === 'WeekHeaderBox').length).toBe(7);

            const weekDays = rendered.props.children[1].props.children;

            for (let i = 0; i < 7; i += 1) {
                const component = weekDays[i];
                expect(component.props.weekDayName).toBe(firstMonth.dayNames[i]);
            }
        });

        it('renders the correct number of Day Boxes', () => {
            rendered = render();
            expect(findAllWithType(rendered, DayBox).length).toBe(firstMonth.dayRows.length * 7);
        });


        describe('Direct manipulation', () => {
            let instance;
            beforeEach(() => {
                instance = new MonthBox();
                instance.props = baseProps;
            });
            it('component does not update (should be handled manually)', () => {
                expect(instance.shouldComponentUpdate(baseProps)).toBeFalsy();
            });
            it('updates when becoming Visible in Viewport', () => {
                const newProps = { ...baseProps, inViewport: true };
                instance.shouldComponentUpdate(newProps);
                expect(instance.props).toBe(newProps);
            });
            it('updates when visible and props change', () => {
                const oldProps = { ...baseProps, inViewport: true }; // is in Viewport
                const newProps = {...instance.props};  // a change in props
                instance.props = oldProps;

                instance.shouldComponentUpdate(newProps);
                expect(instance.props).toBe(newProps);
            });
        });
    });
});
