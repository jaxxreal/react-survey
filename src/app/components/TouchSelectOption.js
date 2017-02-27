import React, { PureComponent, PropTypes } from 'react';
import _bindAll from 'lodash/bindAll';
import cx from 'classnames';

import Icon from '../components/Icon';

export default class TouchSelectOption extends PureComponent {
    constructor(props) {
        super(props);
        _bindAll(this, ['onSelect']);
    }

    onSelect() {
        this.props.onSelect(this.props.dropType);
    }

    getSize(isVertical) {
        return isVertical
            ? { height: 120, width: 60 }
            : { height: 60, width: 120 }
            ;
    }

    render() {
        const { label, vertical, horizontal, left, right, bottom } = this.props;
        return (
            <div
                onClick={ this.onSelect }
                className={ cx('touch-select__option', {
                    'touch-select__option_vertical': vertical,
                    'touch-select__option_horizontal': horizontal,
                    'touch-select__option_left': left,
                    'touch-select__option_right': right,
                }) }
                ref={ this.props.optionRef }
            >
                <Icon
                    glyph={ cx({
                        'back-arrow': left,
                        'next-arrow': right,
                        'down-arrow': bottom,
                    }) }
                    { ...this.getSize(vertical) }
                />
                <div
                    className={ cx('touch-select__option-text', {
                        'touch-select__option-text_left': left,
                        'touch-select__option-text_right': right,
                    }) }
                >
                    { label }
                </div>
            </div>
        );
    }
}

TouchSelectOption.propTypes = {
    onSelect: PropTypes.func.isRequired,
    optionRef: PropTypes.func.isRequired,
    dropType: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    vertical: PropTypes.bool,
    horizontal: PropTypes.bool,
    left: PropTypes.bool,
    right: PropTypes.bool,
    bottom: PropTypes.bool,
};
