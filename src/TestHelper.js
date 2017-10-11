/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

// Builds a default rendering function for a component using some base props and allowing to override some for testing.
function getRenderFunction(ReactComponent, baseProps) {
    return testProps => new ShallowRenderer().render(<ReactComponent {...baseProps} {...testProps} />);
}

export default { getRenderFunction };