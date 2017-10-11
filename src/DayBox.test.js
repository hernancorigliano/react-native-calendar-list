import { TouchableOpacity, Text } from 'react-native';
import { findWithType, isComponentOfType } from 'react-shallow-testutils';
import TestHelper from './TestHelper';
import DayBox from './DayBox';

describe('DayBox', () => {
    it('has the correct displayName', () => {
        expect(DayBox.displayName).toEqual('DayBox');
    });

    describe('rendering', () => {
        let rendered;
        const baseProps = { mode: 1, onPress: jest.fn(), day: 7 };
        const render = TestHelper.getRenderFunction(DayBox, baseProps);

        describe('Direct Manipulation', () => {
            let instance;
            beforeEach(() => {
                instance = new DayBox();
                instance.button = { setNativeProps: jest.fn() };
                instance.text = { setNativeProps: jest.fn() };
                instance.props = { mode: 0, day: 1 };
                instance.render();
            });
            it('component does not update (should be handled manually)', () => {
                expect(instance.shouldComponentUpdate()).toBeFalsy();
            });
            it('component directly manipulates subcomponents updates', () => {
                instance.setNativeProps({ boxStyle: {backgroundColor:'red'} });
                expect(instance.button.setNativeProps).toHaveBeenCalledWith({"style": {"backgroundColor": "red"}});
            });
        });

        describe('Empty mode', () => {
            beforeEach(() => {
                rendered = render({ isEmpty: true });
            });
            it('is not touchable when empty', () => {
                expect(isComponentOfType(rendered, TouchableOpacity)).toBe(false);
            });
            it('matches snapshot', () => {
                expect(rendered).toMatchSnapshot();
            });
        });

        describe('Normal mode', () => {
            beforeEach(() => {
                rendered = render({ mode: 1 });
            });
            it('is touchable', () => {
                expect(isComponentOfType(rendered, TouchableOpacity)).toBe(true);
            });
            it('renders the day as text', () => {
                const text = findWithType(rendered, Text);
                expect(text.props.children).toBe(7);
            });
            it('makes callback when pressed', () => {
                const props = { onPress: jest.fn() };
                rendered = render(props);
                rendered.props.onPress();
                expect(props.onPress).toHaveBeenCalled();
            });
            it('matches snapshot', () => {
                expect(rendered).toMatchSnapshot();
            });
        });

    });
});
