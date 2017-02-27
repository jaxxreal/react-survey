import React, { PropTypes } from 'react';
import cx from 'classnames';

export default function Dialog({ isOpen, title, children }) {
    return (
        <div className={ cx('dialog', { dialog_open: isOpen }) }>
            <div className="dialog__header">
                { title }
            </div>
            <div className="dialog__content">
                { children }
            </div>
        </div>
    );
}

Dialog.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.element.isRequired,
        PropTypes.string.isRequired,
        PropTypes.node.isRequired,
    ]),
};
