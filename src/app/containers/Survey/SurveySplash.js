import React, { PropTypes } from 'react';
import cx from 'classnames';

import Icon from '../../components/Icon';

export default function SurveySplash({ onClick, style = {}, isOpen }) {
    return (
        <div
            className={ cx('survey__splash', { survey__splash_open: isOpen }) }
            style={ Object.assign({}, style) }
        >
            <div className="survey__splash-content">
                That&apos;s it! <Icon className="icon_firework" width={ 100 } height={ 100 } glyph="firework"/>
            </div>
            <button onClick={ onClick } className="btn btn_padded btn_rounded btn_outlined">
                Try again?
            </button>
        </div>
    );
}

SurveySplash.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
    style: PropTypes.shape({}),
};
