import React, { PropTypes } from 'react';
import cx from 'classnames';

const pathToIcons = require.context('../../assets/icons', true, /.svg$/);

export default function Icon({ glyph, width = 16, height = 16, className = '' }) {
    return (
        <svg className={ cx('icon', className) } width={ width } height={ height } viewBox={ `0 0 ${width} ${height}` }>
            <use xlinkHref={ pathToIcons(`./${glyph}.svg`, true) }/>
        </svg>
    );
}

Icon.propTypes = {
    glyph: PropTypes.string.isRequired,
    width: PropTypes.number,
    height: PropTypes.number,
    className: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array,
        PropTypes.object
    ]),
};
