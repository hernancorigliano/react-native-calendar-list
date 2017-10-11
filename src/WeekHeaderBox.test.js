import { View, Text } from 'react-native';
import { findWithType, isComponentOfType } from 'react-shallow-testutils';
import WeekHeaderBox from './WeekHeaderBox';
import TestHelper from './TestHelper';

describe('WeekHeaderBox', () => {
    it('has the correct displayName', () => {
        expect(WeekHeaderBox.displayName).toEqual('WeekHeaderBox');
    });

    describe('rendering', () => {
        const baseProps = {
            weekDayName: 'Mo',
        };
        const render = TestHelper.getRenderFunction(WeekHeaderBox, baseProps);

        it('has a View root component', () => {
            expect(isComponentOfType(render(), View)).toBe(true);
        });

        it('renders the passed as text', () => {
            const rendered = render();
            const comp = findWithType(rendered, Text);
            expect(comp.props.children).toBe(baseProps.weekDayName);
        });

        it('matches snapshot', () => {
            expect(render()).toMatchSnapshot();
        });
    });
});
